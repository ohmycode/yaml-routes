import { useLocation, Link } from "@tanstack/react-router";
import { pathMappings, getLocalizedPath, globalSettings } from "../routeCache.generated";

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

    // Fill a pattern template with parameter values
    const fillPattern = (pattern: string, params: Record<string, string>): string => {
        let result = pattern;
        for (const [key, value] of Object.entries(params)) {
            result = result.replace(`{${key}}`, value);
        }
        return result;
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
                    // Found a match - generate target locale path
                    const targetPattern = getLocalizedPath(routeBase, targetLocale);
                    return fillPattern(targetPattern, params);
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
                    const targetPattern = getLocalizedPath(routeBase, targetLocale);
                    return fillPattern(targetPattern, params);
                }
            }
        }

        // Ultimate fallback: go to home page of target locale
        return getLocalizedPath("/", targetLocale);
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
