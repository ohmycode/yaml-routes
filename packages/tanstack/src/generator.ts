import { writeFile } from "fs/promises";
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
    const basePath = globalSettings.basePath;

    console.log(`🌐 i18n ${i18nEnabled ? "enabled" : "disabled"}, default locale: ${defaultLocale}, supported: [${supportedLocales.join(", ")}]`);

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

    // Generate imports (collect all unique component paths)
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

    // Generate route definitions for default locale
    const routeDefinitions: string[] = [];
    const routeVariables: string[] = [];

    routes.forEach((route) => {
        const componentName = componentNameMap.get(route.component) || "Component";
        const routeVarName = `${generateRouteId(route.id)}Route`; // Use camelCase for variable names
        const routePath = convertYamlPathToTanstackPath(route.path);
        const paramValidation = generateParameterValidation(route.parameters);

        routeDefinitions.push(`const ${routeVarName} = createRoute({
  getParentRoute: () => rootRoute,
  path: '${routePath}',
  component: ${componentName},${paramValidation ? "\n  " + paramValidation : ""}
});`);

        routeVariables.push(routeVarName);
    });

    // Generate localized route definitions with locale prefix (only if i18n is enabled)
    const localizedRouteDefinitions: string[] = [];
    const localizedRouteVariables: string[] = [];

    if (i18nEnabled) {
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

                localizedRouteDefinitions.push(`const ${routeVarName} = createRoute({
  getParentRoute: () => rootRoute,
  path: '${finalPath}',
  component: ${componentName},${paramValidation ? "\n  " + paramValidation : ""}
});`);

                localizedRouteVariables.push(routeVarName);
            });
        });
    }

    // Build the route tree
    const allRouteVariables = [...routeVariables, ...localizedRouteVariables];

    // Generate path mapping for navigation (only if i18n is enabled)
    const pathMappings: Record<string, Record<string, string>> = {};
    if (i18nEnabled) {
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
    }

    // Generate route ID mapping for the routeTo helper
    const routeIdMappings: Record<string, { path: string; parameters: string[] }> = {};
    routes.forEach((route) => {
        const paramNames = Object.keys(route.parameters);

        // Only use the original YAML key - developers should use the same convention
        routeIdMappings[route.id] = {
            path: route.path,
            parameters: paramNames,
        };
    });

    const routeTreeContent = `// Auto-generated code-based routing cache
// Generated from routes.yml configuration using @yaml-routes/tanstack
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { RootComponent } from './App';
${i18nEnabled ? "import { getLocale } from './paraglide/runtime.js';" : ""}
${Array.from(imports).join("\n")}

// Global settings
export const globalSettings = ${JSON.stringify(globalSettings, null, 2)} as const;

${
    i18nEnabled
        ? `// Path mappings for localized navigation
export const pathMappings = ${JSON.stringify(pathMappings, null, 2)} as const;

// Helper function to get localized path
export function getLocalizedPath(basePath: string, locale: string): string {
  const mappings = pathMappings as Record<string, Record<string, string>>;
  return mappings[basePath]?.[locale] || basePath;
}`
        : ""
}

// Route ID mappings for routeTo helper
export const routeIdMappings = ${JSON.stringify(routeIdMappings, null, 2)} as const;

// Generic route helper - takes route ID and optional parameters
export function routeTo(
  routeId: string, 
  params: Record<string, string | number> = {}, 
  locale?: string
): string {
  // Normalize route ID: trim and convert to lowercase
  const normalizedRouteId = routeId.trim().toLowerCase();
  
  ${
      i18nEnabled
          ? `// Get current locale from Paraglide if not provided
  if (!locale) {
    try {
      locale = getLocale();
    } catch {
      locale = '${defaultLocale}'; // fallback to default locale
    }
  }`
          : `// i18n is disabled, use default locale
  locale = '${defaultLocale}';`
  }
  
  // Get route info using normalized route ID
  const routeInfo = routeIdMappings[normalizedRouteId as keyof typeof routeIdMappings];
  if (!routeInfo) {
    console.warn(\`Route ID '\${routeId}' (normalized: '\${normalizedRouteId}') not found\`);
    return '/';
  }
  
  // Get the base path for this route
  const basePath = routeInfo.path;
  
  ${
      i18nEnabled
          ? `// Get the localized path template
  const localizedTemplate = getLocalizedPath(basePath, locale);`
          : `// Use base path directly (no i18n)
  const localizedTemplate = basePath;`
  }
  
  // Fill in parameters
  let finalPath = localizedTemplate;
  for (const [key, value] of Object.entries(params)) {
    finalPath = finalPath.replace(\`{\${key}}\`, String(value));
  }
  
  return finalPath;
}

// Root route
const rootRoute = createRootRoute({
  component: RootComponent,
});

// Default locale routes${i18nEnabled ? ` (${defaultLocale} - no prefix)` : ""}
${routeDefinitions.join("\n\n")}

${localizedRouteDefinitions.length > 0 ? "// Localized routes with locale prefix\n" + localizedRouteDefinitions.join("\n\n") : ""}

// Build route tree
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

    // Write the generated route cache
    await writeFile(config.outputPath, routeTreeContent);

    console.log(`✅ Generated code-based route cache: ${config.outputPath}`);
    console.log(`📊 Generated ${routes.length} base routes${i18nEnabled ? ` with ${localizedRouteVariables.length} localized variants` : " (i18n disabled)"}`);
    console.log("🎉 Route generation completed!");
}
