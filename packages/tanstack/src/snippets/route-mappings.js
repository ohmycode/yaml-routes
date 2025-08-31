// @ts-nocheck
/* eslint-disable */

export function generateRouteIdMappings(routes) {
    const mappings = {};

    function processRoute(route) {
        if (route.id) {
            mappings[route.id.toLowerCase()] = {
                path: route.path,
                parameters: route.parameters || [],
            };
        }

        if (route.children) {
            route.children.forEach(processRoute);
        }
    }

    routes.forEach(processRoute);

    return mappings;
}
