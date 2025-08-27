import { StrictMode } from "react";
import { RouterProvider, Outlet, Link } from "@tanstack/react-router";
import { router, routeTo } from "./routeCache.generated";
import * as m from "./paraglide/messages.js";
import { LocaleSwitcher } from "./components/LocaleSwitcher";

// Root component for TanStack Router
export function RootComponent() {
    return (
        <div className="min-h-screen">
            <nav className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex gap-4 items-center">
                    <Link to={routeTo("home")} className="hover:underline">
                        {m["nav.home"]()}
                    </Link>
                    <Link to={routeTo("about")} className="hover:underline">
                        {m["nav.about"]()}
                    </Link>
                    <Link to={routeTo("special_announcement")} className="hover:underline">
                        Special
                    </Link>
                    <Link to={routeTo("products")} className="hover:underline">
                        {m["nav.products"]()}
                    </Link>

                    {/* Language switcher with direct links to localized pages */}
                    <div className="ml-auto">
                        <LocaleSwitcher />
                    </div>
                </div>
            </nav>
            <main>
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
