import { Link } from "@tanstack/react-router";
import { routeTo } from "../routeCache.generated";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";

function PrismCodeBlock({ language, children, title }: { language: string; children: string; title?: string }) {
    useEffect(() => {
        Prism.highlightAll();
    }, [children]);

    return (
        <div className="relative">
            {title && <div className="bg-gray-800 px-4 py-3 text-sm text-gray-300 rounded-t-lg border-b border-gray-700">{title}</div>}
            <pre className={`${title ? "rounded-b-lg" : "rounded-lg"} text-sm overflow-x-auto !bg-gray-900 !p-4`}>
                <code className={`language-${language}`}>{children.trim()}</code>
            </pre>
        </div>
    );
}

export default function GettingStarted() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-6">Getting Started</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Get up and running with YAML Routes in less than 5 minutes</p>
            </div>

            <div className="space-y-8">
                {/* Step 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <h2 className="text-2xl font-bold">Install the Package</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">Add YAML Routes to your TanStack Router project:</p>

                    <PrismCodeBlock language="bash">
                        {`npm install @yaml-routes/tanstack
# or
pnpm add @yaml-routes/tanstack
# or  
yarn add @yaml-routes/tanstack`}
                    </PrismCodeBlock>
                </div>

                {/* Step 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <h2 className="text-2xl font-bold">Create routes.yml</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Create a <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">routes.yml</code> file in your project root:
                    </p>

                    <PrismCodeBlock language="yaml" title="routes.yml">
                        {`# Basic routes
home:
    path: /
    component: pages/Home

about:
    path: /about
    component: pages/About

# Route with parameters
user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true`}
                    </PrismCodeBlock>
                </div>

                {/* Step 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <h2 className="text-2xl font-bold">Generate Routes</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">Run the CLI to generate your route cache:</p>

                    <PrismCodeBlock language="bash">
                        {`# Generate once
npx yaml-routes

# Or watch for changes during development
npx yaml-routes --watch`}
                    </PrismCodeBlock>
                </div>

                {/* Step 4 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                        <h2 className="text-2xl font-bold">Use in Your Components</h2>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Import the generated <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">routeTo</code> function and use it in your React
                        components:
                    </p>

                    <PrismCodeBlock language="typescript" title="App.tsx">
                        {`import { Link } from "@tanstack/react-router";
import { routeTo } from "./routeCache.generated";

function App() {
    return (
        <nav>
            <Link to={routeTo("home")}>Home</Link>
            <Link to={routeTo("about")}>About</Link>
            <Link to={routeTo("user_profile", { id: "alice" })}>
                Alice's Profile
            </Link>
        </nav>
    );
}`}
                    </PrismCodeBlock>
                </div>
            </div>

            {/* Next Steps */}
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold mb-6">What's Next?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Link to={routeTo("advanced_examples")} className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Advanced Examples</h3>
                        <p className="text-blue-100">Explore internationalization, complex parameters, and advanced patterns</p>
                    </Link>

                    <Link
                        to={routeTo("demo")}
                        className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-6 rounded-xl transition-colors"
                    >
                        <h3 className="text-xl font-bold mb-2">Live Demo</h3>
                        <p className="text-gray-600 dark:text-gray-300">See all features in action with interactive examples</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
