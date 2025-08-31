// @ts-nocheck
/* eslint-disable */

export function routeTo(routeId, params = {}, locale) {
    const normalizedRouteId = routeId.trim().toLowerCase();

    if (!locale) {
        locale = getCurrentLocale();
    }

    const routeInfo = routeIdMappings[normalizedRouteId];
    if (!routeInfo) {
        console.warn(`Route ID '${routeId}' (normalized: '${normalizedRouteId}') not found`);
        return "/";
    }

    const basePath = routeInfo.path;
    const localizedTemplate = typeof getLocalizedPath !== "undefined" ? getLocalizedPath(basePath, locale) : basePath;

    let finalPath = localizedTemplate;
    for (const [key, value] of Object.entries(params)) {
        finalPath = finalPath.replace(`{${key}}`, String(value));
    }

    return finalPath;
}
