import { StrictMode } from "react";
import { RouterProvider, Outlet, Link } from "@tanstack/react-router";
import { router, useRouteTo } from "./routes.gen";
import { LocaleSwitcher } from "./components/LocaleSwitcher";
import { ThemeToggle } from "./components/ThemeToggle";

// Root component for TanStack Router
export function RootComponent() {
    const routeTo = useRouteTo();
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
            <nav className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-lg">
                <div className="container mx-auto flex gap-6 items-center">
                    <Link to={routeTo("home")} className="font-bold text-lg hover:text-blue-200 transition-colors">
                        YAML Routes
                    </Link>
                    <Link to={routeTo("getting_started")} className="hover:text-blue-200 transition-colors">
                        Getting Started
                    </Link>
                    <Link to={routeTo("pizza_list")} className="hover:text-blue-200 transition-colors">
                        Demo
                    </Link>

                    <div className="ml-auto flex items-center gap-4">
                        <LocaleSwitcher />
                    </div>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8">
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
