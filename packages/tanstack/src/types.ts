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
}

export interface RouteIdMappings {
    [routeId: string]: RouteIdMapping;
}
