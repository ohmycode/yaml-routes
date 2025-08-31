import { useState } from "react";

function CopyButton({ text, className = "" }: { text: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors ${className}`}
            title="Copy to clipboard"
        >
            {copied ? "Copied!" : "Copy"}
        </button>
    );
}

function CodeBlock({ language, children, title }: { language: string; children: string; title?: string }) {
    return (
        <div className="relative">
            {title && <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 rounded-t-lg border-b border-gray-700">{title}</div>}
            <div className="relative">
                <pre className={`bg-gray-900 p-4 ${title ? "rounded-b-lg" : "rounded-lg"} text-sm overflow-x-auto`}>
                    <code className={`language-${language} text-gray-100`}>{children}</code>
                </pre>
                <CopyButton text={children.trim()} className="absolute top-2 right-2" />
            </div>
        </div>
    );
}

export default function GettingStarted() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Getting Started</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">📦 Installation</h2>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <CodeBlock language="bash" title="npm">
                            {`npm install @yaml-routes/tanstack`}
                        </CodeBlock>
                        <CodeBlock language="bash" title="yarn">
                            {`yarn add @yaml-routes/tanstack`}
                        </CodeBlock>
                        <CodeBlock language="bash" title="pnpm">
                            {`pnpm add @yaml-routes/tanstack`}
                        </CodeBlock>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">⚙️ Setup</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-3">1. Create a routes.yml file</h3>
                            <CodeBlock language="yaml" title="routes.yml">
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
                            </CodeBlock>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-3">2. Add build script to package.json</h3>
                            <CodeBlock language="json" title="package.json">
                                {`{
  "scripts": {
    "build:routes": "yaml-routes",
    "dev": "yaml-routes --watch & vite dev"
  }
}`}
                            </CodeBlock>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-3">3. Generate routes</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <CodeBlock language="bash" title="One-time generation">
                                    {`npx yaml-routes`}
                                </CodeBlock>
                                <CodeBlock language="bash" title="Watch mode (development)">
                                    {`npx yaml-routes --watch`}
                                </CodeBlock>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-3">4. Use in your app</h3>
                            <CodeBlock language="typescript" title="App.tsx">
                                {`import { RouterProvider } from "@tanstack/react-router";
import { router, routeTo } from "./routeCache.generated";

function App() {
  return <RouterProvider router={router} />;
}

// Type-safe navigation
const aboutUrl = routeTo("about"); // Uses current locale
const homeUrl = routeTo("home");`}
                            </CodeBlock>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🚀 Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">🔒 Type Safety</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                Generated TypeScript types ensure your routes are always valid. The{" "}
                                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">routeTo</code> helper provides full IntelliSense support.
                            </p>
                            <CodeBlock language="typescript">
                                {`// TypeScript enforces parameters
routeTo("user", { id: "123" }); // ✅
routeTo("user"); // ❌ Missing required param`}
                            </CodeBlock>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">🌐 Internationalization</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                Built-in i18n support with localized paths and components. Automatically handles locale prefixes and routing.
                            </p>
                            <CodeBlock language="typescript">
                                {`// Same function, different locales
routeTo("about"); // EN: /about
routeTo("about"); // ES: /es/acerca-de`}
                            </CodeBlock>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">⚡ Performance</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                Generate routes at build time for zero-runtime overhead. Only the routes you define are included in the bundle.
                            </p>
                            <CodeBlock language="bash">
                                {`# Build-time generation
npx yaml-routes
# ✅ Generated: routeCache.generated.tsx`}
                            </CodeBlock>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">🛠 Developer Experience</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                Clean YAML syntax, watch mode for development, and comprehensive error messages when something goes wrong.
                            </p>
                            <CodeBlock language="yaml">
                                {`# Clean, readable syntax
user_profile:
    path: /user/{id}
    component: pages/UserProfile`}
                            </CodeBlock>
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
