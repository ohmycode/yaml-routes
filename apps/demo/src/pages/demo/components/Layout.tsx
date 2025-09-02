import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useCurrentLocale } from "../../../routes.gen";

interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface LayoutProps {
    headerTitle?: string;
    subTitle?: string;
    children?: ReactNode;
}

export function Layout({
    headerTitle = "YAML Routes Demo",
    subTitle = "An Interactive i18n routing demonstration with deeply nested URLs",
    children,
}: LayoutProps) {
    const currentLocale = useCurrentLocale();

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto p-8">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
                            {headerTitle}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{subTitle}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">{children}</div>
                </div>
            </div>
        </>
    );
}
