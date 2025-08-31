import { useLocation, Link } from "@tanstack/react-router";
import { getLocale } from "../paraglide/runtime.js";
import { pathMappings, getLocalizedPath, globalSettings } from "../routeCache.generated";

export function LocaleSwitcher() {
    const location = useLocation();
    const currentLocale = getLocale();
    const supportedLocales = ["en", "es"];

    // Debug logging
    console.log("LocaleSwitcher Debug:", {
        currentPath: location.pathname,
        currentLocale,
        basePath: globalSettings.basePath,
        pathMappings,
    });

    // Helper function to match a URL against a pattern and extract parameters
    const matchUrlPattern = (url: string, pattern: string): { match: boolean; params: Record<string, string> } => {
        const regexPattern = pattern.replace(/\{([^}]+)\}/g, "([^/]+)");
        const regex = new RegExp(`^${regexPattern}$`);
        const match = url.match(regex);

        if (!match) {
            return { match: false, params: {} };
        }

        const paramNames = [...pattern.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
        const params: Record<string, string> = {};

        paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
        });

        return { match: true, params };
    };

    // Helper function to fill a pattern with parameter values
    const fillUrlPattern = (pattern: string, params: Record<string, string>): string => {
        let result = pattern;
        for (const [key, value] of Object.entries(params)) {
            result = result.replace(`{${key}}`, value);
        }
        return result;
    };

    // Helper function to get current page URL in a specific locale
    const getCurrentPageInLocale = (targetLocale: string): string => {
        const currentPath = location.pathname;
        let basePath = "/";
        let extractedParams: Record<string, string> = {};

        // TanStack Router location.pathname should already be without basePath
        // So we can directly match against pathMappings
        for (const [base, mappings] of Object.entries(pathMappings)) {
            const localePaths = mappings as Record<string, string>;
            for (const localizedPath of Object.values(localePaths)) {
                const { match, params } = matchUrlPattern(currentPath, localizedPath);
                if (match) {
                    basePath = base;
                    extractedParams = params;
                    break;
                }
            }
            if (basePath !== "/" || currentPath === "/") break;
        }

        const newPathTemplate = getLocalizedPath(basePath, targetLocale);
        const finalPath = fillUrlPattern(newPathTemplate, extractedParams);

        console.log("LocaleSwitcher path generation:", {
            currentPath,
            basePath,
            extractedParams,
            targetLocale,
            newPathTemplate,
            finalPath,
        });

        return finalPath;
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
