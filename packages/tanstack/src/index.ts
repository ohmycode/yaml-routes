// Main exports for @yaml-routes/tanstack package
export { generateTanStackRoutes } from "./generator";
export {
    loadRoutingConfig,
    isRouteConfig,
    convertYamlPathToTanstackPath,
    convertYamlPathToReactRouterPath,
    generateRouteId,
    generateComponentImportPath,
    extractPathValue,
    extractComponentValue,
    normalizeRouteName,
    validateRoutingConfig,
} from "./utils";

export type {
    RouteParameter,
    LocalizedPath,
    LocalizedComponent,
    RouteSettings,
    RouteConfig,
    GlobalSettings,
    RoutingConfig,
    GeneratedRoute,
    SupportedLocale,
    RouteGenerationOptions,
    BuildConfig,
    PathMappings,
    RouteIdMapping,
    RouteIdMappings,
} from "./types";
