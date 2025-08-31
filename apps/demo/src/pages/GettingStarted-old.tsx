export default function GettingStarted() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Getting Started</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">📦 Installation</h2>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                            {`# Install the package
npm install @yaml-routes/tanstack

# Or with yarn
yarn add @yaml-routes/tanstack

# Or with pnpm
pnpm add @yaml-routes/tanstack`}
                        </pre>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">⚙️ Setup</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">1. Create a routes.yml file</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                                {`# routes.yml
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, es]

home:
    path: /
    component: pages/Home

about:
    path:
        en: /about
        es: /acerca-de
    component: pages/About`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">2. Add build script to package.json</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                                {`{
  "scripts": {
    "build:routes": "yaml-routes",
    "dev": "yaml-routes --watch & vite dev"
  }
}`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">3. Generate routes</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                                {`# Generate once
npx yaml-routes

# Or watch for changes during development
npx yaml-routes --watch`}
                            </pre>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">4. Use in your app</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                                {`import { RouterProvider } from "@tanstack/react-router";
import { router, routeTo } from "./routeCache.generated";

function App() {
  return <RouterProvider router={router} />;
}

// Type-safe navigation
const aboutUrl = routeTo("about"); // Uses current locale
const homeUrl = routeTo("home");`}
                            </pre>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🚀 Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">🔒 Type Safety</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Generated TypeScript types ensure your routes are always valid. The{" "}
                                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">routeTo</code> helper provides full IntelliSense support.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">🌐 Internationalization</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Built-in i18n support with localized paths and components. Automatically handles locale prefixes and routing.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">⚡ Performance</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Generate routes at build time for zero-runtime overhead. Only the routes you define are included in the bundle.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">🛠 Developer Experience</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Clean YAML syntax, watch mode for development, and comprehensive error messages when something goes wrong.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">🎯 Why YAML Routes?</h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li>
                            ✅ <strong>Declarative:</strong> Define routes in a single, readable file
                        </li>
                        <li>
                            ✅ <strong>Type-safe:</strong> Generated TypeScript types catch errors at build time
                        </li>
                        <li>
                            ✅ <strong>i18n-first:</strong> Built-in support for multiple languages and locales
                        </li>
                        <li>
                            ✅ <strong>Framework-agnostic:</strong> Currently supports TanStack Router, more coming soon
                        </li>
                        <li>
                            ✅ <strong>Zero-runtime:</strong> All route generation happens at build time
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
