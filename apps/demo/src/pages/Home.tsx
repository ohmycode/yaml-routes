import { Link } from "@tanstack/react-router";
import { routeTo } from "../routeCache.generated";
import * as m from "../paraglide/messages.js";
import { LanguageSwitchDemo } from "../components/LanguageSwitchDemo";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">{m["page.home.title"]()}</h1>

                {/* Language switching demo */}
                <LanguageSwitchDemo />

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">🎯 Features</h2>
                        <ul className="space-y-2">
                            <li>✅ YAML-based route configuration</li>
                            <li>✅ Built-in internationalization</li>
                            <li>✅ Type-safe route generation</li>
                            <li>✅ TanStack Router integration</li>
                            <li>✅ Locale-specific components</li>
                            <li>
                                ✅ <strong>Instant language switching</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">🚀 Quick Links</h2>
                        <div className="space-y-3">
                            <Link
                                to={routeTo("about")}
                                className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center"
                            >
                                {m["nav.about"]()}
                            </Link>
                            <Link
                                to={routeTo("demo")}
                                className="block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-center"
                            >
                                Demo Page
                            </Link>
                            <Link
                                to={routeTo("products")}
                                className="block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-center"
                            >
                                {m["nav.products"]()}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">📝 How it works</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>
                            Define routes in <code className="bg-gray-100 px-2 py-1 rounded">routing.yml</code>
                        </li>
                        <li>
                            Run <code className="bg-gray-100 px-2 py-1 rounded">yaml-routes</code> to generate code
                        </li>
                        <li>Import and use generated router and helpers</li>
                        <li>Enjoy type-safe, localized routing! 🎉</li>
                        <li>
                            <strong>Switch languages instantly without page reloads! ⚡</strong>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
