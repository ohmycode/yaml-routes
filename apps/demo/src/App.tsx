import { StrictMode, useState, useEffect } from "react";
import { RouterProvider, Outlet, Link, useLocation } from "@tanstack/react-router";
import { router, routeTo, getLocalizedPath, pathMappings } from "./routeCache.generated";
import * as m from "./paraglide/messages.js";

// Root component for TanStack Router
export function RootComponent() {
    const location = useLocation();

    // Get current locale from URL for reliable active state detection
    const getCurrentLocaleFromUrl = (): "en" | "fr" | "es" => {
        const path = location.pathname;
        const localeMatch = path.match(/^\/([a-z]{2})(\/|$)/);

        if (localeMatch && ["en", "fr", "es"].includes(localeMatch[1])) {
            return localeMatch[1] as "en" | "fr" | "es";
        }
        return "en"; // Default to English
    };

    // State to track current locale and force re-render when it changes
    const [currentLocale, setCurrentLocale] = useState<"en" | "fr" | "es">(getCurrentLocaleFromUrl());

    // Update current locale when location changes
    useEffect(() => {
        const newLocale = getCurrentLocaleFromUrl();
        if (newLocale !== currentLocale) {
            setCurrentLocale(newLocale);
        }
    }, [location.pathname, currentLocale]);

    // Note: We don't need to manually set Paraglide locale here since TanStack Router
    // handles navigation and Paraglide detects locale from URL automatically

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
    const getCurrentPageInLocale = (targetLocale: "en" | "fr" | "es"): string => {
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

    const currentUrlLocale = currentLocale;

    return (
        <div className="min-h-screen">
            <nav className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex gap-4 items-center">
                    <Link to={routeTo("home")} className="hover:underline">
                        {m["nav.home"]()}
                    </Link>
                    <Link to={routeTo("about")} className="hover:underline">
                        {m["nav.about"]()}
                    </Link>
                    <Link to={routeTo("demo")} className="hover:underline">
                        Demo
                    </Link>
                    <Link to={routeTo("special_announcement")} className="hover:underline">
                        Special
                    </Link>
                    <Link to={routeTo("blog_index")} className="hover:underline">
                        Blog
                    </Link>
                    <Link to={routeTo("products")} className="hover:underline">
                        {m["nav.products"]()}
                    </Link>
                    <Link to={routeTo("user_settings")} className="hover:underline">
                        {m["nav.settings"]()}
                    </Link>

                    {/* Language switcher */}
                    <div className="ml-auto flex gap-2">
                        <Link
                            to={getCurrentPageInLocale("en")}
                            className={`px-2 py-1 rounded ${currentUrlLocale === "en" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"}`}
                        >
                            EN
                        </Link>
                        <Link
                            to={getCurrentPageInLocale("fr")}
                            className={`px-2 py-1 rounded ${currentUrlLocale === "fr" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"}`}
                        >
                            FR
                        </Link>
                        <Link
                            to={getCurrentPageInLocale("es")}
                            className={`px-2 py-1 rounded ${currentUrlLocale === "es" ? "bg-blue-800" : "bg-blue-500 hover:bg-blue-700"}`}
                        >
                            ES
                        </Link>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

// App component that wraps RouterProvider
export default function App() {
    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
}
