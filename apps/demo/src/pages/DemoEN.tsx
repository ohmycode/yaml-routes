import { Link } from "@tanstack/react-router";
import { useRouteTo } from "../routeCache.generated";

export default function ExamplesEN() {
    const routeTo = useRouteTo();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Examples & Features</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">🎯 Interactive Examples</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Explore the features of YAML Routes with these interactive examples.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-3">🔗 Basic Routing</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Simple routes with clean URLs and type-safe navigation.</p>
                            <div className="space-y-2">
                                <Link
                                    to={routeTo("home")}
                                    className="block px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center text-sm"
                                >
                                    Home Page
                                </Link>
                                <Link
                                    to={routeTo("about")}
                                    className="block px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-center text-sm"
                                >
                                    About Page
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-3">📄 Route Parameters</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Dynamic routes with type-safe parameter handling.</p>
                            <div className="space-y-2">
                                <Link
                                    to={routeTo("user_profile", { id: "alice" })}
                                    className="block px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-center text-sm"
                                >
                                    User Profile (alice)
                                </Link>
                                <Link
                                    to={routeTo("user_profile", { id: "demo-123" })}
                                    className="block px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-center text-sm"
                                >
                                    User Profile (demo-123)
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🌐 Internationalization</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        This page demonstrates locale-specific components. The same route ID renders different components based on the current locale.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">🇺🇸 English Version</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            You're currently viewing the English version of this page, which uses the{" "}
                            <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">ExamplesEN</code> component.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="font-medium mb-1">Route Configuration:</p>
                                <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                                    {`examples:
    path:
        en: /examples
        es: /ejemplos
    component:
        en: pages/ExamplesEN
        es: pages/ExamplesES`}
                                </pre>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Current URLs:</p>
                                <ul className="space-y-1">
                                    <li>
                                        🇺🇸 English: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/examples</code>
                                    </li>
                                    <li>
                                        🇪🇸 Spanish: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">/es/ejemplos</code>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">💻 Code Examples</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Type-Safe Navigation</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                                {`import { routeTo } from "./routeCache.generated";

// Simple route
const homeUrl = routeTo("home");

// Route with parameters (TypeScript enforces required params)
const userUrl = routeTo("user_profile", { id: "123" });

// Locale-aware routing (automatically uses current locale)
const aboutUrl = routeTo("about");

// Navigation
<Link to={userUrl}>View Profile</Link>`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Generated Type Safety</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                                {`// Generated types ensure parameter safety
routeTo("user_profile", { id: "123" });        // ✅ Valid
routeTo("user_profile", { userId: "123" });    // ❌ TypeScript error
routeTo("user_profile");                       // ❌ Missing required param

// IntelliSense support for route IDs
routeTo("user_prof|");  // Auto-completes to "user_profile"`}
                            </pre>
                        </div>
                    </div>
                </section>

                <section className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">✨ Why This Matters</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">🔒 Type Safety</h3>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>• Catch routing errors at build time</li>
                                <li>• Auto-completion for route IDs</li>
                                <li>• Parameter validation</li>
                                <li>• Refactoring safety</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">🌍 i18n First</h3>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>• Localized URLs out of the box</li>
                                <li>• Per-locale components</li>
                                <li>• SEO-friendly URLs</li>
                                <li>• Automatic locale handling</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
