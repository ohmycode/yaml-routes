import { ReactNode } from "react";
import { useCurrentLocale } from "../../../routeCache.generated";

interface BrowserProps {
    domain?: string;
    path?: string;
    title?: string;
    theme?: "light" | "dark";
    children: ReactNode;
}

export function Browser({ domain, path = "", title = "Demo Site", theme = "light", children }: BrowserProps) {
    const currentLocale = useCurrentLocale();

    // Auto-generate domain based on locale if not provided
    const autoGenDomain = domain || (currentLocale === "es" ? "pizzalandia.es" : "pizzacorner.com");

    const isDark = theme === "dark";
    const bgClass = isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900";

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            {/* Browser Header */}
            <div className="bg-gray-700 px-4 py-3 flex items-center gap-3 border-b border-gray-600">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex-1 bg-gray-600 rounded px-3 py-1 text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-gray-400">🔒</span>
                    <span className="font-mono text-xs">
                        {autoGenDomain}
                        {path}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-white text-sm">⟳</button>
            </div>

            {/* Browser Content */}
            <div className={`min-h-[600px] ${bgClass}`}>{children}</div>
        </div>
    );
}
