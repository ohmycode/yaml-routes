import { Link } from "@tanstack/react-router";
import { routeTo } from "../routeCache.generated";
import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";

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
            className={`px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors font-medium ${className}`}
            title="Copy to clipboard"
        >
            {copied ? "✓ Copied!" : "Copy"}
        </button>
    );
}

function InstallBox() {
    const commands = [
        { label: "npm", command: "npm install @yaml-routes/tanstack" },
        { label: "pnpm", command: "pnpm add @yaml-routes/tanstack" },
        { label: "yarn", command: "yarn add @yaml-routes/tanstack" },
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-gray-900 rounded-xl p-6 max-w-3xl mx-auto shadow-2xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Quick Install
                </h3>
                <div className="flex bg-gray-800 rounded-lg p-1">
                    {commands.map((cmd, index) => (
                        <button
                            key={cmd.label}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                activeTab === index ? "bg-blue-600 text-white shadow-lg" : "text-gray-300 hover:text-white hover:bg-gray-700"
                            }`}
                        >
                            {cmd.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative">
                <pre className="bg-black p-4 rounded-lg text-green-400 font-mono text-sm overflow-x-auto border border-gray-800">
                    <code>$ {commands[activeTab].command}</code>
                </pre>
                <CopyButton text={commands[activeTab].command} className="absolute top-2 right-2" />
            </div>
        </div>
    );
}

function PrismCodeBlock({ language, children, title, className = "" }: { language: string; children: string; title?: string; className?: string }) {
    useEffect(() => {
        Prism.highlightAll();
    }, [children]);

    return (
        <div className={`relative ${className}`}>
            {title && (
                <div className="bg-gray-800 px-4 py-3 text-sm text-gray-300 rounded-t-lg border-b border-gray-700 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="ml-3 font-medium">{title}</span>
                </div>
            )}
            <div className="relative">
                <pre className={`${title ? "rounded-b-lg" : "rounded-lg"} text-sm overflow-x-auto !bg-gray-900 !p-4`}>
                    <code className={`language-${language}`}>{children.trim()}</code>
                </pre>
                <CopyButton text={children.trim()} className="absolute top-3 right-3" />
            </div>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    codeExample,
    language = "typescript",
}: {
    icon: string;
    title: string;
    description: string;
    codeExample: string;
    language?: string;
}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{icon}</span>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{description}</p>
            <PrismCodeBlock language={language}>{codeExample}</PrismCodeBlock>
        </div>
    );
}

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20 py-16">
                <div className="mb-8">
                    <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                        YAML Routes
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed font-light">
                    The most <strong className="font-bold text-blue-600">intuitive way</strong> to define multi language routes for TanStack Router
                </p>
                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    Write routes in YAML • Get TypeScript types • Ship with confidence
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Link
                        to={routeTo("getting_started")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Get Started →
                    </Link>
                    <Link
                        to={routeTo("demo")}
                        className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg"
                    >
                        Live Demo
                    </Link>
                </div>

                <InstallBox />
            </div>

            {/* Main Features Grid */}
            <div className="mb-20">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Everything you need for <span className="text-blue-600">modern routing</span>
                </h2>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <FeatureCard
                        icon="📝"
                        title="YAML Configuration"
                        description="Clean, readable route definitions that are easy to understand and maintain. No more cluttered JavaScript config files."
                        language="yaml"
                        codeExample={`# Clean, readable routing
user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true

# Internationalized routes
about:
    path:
        en: /about
        es: /acerca-de
    component: pages/About`}
                    />

                    <FeatureCard
                        icon="🔒"
                        title="Type Safety"
                        description="Generated TypeScript types catch errors before they reach production. Full autocomplete and IntelliSense support."
                        codeExample={`import { routeTo } from "./routeCache.generated";

// ✅ Type-safe navigation with autocomplete
const profileUrl = routeTo("user_profile", { 
  id: "alice" // ✅ Required parameter
});

// ❌ TypeScript error if missing required params
const badUrl = routeTo("user_profile"); 
//                    ^^^^^^^^^^^^^^^^
// Error: Argument of type '{}' is not assignable...

<Link to={profileUrl}>View Profile</Link>`}
                    />

                    <FeatureCard
                        icon="🌐"
                        title="Internationalization (i18n)"
                        description="Built-in support for multi-language routing with localized paths and components. No external i18n library needed."
                        language="yaml"
                        codeExample={`# Multi-language routes
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, es, fr]

about:
    path:
        en: /about
        es: /acerca-de
        fr: /a-propos
    component:
        en: pages/AboutEN
        es: pages/AboutES
        fr: pages/AboutFR`}
                    />

                    <FeatureCard
                        icon="⚡"
                        title="Development Experience"
                        description="Watch mode for instant route generation, comprehensive error messages, and seamless integration with TanStack Router."
                        language="bash"
                        codeExample={`# Generate routes once
$ npx yaml-routes

# Watch for changes during development  
$ npx yaml-routes --watch

# Integrate with your build process
$ npm run build:routes && vite build

✅ Generated 5 base routes with 15 localized variants
🎉 Route generation completed!`}
                    />
                </div>
            </div>

            {/* Complete Example Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 rounded-2xl mb-20 border border-gray-200 dark:border-gray-700">
                <h2 className="text-4xl font-bold text-center mb-8">See the complete workflow</h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
                    From YAML configuration to type-safe React components in seconds
                </p>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <PrismCodeBlock language="yaml" title="routes.yml" className="h-full">
                            {`settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, es]

home:
    path: /
    component: pages/Home

user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true

about:
    path:
        en: /about
        es: /acerca-de
    component: pages/About`}
                        </PrismCodeBlock>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <PrismCodeBlock language="bash" title="Terminal">
                            {`$ npx yaml-routes --watch
👀 Watching for changes...
📁 Config file: routes.yml
🔄 Press Ctrl+C to stop watching

🔧 Loading routing configuration...
🚀 Generating TanStack Router code-based routes cache...
🌐 i18n enabled, default locale: en, supported: [en, es]
✅ Generated code-based route cache: src/routeCache.generated.tsx
📊 Generated 4 base routes with 6 localized variants
🎉 Route generation completed!`}
                        </PrismCodeBlock>

                        <PrismCodeBlock language="typescript" title="App.tsx">
                            {`import { routeTo } from "./routeCache.generated";

export function UserCard({ userId }: { userId: string }) {
    // ✅ Type-safe routing with autocomplete
    const profileUrl = routeTo("user_profile", { id: userId });
    
    return (
        <div className="user-card">
            <h3>User Profile</h3>
            <Link to={profileUrl} className="btn-primary">
                View Profile
            </Link>
            {/* Automatic i18n: /user/123 or /usuario/123 */}
        </div>
    );
}`}
                        </PrismCodeBlock>
                    </div>
                </div>
            </div>

            {/* Quick Start Process */}
            <div className="text-center mb-20">
                <h2 className="text-4xl font-bold mb-6">Ready in under a minute</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">Three simple steps to get started</p>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                            <h3 className="text-xl font-bold mb-3">Install Package</h3>
                            <p className="text-blue-100">Add to your TanStack Router project with your favorite package manager</p>
                        </div>
                        {/* Arrow for larger screens */}
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-gray-300">→</div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                            <h3 className="text-xl font-bold mb-3">Create routes.yml</h3>
                            <p className="text-purple-100">Define your routes in clean, readable YAML format</p>
                        </div>
                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-gray-300">→</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                        <h3 className="text-xl font-bold mb-3">Generate Routes</h3>
                        <p className="text-green-100">Run the CLI to generate type-safe route helpers</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white mb-20">
                <h2 className="text-4xl font-bold mb-6">Ready to revolutionize your routing?</h2>
                <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">Join developers who've already simplified their routing with YAML Routes</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to={routeTo("getting_started")}
                        className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        Start Building →
                    </Link>
                    <Link
                        to={routeTo("advanced_examples")}
                        className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                    >
                        Advanced Examples
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Currently supports <strong>TanStack Router</strong>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">React Router v7 support coming soon • Built with ❤️ for modern web development</p>
            </div>
        </div>
    );
}
