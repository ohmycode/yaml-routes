import React, { memo } from "react";
import { useLocation } from "@tanstack/react-router";
import { getLocale, locales } from "../paraglide/runtime.js";
import { pathMappings, getLocalizedPath } from "../routeCache.generated";

interface LocaleSwitcherProps {
    className?: string;
    activeClassName?: string;
    inactiveClassName?: string;
}

/**
 * Locale switcher using proper links that navigate to the current page in different locales
 * Uses the generated path mappings to create proper localized URLs
 */
export const LocaleSwitcher = memo(function LocaleSwitcher({
    className = "flex gap-2",
    activeClassName = "bg-blue-800",
    inactiveClassName = "bg-blue-500 hover:bg-blue-700",
}: LocaleSwitcherProps) {
    const location = useLocation();
    const currentLocale = getLocale();

    // Helper function to match a URL against a pattern and extract parameters
    const matchUrlPattern = (url: string, pattern: string): { match: boolean; params: Record<string, string> } => {
        // Convert pattern like "/user/{id}" to regex like "^/user/([^/]+)$"
        const regexPattern = pattern.replace(/\{([^}]+)\}/g, "([^/]+)");
        const regex = new RegExp(`^${regexPattern}$`);
        const match = url.match(regex);

        if (!match) {
            return { match: false, params: {} };
        }

        // Extract parameter names from pattern
        const paramNames = [...pattern.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
        const params: Record<string, string> = {};

        // Map captured groups to parameter names
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

        // Find the base path by matching against patterns
        let basePath = "/";
        let extractedParams: Record<string, string> = {};

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

        // Get the new localized path template
        const newPathTemplate = getLocalizedPath(basePath, targetLocale);

        // Fill the template with extracted parameters
        return fillUrlPattern(newPathTemplate, extractedParams);
    };

    return (
        <div className={className}>
            {locales.map((locale: string) => {
                const isActive = locale === currentLocale;

                // Generate localized href for this locale
                const localizedPath = getCurrentPageInLocale(locale);

                return (
                    <a
                        key={locale}
                        href={localizedPath}
                        className={`px-2 py-1 rounded transition-colors text-white no-underline ${isActive ? activeClassName : inactiveClassName}`}
                        aria-label={`Switch to ${locale.toUpperCase()}`}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {locale.toUpperCase()}
                    </a>
                );
            })}
        </div>
    );
});
