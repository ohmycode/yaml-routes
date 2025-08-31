import { Link } from "@tanstack/react-router";
import { settings, useCurrentLocale, useLocalePath } from "../routeCache.generated";

export function LocaleSwitcher() {
    // Get supported locales from generated config (completely dynamic)
    const supportedLocales = settings.i18n?.supportedLocales || ["en"];

    // Use the generated hook to get current locale
    const currentLocale = useCurrentLocale();

    return (
        <div className="flex gap-2">
            {supportedLocales.map((locale) => {
                const isActive = locale === currentLocale;
                const localizedPath = useLocalePath(locale);

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
