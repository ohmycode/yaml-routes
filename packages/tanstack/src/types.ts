export interface RouteParameter {
    type: "string" | "number" | "boolean";
    required: boolean;
    default?: string | number | boolean;
}

export interface LocalizedPath {
    [locale: string]: string;
}

export interface LocalizedComponent {
    [locale: string]: string;
}

export interface RouteSettings {
    render?: "ssg" | "ssr" | "spa";
    [key: string]: any;
}

export interface RouteConfig {
    path: string | LocalizedPath;
    component: string | LocalizedComponent;
    parameters?: Record<string, RouteParameter>;
    settings?: RouteSettings;
}

export interface Settings {
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

export interface RoutingConfig {
    settings?: Settings;
    [routeName: string]: RouteConfig | Settings | undefined;
}

export interface GeneratedRoute {
    id: string;
    path: string;
    component: string;
    parameters: Record<string, RouteParameter>;
    i18nPaths: Record<string, string>;
    i18nComponents: Record<string, string>;
    settings?: RouteSettings;
}

export type SupportedLocale = string;

export interface RouteGenerationOptions {
    configPath?: string;
    outputPath?: string;
    defaultLocale?: SupportedLocale;
    supportedLocales?: SupportedLocale[];
    framework?: "tanstack-router" | "react-router";
}

export interface BuildConfig extends RouteGenerationOptions {
    configPath: string;
    outputPath: string;
}

// Runtime types for generated helpers
export interface PathMappings {
    [basePath: string]: {
        [locale: string]: string;
    };
}

export interface RouteIdMapping {
    path: string;
    parameters: string[];
    requiredParameters?: string[];
}

export interface RouteIdMappings {
    [routeId: string]: RouteIdMapping;
}

// Type utilities for type-safe routing
export type ExtractRouteParams<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
    ? { [K in Param]: string } & ExtractRouteParams<Rest>
    : {};

export type RouteParamsFromConfig<T extends RouteIdMappings> = {
    [K in keyof T]: T[K] extends { path: infer Path; parameters: readonly string[] } ? (Path extends string ? ExtractRouteParams<Path> : never) : never;
};

// Helper type to check if params are required
export type HasRequiredParams<T> = {} extends T ? false : true;

// Conditional parameter type - if no required params, make it optional
export type RouteToParams<T> = HasRequiredParams<T> extends true ? [params: T] : [params?: T];

// Main type-safe routeTo function signature
export type RouteToFunction<T extends RouteIdMappings> = <K extends keyof T>(routeId: K, ...params: RouteToParams<RouteParamsFromConfig<T>[K]>) => string;
