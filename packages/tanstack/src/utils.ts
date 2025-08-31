import { readFile } from "fs/promises";
import { load } from "js-yaml";
import type { RoutingConfig, RouteConfig, SupportedLocale } from "./types";

export async function loadRoutingConfig(configPath: string = "routes.yml"): Promise<RoutingConfig> {
    try {
        const yamlContent = await readFile(configPath, "utf-8");
        const config = load(yamlContent) as RoutingConfig;
        return config;
    } catch (error) {
        throw new Error(`Failed to load routing configuration from ${configPath}: ${error}`);
    }
}

export function isRouteConfig(value: any): value is RouteConfig {
    return value && typeof value === "object" && (value.path || value.component);
}

export function convertYamlPathToTanstackPath(yamlPath: string): string {
    // Convert {param} to $param for TanStack Router
    return yamlPath.replace(/\{([^}]+)\}/g, "$$$1");
}

export function convertYamlPathToReactRouterPath(yamlPath: string): string {
    // Convert {param} to :param for React Router
    return yamlPath.replace(/\{([^}]+)\}/g, ":$1");
}

export function generateRouteId(routeName: string): string {
    // Convert snake_case to camelCase for valid JavaScript variable names
    return routeName.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function generateComponentImportPath(componentPath: string): string {
    // Remove .tsx extension if present and ensure it starts with ./
    const cleanPath = componentPath.replace(/\.tsx?$/, "");
    return cleanPath.startsWith("./") ? cleanPath : `./${cleanPath}`;
}

export function extractPathValue(pathConfig: string | Record<string, string>, locale: string, defaultLocale: string): string {
    if (typeof pathConfig === "string") {
        return pathConfig;
    }

    // Return localized path if available, otherwise fall back to default locale, then first available
    return pathConfig[locale] || pathConfig[defaultLocale] || Object.values(pathConfig)[0] || "/";
}

export function extractComponentValue(componentConfig: string | Record<string, string>, locale: string, defaultLocale: string): string {
    if (typeof componentConfig === "string") {
        return componentConfig;
    }

    // Return localized component if available, otherwise fall back to default locale, then first available
    return componentConfig[locale] || componentConfig[defaultLocale] || Object.values(componentConfig)[0] || "pages/NotFound";
}

export function normalizeRouteName(routeName: string): string {
    return routeName.trim().toLowerCase();
}

export function validateRoutingConfig(config: RoutingConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const routeNames = new Set<string>();

    for (const [routeName, routeConfig] of Object.entries(config)) {
        if (routeName === "settings") continue;

        if (!isRouteConfig(routeConfig)) {
            errors.push(`Invalid route configuration for "${routeName}"`);
            continue;
        }

        const normalizedName = normalizeRouteName(routeName);
        if (routeNames.has(normalizedName)) {
            errors.push(`Duplicate route name: "${routeName}" (normalized: "${normalizedName}")`);
        }
        routeNames.add(normalizedName);

        if (!routeConfig.path) {
            errors.push(`Route "${routeName}" is missing required "path" property`);
        }

        if (!routeConfig.component) {
            errors.push(`Route "${routeName}" is missing required "component" property`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
