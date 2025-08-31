import { Link } from "@tanstack/react-router";
import { useRouteTo } from "../routeCache.generated";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

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
            className={`
                px-4 py-2 text-xs bg-gray-800/90 hover:bg-gray-700/90 
                text-gray-300 hover:text-white rounded-lg 
                transition-all duration-200 font-medium 
                backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50
                shadow-lg hover:shadow-xl transform hover:scale-105
                ${copied ? "bg-green-600/90 text-white border-green-500/50" : ""}
                ${className}
            `}
            title="Copy to clipboard"
        >
            {copied ? "✓ Copied!" : "📋 Copy"}
        </button>
    );
}

function ShikiCodeBlock({ language, children, title }: { language: string; children: string; title?: string }) {
    const [highlightedHtml, setHighlightedHtml] = useState("");

    useEffect(() => {
        const highlightCode = async () => {
            const highlighted = await codeToHtml(children.trim(), {
                lang: language as any,
                theme: "github-dark",
                transformers: [
                    {
                        pre(node) {
                            this.addClassToHast(node, "overflow-x-auto");
                            this.addClassToHast(node, "text-sm");
                            this.addClassToHast(node, "leading-relaxed");
                        },
                        code(node) {
                            this.addClassToHast(node, "block");
                            this.addClassToHast(node, "p-6");
                        },
                    },
                ],
            });
            setHighlightedHtml(highlighted);
        };
        highlightCode();
    }, [children, language]);

    return (
        <div className="relative group">
            {title && (
                <div className="bg-gradient-to-r from-gray-800 to-gray-750 px-6 py-4 text-sm text-gray-300 rounded-t-xl border-b border-gray-700/50 flex items-center gap-3 shadow-lg">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></span>
                    </div>
                    <span className="ml-2 font-medium text-gray-200">{title}</span>
                </div>
            )}
            <div className="relative overflow-hidden">
                <div
                    className={`
                        ${title ? "rounded-b-xl" : "rounded-xl"} 
                        !bg-gradient-to-br !from-gray-900 !to-gray-800 
                        shadow-2xl border border-gray-700/50
                        relative overflow-x-auto
                        group-hover:shadow-3xl transition-all duration-300
                        [&>pre]:!bg-transparent [&>pre]:!p-6 [&>pre]:!m-0
                        [&>pre>code]:!bg-transparent
                    `}
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
                <CopyButton text={children.trim()} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200" />
            </div>
        </div>
    );
}

export default function GettingStarted() {
    const routeTo = useRouteTo();

    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section with Modern Styling */}
            <div className="text-center mb-20 py-16">
                <div className="mb-8">
                    <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                        Getting Started
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed font-light">
                    Get up and running with <strong className="font-bold text-blue-600">YAML Routes</strong> in less than 5 minutes
                </p>

                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 px-6 py-3 rounded-full text-lg font-medium shadow-lg">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    Zero runtime dependencies • Generate framework-native code
                </div>
            </div>

            <div className="space-y-12">
                {/* Step 1 - Installation Methods */}
                <div className="relative group">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-3xl blur-xl transform transition-all duration-700 group-hover:scale-105 opacity-70"></div>

                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                1
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Choose Your Installation Method</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">YAML Routes offers two installation approaches to fit your workflow</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* NPX Method - Simplified */}
                            <div className="border border-green-200 dark:border-green-800 rounded-xl p-8 bg-green-50 dark:bg-green-900/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">⚡</div>
                                    <h3 className="text-xl font-bold text-green-800 dark:text-green-400">Recommended: NPX (No Installation)</h3>
                                </div>
                                <p className="text-green-700 dark:text-green-300 mb-6">Perfect for most projects. Just run and generate!</p>

                                <ShikiCodeBlock language="bash">
                                    {`# Generate routes directly (no installation needed)
npx yaml-routes

# Watch for changes during development  
npx yaml-routes --watch`}
                                </ShikiCodeBlock>

                                <div className="mt-6 p-4 bg-green-100 dark:bg-green-800/50 rounded-lg">
                                    <p className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                                        <span className="text-lg">✨</span> Benefits:
                                    </p>
                                    <ul className="space-y-2 text-green-700 dark:text-green-300">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                            Zero dependencies in your project
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                            Always uses the latest version
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                            Generated code is framework-native
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                            No package.json bloat
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Package Method - Simplified */}
                            <div className="border border-blue-200 dark:border-blue-800 rounded-xl p-8 bg-blue-50 dark:bg-blue-900/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">📦</div>
                                    <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400">Package Installation</h3>
                                </div>
                                <p className="text-blue-700 dark:text-blue-300 mb-6">For programmatic usage or custom build scripts.</p>

                                <ShikiCodeBlock language="bash">
                                    {`npm install @yaml-routes/tanstack
# or
pnpm add @yaml-routes/tanstack
# or  
yarn add @yaml-routes/tanstack`}
                                </ShikiCodeBlock>

                                <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                                    <p className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                                        <span className="text-lg">🔧</span> Use cases:
                                    </p>
                                    <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            Custom build integrations
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            Programmatic API usage
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            TypeScript type imports
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            Advanced customizations
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600">
                            <p className="text-gray-700 dark:text-gray-300 text-lg">
                                <strong className="text-blue-600 dark:text-blue-400">💡 Pro tip:</strong> The generated code has zero runtime dependencies on
                                yaml-routes. It only imports from{" "}
                                <code className="bg-white/70 dark:bg-gray-600 px-2 py-1 rounded font-mono text-sm">@tanstack/react-router</code> and{" "}
                                <code className="bg-white/70 dark:bg-gray-600 px-2 py-1 rounded font-mono text-sm">react</code>
                                (which you already have in your project).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 2 - Create YAML */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-3xl blur-xl transform transition-all duration-700 group-hover:scale-105 opacity-70"></div>

                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                2
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Create routes.yml</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    Create a <code className="bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded font-mono text-sm">routes.yml</code> file in
                                    your project root
                                </p>
                            </div>
                        </div>

                        <ShikiCodeBlock language="yaml" title="routes.yml">
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
                        </ShikiCodeBlock>
                    </div>
                </div>

                {/* Step 3 - Generate Routes */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-green-600/10 rounded-3xl blur-xl transform transition-all duration-700 group-hover:scale-105 opacity-70"></div>

                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                3
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Generate Routes</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">Run the CLI to generate your route cache</p>
                            </div>
                        </div>

                        <ShikiCodeBlock language="bash">
                            {`# 🚀 NPX method (recommended)
npx yaml-routes

# Or watch for changes during development
npx yaml-routes --watch

# 📦 If you installed the package
yarn yaml-routes
# or node_modules/.bin/yaml-routes`}
                        </ShikiCodeBlock>

                        <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700">
                            <p className="text-green-700 dark:text-green-300 text-lg">
                                <strong className="text-green-800 dark:text-green-400">✨ Generated code:</strong> Creates{" "}
                                <code className="bg-green-200/70 dark:bg-green-800 px-2 py-1 rounded font-mono text-sm">src/routeCache.generated.tsx</code> with
                                TypeScript types, route helpers, and internationalization support.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 4 - Use Generated Routes */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-amber-600/10 to-orange-600/10 rounded-3xl blur-xl transform transition-all duration-700 group-hover:scale-105 opacity-70"></div>

                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                4
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Use Generated Routes</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-lg">
                                    Import the generated helpers from your own project and use them in React components
                                </p>
                            </div>
                        </div>

                        <ShikiCodeBlock language="typescript" title="App.tsx">
                            {`import { Link } from "@tanstack/react-router";
import { useRouteTo } from "./routeCache.generated"; // ← Your generated file

function App() {
    const routeTo = useRouteTo();
    
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
                        </ShikiCodeBlock>

                        <div className="mt-6 p-6 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl border border-orange-200 dark:border-orange-700">
                            <p className="text-orange-700 dark:text-orange-300 text-lg">
                                <strong className="text-orange-800 dark:text-orange-400">🎯 Zero dependencies:</strong> The generated code only imports from
                                <code className="bg-orange-200/70 dark:bg-orange-800 px-2 py-1 mx-2 rounded font-mono text-sm">@tanstack/react-router</code> and
                                <code className="bg-orange-200/70 dark:bg-orange-800 px-2 py-1 mx-2 rounded font-mono text-sm">react</code> — libraries you
                                already have in your project!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Next Steps Section - Enhanced */}
            <div className="mt-20 py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white shadow-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">What's Next?</h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">Ready to explore advanced features and see everything in action?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-8">
                    <Link
                        to={routeTo("advanced_examples")}
                        className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 p-8 rounded-2xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-2 border border-white/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                                🚀
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Advanced Examples</h3>
                            <p className="text-blue-100 text-lg">Explore internationalization, complex parameters, and advanced patterns</p>
                        </div>
                    </Link>

                    <Link
                        to={routeTo("demo")}
                        className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 p-8 rounded-2xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-2 border border-white/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                                🎮
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Live Demo</h3>
                            <p className="text-blue-100 text-lg">See all features in action with interactive examples</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
