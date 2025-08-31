import { Link, useLocation } from "@tanstack/react-router";
import { settings, pathMappings, routeIdMappings, useCurrentLocale, routeTo } from "../routeCache.generated";

export function LocaleSwitcher() {
    // Get supported locales from generated config (completely dynamic)
    const supportedLocales = settings.i18n?.supportedLocales || ["en"];
    const location = useLocation();

    // Use the generated hook to get current locale
    const currentLocale = useCurrentLocale();

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

    // Find route ID by matching current URL against all route patterns
    const findCurrentRouteId = (): { routeId: string; params: Record<string, string> } | null => {
        // Use TanStack Router's location instead of window.location
        const currentPath = location.pathname;
        let pathWithoutBase = currentPath;

        // Remove base path if present
        if (settings.basePath && currentPath.startsWith(settings.basePath)) {
            pathWithoutBase = currentPath.slice(settings.basePath.length) || "/";
        }

        // Try to match current path against all route patterns in pathMappings
        for (const [routePattern, localeMap] of Object.entries(pathMappings)) {
            for (const [locale, localizedPath] of Object.entries(localeMap)) {
                const params = extractParams(pathWithoutBase, localizedPath);
                if (params !== null) {
                    // Found a match! Find the corresponding route ID
                    const routeId = Object.keys(routeIdMappings).find((id) => routeIdMappings[id as keyof typeof routeIdMappings].path === routePattern);
                    if (routeId) {
                        return { routeId, params };
                    }
                }
            }
        }

        return null;
    };

    // Get current page URL in target locale
    const getCurrentPageInLocale = (targetLocale: string): string => {
        const currentRoute = findCurrentRouteId();

        if (currentRoute) {
            // Found the current route - generate URL for target locale
            return routeTo(currentRoute.routeId, currentRoute.params, targetLocale);
        }

        // Fallback: go to home page of target locale
        return routeTo("home", {}, targetLocale);
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
