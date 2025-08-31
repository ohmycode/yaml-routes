import { useLocation, Link } from "@tanstack/react-router";
import { pathMappings, getLocalizedPath, globalSettings, routeTo } from "../routeCache.generated";

export function LocaleSwitcher() {
    const location = useLocation();
    const supportedLocales = ["en", "es"];

    // Determine current locale from URL path
    const getCurrentLocaleFromPath = (): string => {
        let currentPath = location.pathname;
        if (globalSettings.basePath && currentPath.startsWith(globalSettings.basePath)) {
            currentPath = currentPath.slice(globalSettings.basePath.length) || "/";
        }

        // Check if path starts with Spanish locale
        if (currentPath.startsWith("/es/") || currentPath === "/es" || currentPath === "/es/") {
            return "es";
        }

        // Default to English
        return "en";
    };

    const currentLocale = getCurrentLocaleFromPath();

    // Extract parameters from a URL using a pattern template
    const extractParams = (url: string, pattern: string): Record<string, string> | null => {
        const regexPattern = pattern.replace(/\{([^}]+)\}/g, "([^/]+)");
        const regex = new RegExp(`^${regexPattern}$`);
        const match = url.match(regex);

        if (!match) return null;

        const paramNames = [...pattern.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
        const params: Record<string, string> = {};
        paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
        });

        return params;
    };

    // Get current page URL in target locale
    const getCurrentPageInLocale = (targetLocale: string): string => {
        // Remove base path to match against pathMappings
        let currentPath = location.pathname;
        if (globalSettings.basePath && currentPath.startsWith(globalSettings.basePath)) {
            currentPath = currentPath.slice(globalSettings.basePath.length) || "/";
        }

        // Try to match current path against all route patterns
        for (const [routeBase, localeMap] of Object.entries(pathMappings)) {
            for (const localePath of Object.values(localeMap)) {
                const params = extractParams(currentPath, localePath);
                if (params !== null) {
                    // Found a match - try to find a route ID for this pattern
                    // For now, let's use a simple mapping approach
                    const routeId = getRouteIdFromPath(routeBase);
                    if (routeId) {
                        return routeTo(routeId, params, targetLocale);
                    }
                }
            }
        }

        // Fallback: remove locale prefix and try matching against English patterns
        let pathWithoutLocale = currentPath;
        if (currentPath.startsWith("/es/")) {
            pathWithoutLocale = currentPath.slice(3) || "/";
        } else if (currentPath === "/es" || currentPath === "/es/") {
            pathWithoutLocale = "/";
        }

        for (const [routeBase, localeMap] of Object.entries(pathMappings)) {
            const enPattern = localeMap.en;
            if (enPattern) {
                const params = extractParams(pathWithoutLocale, enPattern);
                if (params !== null) {
                    const routeId = getRouteIdFromPath(routeBase);
                    if (routeId) {
                        return routeTo(routeId, params, targetLocale);
                    }
                }
            }
        }

        // Ultimate fallback: go to home page of target locale
        return routeTo("home", {}, targetLocale);
    };

    // Simple mapping from path pattern to route ID
    const getRouteIdFromPath = (path: string): string | null => {
        const pathToId: Record<string, string> = {
            "/": "home",
            "/getting-started": "getting_started",
            "/advanced-examples": "advanced_examples",
            "/user/{id}": "user_profile",
            "/user/{id}/images": "user_images",
            "/user/{id}/images/{imageId}": "user_image",
            "/about": "about",
            "/demo": "demo",
        };
        return pathToId[path] || null;
    };

    return (
        <div className="flex gap-2">
            {supportedLocales.map((locale) => {
                const isActive = locale === currentLocale;
                const localizedPath = getCurrentPageInLocale(locale);

                return (
                    <Link
                        key={locale}
                        to={localizedPath}
                        className={`px-2 py-1 text-sm rounded transition-colors ${isActive ? "bg-white/20 text-white" : "text-blue-200 hover:text-white"}`}
                    >
                        {locale.toUpperCase()}
                    </Link>
                );
            })}
        </div>
    );
}
