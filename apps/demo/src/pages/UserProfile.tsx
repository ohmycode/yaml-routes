import { Link, useParams } from "@tanstack/react-router";
import { useRouteTo } from "../routeCache.generated";

export default function UserProfile() {
    const { id } = useParams({ strict: false });
    const routeTo = useRouteTo();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link to={routeTo("home")} className="text-blue-600 dark:text-blue-400 hover:underline">
                    ← Back to Home
                </Link>
            </div>

            <h1 className="text-4xl font-bold mb-8">User Profile Demo</h1>

            <div className="space-y-8">
                <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">📄 Route Parameters</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">This page demonstrates how YAML Routes handles route parameters.</p>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                                <p>
                                    <strong>Current User ID:</strong>{" "}
                                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{id || "not-provided"}</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">⚙️ Configuration</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        This route is defined in <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">routes.yml</code> with the following
                        configuration:
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                        {`user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true`}
                    </pre>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🔗 Type-Safe Navigation</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Use the generated <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">routeTo</code> helper for type-safe navigation:
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto mb-4">
                        {`import { routeTo } from "./routeCache.generated";

// Type-safe navigation with parameters
const userUrl = routeTo("user_profile", { id: "123" });

// TypeScript will enforce required parameters
<Link to={userUrl}>View User Profile</Link>`}
                    </pre>

                    <div className="space-y-3">
                        <p className="font-medium">Try different user IDs:</p>
                        <div className="flex flex-wrap gap-2">
                            {["alice", "bob", "charlie", "123", "demo"].map((userId) => (
                                <Link
                                    key={userId}
                                    to={routeTo("user_profile", { id: userId })}
                                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    User {userId}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">🖼️ User Gallery</h3>
                        <p className="text-green-700 dark:text-green-300 mb-3">View this user's image gallery with nested route parameters:</p>
                        <Link
                            to={routeTo("user_images", { id: id || "demo" })}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            📸 View {id || "demo"}'s Images
                        </Link>
                    </div>
                </section>

                <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">🌐 Internationalization</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        This route automatically supports different locales. The same{" "}
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">routeTo</code> call works for all supported languages:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium mb-2">English (current locale):</p>
                            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">/user/{id || "{id}"}</code>
                        </div>
                        <div>
                            <p className="font-medium mb-2">Spanish:</p>
                            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">/es/usuario/{id || "{id}"}</code>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
