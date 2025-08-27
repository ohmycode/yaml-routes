import { useState, useEffect, useCallback } from "react";
import { getLocale, setLocale, localizeHref } from "../paraglide/runtime.js";
import { useRouter, useLocation } from "@tanstack/react-router";

/**
 * Custom hook for managing locale state with instant language switching
 * Uses Paraglide JS best practices for instant locale updates
 */
export function useLocale() {
    const router = useRouter();
    const location = useLocation();

    // Initialize with current Paraglide locale
    const [currentLocale, setCurrentLocale] = useState(() => getLocale());

    // Sync with Paraglide when URL changes
    useEffect(() => {
        const newLocale = getLocale();
        if (newLocale !== currentLocale) {
            setCurrentLocale(newLocale);
        }
    }, [location.pathname, currentLocale]);

    // Language switcher with instant content update
    const switchLocale = useCallback(
        (targetLocale: string) => {
            if (targetLocale === currentLocale) return;

            try {
                // Get the current path with search params
                const currentPath = location.pathname + location.search;

                // Use Paraglide's built-in localization
                const localizedPath = localizeHref(currentPath, { locale: targetLocale });

                // Update Paraglide locale instantly without page reload
                setLocale(targetLocale, { reload: false });

                // Update local state immediately for instant UI feedback
                setCurrentLocale(targetLocale);

                // Navigate to localized URL
                router.navigate({ to: localizedPath });
            } catch (error) {
                console.error("Failed to switch locale:", error);
                // Fallback: allow page reload if programmatic switch fails
                setLocale(targetLocale, { reload: true });
            }
        },
        [currentLocale, location.pathname, location.search, router]
    );

    return {
        currentLocale,
        switchLocale,
        isActive: (locale: string) => locale === currentLocale,
    };
}
