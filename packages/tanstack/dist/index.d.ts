interface RouteParameter {
    type: "string" | "number" | "boolean";
    required: boolean;
    default?: string | number | boolean;
}
interface LocalizedPath {
    [locale: string]: string;
}
interface LocalizedComponent {
    [locale: string]: string;
}
interface RouteSettings {
    render?: "ssg" | "ssr" | "spa";
    [key: string]: any;
}
interface RouteConfig {
    path: string | LocalizedPath;
    component: string | LocalizedComponent;
    parameters?: Record<string, RouteParameter>;
    settings?: RouteSettings;
}
interface Settings {
    i18n?: {
        enabled: boolean;
        defaultLocale: string;
        supportedLocales: string[];
        forceLocaleUrl?: boolean;
    };
    render?: "ssg" | "ssr" | "spa";
    basePath?: string;
    [key: string]: any;
}
interface RoutingConfig {
    settings?: Settings;
    [routeName: string]: RouteConfig | Settings | undefined;
}
interface GeneratedRoute {
    id: string;
    path: string;
    component: string;
    parameters: Record<string, RouteParameter>;
    i18nPaths: Record<string, string>;
    i18nComponents: Record<string, string>;
    settings?: RouteSettings;
}
type SupportedLocale = string;
interface RouteGenerationOptions {
    configPath?: string;
    outputPath?: string;
    defaultLocale?: SupportedLocale;
    supportedLocales?: SupportedLocale[];
    framework?: "tanstack-router" | "react-router";
}
interface BuildConfig extends RouteGenerationOptions {
    configPath: string;
    outputPath: string;
}
interface PathMappings {
    [basePath: string]: {
        [locale: string]: string;
    };
}
interface RouteIdMapping {
    path: string;
    parameters: string[];
    requiredParameters?: string[];
}
interface RouteIdMappings {
    [routeId: string]: RouteIdMapping;
}

declare function generateTanStackRoutes(config: BuildConfig): Promise<void>;

declare function loadRoutingConfig(configPath?: string): Promise<RoutingConfig>;
declare function isRouteConfig(value: any): value is RouteConfig;
declare function convertYamlPathToTanstackPath(yamlPath: string): string;
declare function convertYamlPathToReactRouterPath(yamlPath: string): string;
declare function generateRouteId(routeName: string): string;
declare function generateComponentImportPath(componentPath: string): string;
declare function extractPathValue(pathConfig: string | Record<string, string>, locale: string, defaultLocale: string): string;
declare function extractComponentValue(componentConfig: string | Record<string, string>, locale: string, defaultLocale: string): string;
declare function normalizeRouteName(routeName: string): string;
declare function validateRoutingConfig(config: RoutingConfig): {
    valid: boolean;
    errors: string[];
};

export { type BuildConfig, type GeneratedRoute, type LocalizedComponent, type LocalizedPath, type PathMappings, type RouteConfig, type RouteGenerationOptions, type RouteIdMapping, type RouteIdMappings, type RouteParameter, type RouteSettings, type RoutingConfig, type Settings, type SupportedLocale, convertYamlPathToReactRouterPath, convertYamlPathToTanstackPath, extractComponentValue, extractPathValue, generateComponentImportPath, generateRouteId, generateTanStackRoutes, isRouteConfig, loadRoutingConfig, normalizeRouteName, validateRoutingConfig };
