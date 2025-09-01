import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useCurrentLocale } from "../../../routeCache.generated";

interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface PizzaSiteProps {
    breadcrumbs?: BreadcrumbItem[];
    children: ReactNode;
}

export function PizzaSite({ breadcrumbs = [], children }: PizzaSiteProps) {
    const currentLocale = useCurrentLocale();

    return (
        <>
            {/* Site Header */}
            <div className="bg-red-700 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        🍕 {currentLocale === "es" ? "Pizzalandia" : currentLocale === "fr" ? "Pizza Corner" : "Pizza Corner"}
                    </h1>
                    <div className="flex items-center gap-4 text-sm">
                        <span>{currentLocale === "es" ? "Inicio" : currentLocale === "fr" ? "Accueil" : "Home"}</span>
                        <span className="font-semibold border-b-2 border-white">
                            {currentLocale === "es" ? "Menú" : currentLocale === "fr" ? "Menu" : "Menu"}
                        </span>
                        <span>{currentLocale === "es" ? "Contacto" : currentLocale === "fr" ? "Contact" : "Contact"}</span>
                    </div>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 0 && (
                <div className="bg-gray-800 px-6 py-3 text-sm flex items-center gap-2 border-b border-gray-700">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {crumb.to ? (
                                <Link to={crumb.to} className="text-blue-400 hover:underline">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className={index === breadcrumbs.length - 1 ? "text-gray-400" : "text-gray-300 font-medium"}>{crumb.label}</span>
                            )}
                            {index < breadcrumbs.length - 1 && <span className="text-gray-500">›</span>}
                        </div>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <div className="p-6">
                <div className="max-w-4xl mx-auto">{children}</div>
            </div>
        </>
    );
}
