// @ts-nocheck
/* eslint-disable */

export function getCurrentLocale() {
    if (typeof window === "undefined") return "en";

    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const potentialLocale = segments[0];

    if (potentialLocale && /^[a-z]{2,3}$/i.test(potentialLocale)) {
        return potentialLocale.toLowerCase();
    }

    return "en";
}
