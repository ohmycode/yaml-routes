import { writeFile, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { RoutingConfig, GeneratedRoute, GlobalSettings, SupportedLocale, BuildConfig } from "./types";
import {
    loadRoutingConfig,
    isRouteConfig,
    convertYamlPathToTanstackPath,
    generateRouteId,
    generateComponentImportPath,
    extractPathValue,
    extractComponentValue,
    normalizeRouteName,
    validateRoutingConfig,
} from "./utils";

// Helper to get snippet content
async function loadSnippet(filename: string): Promise<string> {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const snippetPath = join(currentDir, "snippets", filename);
    return await readFile(snippetPath, "utf-8");
}

// Helper to extract function source from snippet file
function extractFunction(content: string, functionName: string): string {
    const regex = new RegExp(`export function ${functionName}\\([^{]*\\{[\\s\\S]*?^}`, "m");
    const match = content.match(regex);
    return match ? match[0].replace("export ", "") : "";
}

// Helper to generate route ID mappings using snippet logic
function generateRouteIdMappings(routes: GeneratedRoute[]): Record<string, { path: string; parameters: string[] }> {
    const mappings: Record<string, { path: string; parameters: string[] }> = {};

    routes.forEach((route) => {
        if (route.id) {
            mappings[route.id.toLowerCase()] = {
                path: route.path,
                parameters: Object.keys(route.parameters || {}),
            };
        }
    });

    return mappings;
}

// Helper to generate imports
function generateImports(routes: GeneratedRoute[], i18nEnabled: boolean): Set<string> {
    const imports = new Set<string>();
    const componentNameMap = new Map<string, string>();

    routes.forEach((route) => {
        const allComponents = i18nEnabled ? Object.values(route.i18nComponents) : [route.component];

        allComponents.forEach((componentPath) => {
            const importPath = generateComponentImportPath(componentPath);
            const componentName =
                componentPath
                    .split("/")
                    .pop()
                    ?.replace(/[^a-zA-Z0-9]/g, "") || "Component";

            imports.add(`import ${componentName} from '${importPath}';`);
            componentNameMap.set(componentPath, componentName);
        });
    });

    return imports;
}

// Helper to generate route definitions
function generateRouteDefinitions(routes: GeneratedRoute[]): { definitions: string[]; variables: string[]; componentNameMap: Map<string, string> } {
    const definitions: string[] = [];
    const variables: string[] = [];
    const componentNameMap = new Map<string, string>();

    // First, build component name map
    routes.forEach((route) => {
        const componentName =
            route.component
                .split("/")
                .pop()
                ?.replace(/[^a-zA-Z0-9]/g, "") || "Component";
        componentNameMap.set(route.component, componentName);
    });

    routes.forEach((route) => {
        const componentName = componentNameMap.get(route.component) || "Component";
        const routeVarName = `${generateRouteId(route.id)}Route`;
        const routePath = convertYamlPathToTanstackPath(route.path);
        const paramValidation = generateParameterValidation(route.parameters);

        definitions.push(`const ${routeVarName} = createRoute({
  getParentRoute: () => rootRoute,
  path: '${routePath}',
  component: ${componentName},${paramValidation ? "\n  " + paramValidation : ""}
});`);

        variables.push(routeVarName);
    });

    return { definitions, variables, componentNameMap };
}

// Helper to generate localized route definitions
function generateLocalizedRouteDefinitions(
    routes: GeneratedRoute[],
    supportedLocales: SupportedLocale[],
    defaultLocale: string,
    componentNameMap: Map<string, string>
): { definitions: string[]; variables: string[] } {
    const definitions: string[] = [];
    const variables: string[] = [];

    supportedLocales.forEach((locale) => {
        if (locale === defaultLocale) return; // Skip default locale as it has no prefix

        routes.forEach((route) => {
            const componentPath = route.i18nComponents[locale] || route.component;
            const componentName = componentNameMap.get(componentPath) || "Component";
            const routeVarName = `${generateRouteId(route.id)}${locale.charAt(0).toUpperCase() + locale.slice(1)}Route`;

            // Use the localized path from i18n config if available, otherwise use the base path
            const localizedPath = route.i18nPaths[locale] || route.path;
            const convertedPath = convertYamlPathToTanstackPath(localizedPath);

            // Add locale prefix to the localized path
            const finalPath = `/${locale}${convertedPath}`;

            const paramValidation = generateParameterValidation(route.parameters);

            definitions.push(`const ${routeVarName} = createRoute({
  getParentRoute: () => rootRoute,
  path: '${finalPath}',
  component: ${componentName},${paramValidation ? "\n  " + paramValidation : ""}
});`);

            variables.push(routeVarName);
        });
    });

    return { definitions, variables };
}

// Helper to generate path mappings
function generatePathMappings(routes: GeneratedRoute[], supportedLocales: SupportedLocale[], defaultLocale: string): Record<string, Record<string, string>> {
    const pathMappings: Record<string, Record<string, string>> = {};

    routes.forEach((route) => {
        const basePath = route.path;
        pathMappings[basePath] = {};
        supportedLocales.forEach((locale) => {
            if (locale === defaultLocale) {
                pathMappings[basePath][locale] = basePath;
            } else {
                const localizedPath = route.i18nPaths[locale] || route.path;
                pathMappings[basePath][locale] = `/${locale}${localizedPath}`;
            }
        });
    });

    return pathMappings;
}

// Template builders for better maintainability
function buildFileHeader(): string {
    return `// Auto-generated code-based routing cache
// Generated from routes.yml configuration using @yaml-routes/tanstack`;
}

function buildImports(imports: Set<string>, i18nEnabled: boolean, snippets: any): string {
    const parts = [
        "import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';",
        "import { z } from 'zod';",
        "import { RootComponent } from './App';"
    ];

    if (i18nEnabled) {
        parts.push(
            "",
            "// React hooks for reactive locale detection",
            "import { useState, useEffect } from 'react';",
            "",
            snippets.reactHooks
        );
        parts.push("import { getLocale } from './paraglide/runtime.js';");
    }

    parts.push(...Array.from(imports));
    
    return parts.join("\n");
}

function buildGlobalSettings(globalSettings: GlobalSettings): string {
    return `// Global settings
export const globalSettings = ${JSON.stringify(globalSettings, null, 2)} as const;`;
}

function buildPathMappings(i18nEnabled: boolean, pathMappings: any, snippets: any): string {
    if (!i18nEnabled) return "";
    
    return `// Path mappings for localized navigation
export const pathMappings = ${JSON.stringify(pathMappings, null, 2)} as const;

// Helper function to get localized path
${snippets.pathMappings}`;
}

function buildRouteIdMappings(routeIdMappings: any): string {
    return `// Route ID mappings for routeTo helper
export const routeIdMappings = ${JSON.stringify(routeIdMappings, null, 2)} as const;`;
}

function buildLocaleState(defaultLocale: string): string {
    return `// Global locale state for reactive updates
let currentDetectedLocale: string = '${defaultLocale}';

// Function to update the current locale (called by router on navigation)
export function updateCurrentLocale(newLocale: string): void {
  currentDetectedLocale = newLocale;
}`;
}

function buildGetCurrentLocale(
    snippets: any,
    i18nEnabled: boolean,
    forceLocaleUrl: boolean,
    defaultLocale: string,
    supportedLocales: string[]
): string {
    const localeDetectionLogic = i18nEnabled && forceLocaleUrl
        ? `try {
    // Get current URL path
    const currentPath = window.location.pathname;
    let pathWithoutBase = currentPath;
    
    // Remove base path if present
    const basePath = globalSettings.basePath;
    if (basePath && currentPath.startsWith(basePath)) {
      pathWithoutBase = currentPath.slice(basePath.length) || '/';
    }
    
    // Detect locale from URL path
    const supportedLocales = ['${supportedLocales.join("', '")}'];
    const detectedLocale = supportedLocales.find(loc => 
      loc !== '${defaultLocale}' && (
        pathWithoutBase.startsWith('/' + loc + '/') || 
        pathWithoutBase === '/' + loc || 
        pathWithoutBase === '/' + loc + '/'
      )
    );
    
    const locale = detectedLocale || '${defaultLocale}';
    currentDetectedLocale = locale;
    return locale;
  } catch {
    return '${defaultLocale}';
  }`
        : `return '${defaultLocale}';`;

    return `// Function to get current locale reactively
${snippets.localeDetection.replace('return "en";', localeDetectionLogic)}`;
}

function buildRouteTo(
    snippets: any,
    i18nEnabled: boolean,
    forceLocaleUrl: boolean,
    defaultLocale: string
): string {
    const localeLogic = i18nEnabled
        ? forceLocaleUrl
            ? `// forceLocaleUrl is enabled - use current detected locale
    locale = getCurrentLocale();`
            : `// forceLocaleUrl is disabled - always use default locale
    locale = '${defaultLocale}';`
        : `// i18n is disabled, use default locale
  locale = '${defaultLocale}';`;

    return `// Generic route helper - takes route ID and optional parameters
${snippets.routeTo.replace("locale = getCurrentLocale();", localeLogic)}`;
}

function buildRouteDefinitions(
    routeDefinitions: any,
    localizedRouteDefinitions: any,
    i18nEnabled: boolean,
    defaultLocale: string
): string {
    const parts = [
        "// Root route",
        "const rootRoute = createRootRoute({",
        "  component: RootComponent,",
        "});",
        "",
        `// Default locale routes${i18nEnabled ? ` (${defaultLocale} - no prefix)` : ""}`,
        routeDefinitions.definitions.join("\n\n")
    ];

    if (localizedRouteDefinitions.definitions.length > 0) {
        parts.push(
            "",
            "// Localized routes with locale prefix",
            localizedRouteDefinitions.definitions.join("\n\n")
        );
    }

    return parts.join("\n");
}

function buildRouterExport(allRouteVariables: string[], basePath?: string): string {
    return `// Build route tree
const routeTree = rootRoute.addChildren([
  ${allRouteVariables.join(",\n  ")}
]);

// Create and export router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',${basePath ? `\n  basepath: '${basePath}',` : ""}
});

// Type registration
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}`;
}

// Helper to build the complete route cache file
function buildRouteCache(params: {
    globalSettings: GlobalSettings;
    i18nEnabled: boolean;
    forceLocaleUrl: boolean;
    defaultLocale: string;
    supportedLocales: SupportedLocale[];
    basePath?: string;
    imports: Set<string>;
    routeDefinitions: { definitions: string[]; variables: string[] };
    localizedRouteDefinitions: { definitions: string[]; variables: string[] };
    pathMappings: Record<string, Record<string, string>>;
    routeIdMappings: Record<string, { path: string; parameters: string[] }>;
    snippets: {
        reactHooks: string;
        localeDetection: string;
        pathMappings: string;
        routeTo: string;
    };
}): string {
    const {
        globalSettings,
        i18nEnabled,
        forceLocaleUrl,
        defaultLocale,
        supportedLocales,
        basePath,
        imports,
        routeDefinitions,
        localizedRouteDefinitions,
        pathMappings,
        routeIdMappings,
        snippets,
    } = params;

    const allRouteVariables = [...routeDefinitions.variables, ...localizedRouteDefinitions.variables];

    const sections = [
        buildFileHeader(),
        buildImports(imports, i18nEnabled, snippets),
        "",
        buildGlobalSettings(globalSettings),
        "",
        buildPathMappings(i18nEnabled, pathMappings, snippets),
        "",
        buildRouteIdMappings(routeIdMappings),
        "",
        buildLocaleState(defaultLocale),
        "",
        buildGetCurrentLocale(snippets, i18nEnabled, forceLocaleUrl, defaultLocale, supportedLocales),
        "",
        buildRouteTo(snippets, i18nEnabled, forceLocaleUrl, defaultLocale),
        "",
        buildRouteDefinitions(routeDefinitions, localizedRouteDefinitions, i18nEnabled, defaultLocale),
        "",
        buildRouterExport(allRouteVariables, basePath)
    ];

    return sections.filter(section => section.trim().length > 0).join("\n");
}

function generateParameterValidation(_parameters: Record<string, any>): string {
    // For now, let TanStack Router handle basic parameter validation automatically
    return "";
}

export async function generateTanStackRoutes(config: BuildConfig): Promise<void> {
    console.log("🔧 Loading routing configuration...");
    const routingConfig = await loadRoutingConfig(config.configPath);

    // Validate configuration
    const validation = validateRoutingConfig(routingConfig);
    if (!validation.valid) {
        throw new Error(`Invalid routing configuration:\n${validation.errors.join("\n")}`);
    }

    console.log("🚀 Generating TanStack Router code-based routes cache...");

    // Extract global settings
    const globalSettings: GlobalSettings = routingConfig.settings || {};
    const i18nEnabled = globalSettings.i18n?.enabled ?? true;
    const defaultLocale = globalSettings.i18n?.defaultLocale || config.defaultLocale || "en";
    const supportedLocales: SupportedLocale[] = globalSettings.i18n?.supportedLocales || config.supportedLocales || ["en", "fr", "es"];
    const forceLocaleUrl = globalSettings.i18n?.forceLocaleUrl ?? false;
    const basePath = globalSettings.basePath;

    console.log(`🌐 i18n ${i18nEnabled ? "enabled" : "disabled"}, default locale: ${defaultLocale}, supported: [${supportedLocales.join(", ")}]`);
    if (i18nEnabled && forceLocaleUrl) {
        console.log(`🔗 Force locale URL enabled - non-default locales will be preserved in navigation`);
    }

    // Load all snippet files
    const [reactHooksSnippet, localeDetectionSnippet, pathMappingsSnippet, routeToSnippet] = await Promise.all([
        loadSnippet("react-hooks.js"),
        loadSnippet("locale-detection.js"),
        loadSnippet("path-mappings.js"),
        loadSnippet("route-to.js"),
    ]);

    const routes: GeneratedRoute[] = [];
    const normalizedRouteNames = new Set<string>();

    // Convert YAML config to route objects (skip 'settings' section)
    for (const [routeName, routeConfig] of Object.entries(routingConfig)) {
        if (routeName === "settings" || !isRouteConfig(routeConfig)) {
            continue; // Skip settings section and invalid route configs
        }

        // Normalize route name: trim and convert to lowercase
        const normalizedRouteName = normalizeRouteName(routeName);

        // Check for uniqueness
        if (normalizedRouteNames.has(normalizedRouteName)) {
            throw new Error(`Duplicate route name detected: '${routeName}' normalizes to '${normalizedRouteName}' which already exists`);
        }
        normalizedRouteNames.add(normalizedRouteName);

        // Extract paths and components for all locales
        const i18nPaths: Record<string, string> = {};
        const i18nComponents: Record<string, string> = {};

        if (i18nEnabled) {
            for (const locale of supportedLocales) {
                i18nPaths[locale] = extractPathValue(routeConfig.path, locale, defaultLocale);
                i18nComponents[locale] = extractComponentValue(routeConfig.component, locale, defaultLocale);
            }
        } else {
            // If i18n is disabled, just use the default values
            const path = extractPathValue(routeConfig.path, defaultLocale, defaultLocale);
            const component = extractComponentValue(routeConfig.component, defaultLocale, defaultLocale);
            i18nPaths[defaultLocale] = path;
            i18nComponents[defaultLocale] = component;
        }

        const route: GeneratedRoute = {
            id: normalizedRouteName, // Use normalized route name
            path: extractPathValue(routeConfig.path, defaultLocale, defaultLocale),
            component: extractComponentValue(routeConfig.component, defaultLocale, defaultLocale),
            parameters: routeConfig.parameters || {},
            i18nPaths,
            i18nComponents,
            settings: routeConfig.settings,
        };
        routes.push(route);
    }

    // Generate components and data using snippet-based approach
    const imports = generateImports(routes, i18nEnabled);
    const routeDefinitions = generateRouteDefinitions(routes);
    const localizedRouteDefinitions = i18nEnabled
        ? generateLocalizedRouteDefinitions(routes, supportedLocales, defaultLocale, routeDefinitions.componentNameMap)
        : { definitions: [], variables: [] };
    const pathMappings = i18nEnabled ? generatePathMappings(routes, supportedLocales, defaultLocale) : {};
    const routeIdMappings = generateRouteIdMappings(routes);

    // Build the final file using a clean composition pattern
    const fileContent = buildRouteCache({
        globalSettings,
        i18nEnabled,
        forceLocaleUrl,
        defaultLocale,
        supportedLocales,
        basePath,
        imports,
        routeDefinitions,
        localizedRouteDefinitions,
        pathMappings,
        routeIdMappings,
        snippets: {
            reactHooks: extractFunction(reactHooksSnippet, "useCurrentLocale") + "\n\n" + extractFunction(reactHooksSnippet, "useRouteTo"),
            localeDetection: extractFunction(localeDetectionSnippet, "getCurrentLocale"),
            pathMappings: extractFunction(pathMappingsSnippet, "getLocalizedPath"),
            routeTo: extractFunction(routeToSnippet, "routeTo"),
        },
    });

    // Write the generated route cache
    await writeFile(config.outputPath, fileContent);

    console.log(`✅ Generated code-based route cache: ${config.outputPath}`);
    console.log(
        `📊 Generated ${routes.length} base routes${
            i18nEnabled ? ` with ${localizedRouteDefinitions.definitions.length} localized variants` : " (i18n disabled)"
        }`
    );
    console.log("🎉 Route generation completed!");
}
