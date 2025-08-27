import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, memo } from "react";
import { getLocale, setLocale, localizeHref, locales as availableLocales } from "../paraglide/runtime.js";
import { useRouter, useLocation } from "@tanstack/react-router";

interface LocaleContextType {
    currentLocale: string;
    switchLocale: (locale: string) => void;
    isActive: (locale: string) => boolean;
    availableLocales: readonly string[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
    children: ReactNode;
}

/**
 * Locale provider that manages global locale state with instant switching
 * Follows Paraglide JS best practices for performance and UX
 */
export function LocaleProvider({ children }: LocaleProviderProps) {
    const router = useRouter();
    const location = useLocation();

    // Track current locale with state that syncs with Paraglide
    const [currentLocale, setCurrentLocale] = useState(() => {
        try {
            return getLocale();
        } catch {
            // Fallback to 'en' if getLocale fails during SSR or initialization
            return "en";
        }
    });

    // Sync with Paraglide when URL changes
    useEffect(() => {
        try {
            const newLocale = getLocale();
            if (newLocale !== currentLocale) {
                setCurrentLocale(newLocale);
            }
        } catch (error) {
            console.warn("Failed to get locale from Paraglide:", error);
        }
    }, [location.pathname, currentLocale]);

    // Enhanced locale switcher with error handling and fallbacks
    const switchLocale = useCallback(
        (targetLocale: string) => {
            if (targetLocale === currentLocale) return;

            // Validate locale is supported
            if (!availableLocales.includes(targetLocale)) {
                console.warn(`Locale '${targetLocale}' is not supported. Available locales:`, availableLocales);
                return;
            }

            try {
                // Get current path with search params and hash
                const currentPath = location.pathname + location.search + location.hash;

                // Use Paraglide's built-in URL localization
                const localizedPath = localizeHref(currentPath, { locale: targetLocale });

                // Update Paraglide locale immediately (no reload for instant switching)
                setLocale(targetLocale, { reload: false });

                // Update React state for immediate UI feedback
                setCurrentLocale(targetLocale);

                // Navigate using TanStack Router for SPA behavior
                router.navigate({
                    to: localizedPath,
                    replace: false, // Allow back navigation between locales
                });
            } catch (error) {
                console.error("Failed to switch locale programmatically:", error);

                // Fallback: use Paraglide's default behavior with page reload
                try {
                    setLocale(targetLocale, { reload: true });
                } catch (fallbackError) {
                    console.error("Fallback locale switching also failed:", fallbackError);
                }
            }
        },
        [currentLocale, location.pathname, location.search, location.hash, router]
    );

    // Helper to check if a locale is currently active
    const isActive = useCallback((locale: string) => locale === currentLocale, [currentLocale]);

    const contextValue: LocaleContextType = {
        currentLocale,
        switchLocale,
        isActive,
        availableLocales,
    };

    return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
}

/**
 * Hook to access locale context
 * Provides current locale and switching functionality
 */
export function useLocale(): LocaleContextType {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error("useLocale must be used within a LocaleProvider");
    }
    return context;
}

/**
 * Higher-order component for locale switching links
 * Uses proper links to localized versions of the current page
 */
interface LocaleSwitcherProps {
    className?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    children?: (locale: string, isActive: boolean, href: string) => ReactNode;
}

export const LocaleSwitcher = memo(function LocaleSwitcher({
    className = "flex gap-2",
    activeClassName = "bg-blue-800",
    inactiveClassName = "bg-blue-500 hover:bg-blue-700",
    children,
}: LocaleSwitcherProps) {
    const { isActive, availableLocales } = useLocale();
    const location = useLocation();

    return (
        <div className={className}>
            {availableLocales.map((locale) => {
                const active = isActive(locale);

                // Generate the localized href for the current page
                const currentPath = location.pathname + location.search + location.hash;
                const localizedHref = localizeHref(currentPath, { locale });

                if (children) {
                    return <div key={locale}>{children(locale, active, localizedHref)}</div>;
                }

                return (
                    <a
                        key={locale}
                        href={localizedHref}
                        className={`px-2 py-1 rounded transition-colors text-white no-underline ${active ? activeClassName : inactiveClassName}`}
                        aria-label={`Switch to ${locale}`}
                        aria-current={active ? "true" : "false"}
                    >
                        {locale.toUpperCase()}
                    </a>
                );
            })}
        </div>
    );
});
