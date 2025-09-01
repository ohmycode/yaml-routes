import { useLocation } from "@tanstack/react-router";
import { useCurrentLocale, useRouteParams } from "../../../routeCache.generated";

interface RouteInfoPanelProps {
    routeName: string;
    component: string;
    params?: Record<string, string>;
    urlPattern?: string;
}

export function RouteInfoPanel({ routeName, component, params = {}, urlPattern }: RouteInfoPanelProps) {
    const currentLocale = useCurrentLocale();
    const routeParams = useRouteParams(false);
    const location = useLocation();

    params = params || routeParams || {};

    return (
        <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-700">
            <h3 className="text-lg font-bold mb-3 text-blue-300">🔗 Current Route Information</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-300">Route Name:</span>
                    <code className="bg-blue-800 px-2 py-1 rounded text-blue-300">{routeName}</code>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-300">Component:</span>
                    <code className="bg-blue-800 px-2 py-1 rounded text-blue-300">{component}</code>
                </div>
                {Object.entries(params).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <span className="font-medium text-gray-300 capitalize">{key}:</span>
                        <code className="bg-blue-800 px-2 py-1 rounded text-blue-300">{value}</code>
                    </div>
                ))}
                <div className="flex justify-between">
                    <span className="font-medium text-gray-300">Locale:</span>
                    <code className="bg-blue-800 px-2 py-1 rounded text-blue-300">{currentLocale}</code>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-300">Current URL:</span>
                    <code className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-400">{location.pathname}</code>
                </div>
                {urlPattern && (
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-300">URL Pattern:</span>
                        <code className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-400">{urlPattern}</code>
                    </div>
                )}
            </div>
        </div>
    );
}
