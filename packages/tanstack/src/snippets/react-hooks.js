// @ts-nocheck
/* eslint-disable */

import { useState, useEffect } from "react";

export function useCurrentLocale() {
    const [locale, setLocale] = useState(() => {
        if (typeof window === "undefined") return "en";

        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);
        const potentialLocale = segments[0];

        if (potentialLocale && /^[a-z]{2,3}$/i.test(potentialLocale)) {
            return potentialLocale.toLowerCase();
        }

        return "en";
    });

    useEffect(() => {
        const handleLocationChange = () => {
            const path = window.location.pathname;
            const segments = path.split("/").filter(Boolean);
            const potentialLocale = segments[0];

            if (potentialLocale && /^[a-z]{2,3}$/i.test(potentialLocale)) {
                setLocale(potentialLocale.toLowerCase());
            } else {
                setLocale("en");
            }
        };

        window.addEventListener("popstate", handleLocationChange);
        window.addEventListener("routeChange", handleLocationChange);

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.removeEventListener("routeChange", handleLocationChange);
        };
    }, []);

    return locale;
}

export function useRouteTo() {
    const currentLocale = useCurrentLocale();

    return (routeId, params = {}) => {
        return routeTo(routeId, params, currentLocale);
    };
}
