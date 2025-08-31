import { Link } from "@tanstack/react-router";
import { routeTo } from "../routeCache.generated";
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

function InstallBox() {
    const commands = [
        { label: "npm", command: "npm install @yaml-routes/tanstack" },
        { label: "pnpm", command: "pnpm add @yaml-routes/tanstack" },
        { label: "yarn", command: "yarn add @yaml-routes/tanstack" },
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-gray-900 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Quick Install</h3>
                <div className="flex bg-gray-800 rounded-md">
                    {commands.map((cmd, index) => (
                        <button
                            key={cmd.label}
                            onClick={() => setActiveTab(index)}
                            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                                activeTab === index ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"
                            }`}
                        >
                            {cmd.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative">
                <pre className="bg-black p-4 rounded text-green-400 font-mono text-sm overflow-x-auto">
                    <code>{commands[activeTab].command}</code>
                </pre>
                <CopyButton text={commands[activeTab].command} className="absolute top-2 right-2" />
            </div>
        </div>
    );
}

function CodeBlock({ language, children, title }: { language: string; children: string; title?: string }) {
    return (
        <div className="relative">
            {title && <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 rounded-t-lg border-b border-gray-700">{title}</div>}
            <div className="relative">
                <pre className={`bg-gray-900 p-4 ${title ? "rounded-b-lg" : "rounded-lg"} text-sm overflow-x-auto`}>
                    <code className={`language-${language}`}>
                        {language === "yaml" && <span className="text-gray-100">{children}</span>}
                        {language === "typescript" && <span className="text-gray-100">{children}</span>}
                        {language === "bash" && <span className="text-green-400">{children}</span>}
                    </code>
                </pre>
                <CopyButton text={children.trim()} className="absolute top-2 right-2" />
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">YAML Routes</h1>
                <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                    The simplest way to define <strong>type-safe routes</strong> for TanStack Router
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">Write routes in YAML • Get TypeScript types • Ship with confidence</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        to={routeTo("getting_started")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                        Get Started →
                    </Link>
                    <Link
                        to={routeTo("examples")}
                        className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                    >
                        See Examples
                    </Link>
                </div>

                <InstallBox />
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📝</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">YAML First</h3>
                    <p className="text-gray-600 dark:text-gray-300">Clean, readable configuration that's easy to understand and maintain</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🔒</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Type Safe</h3>
                    <p className="text-gray-600 dark:text-gray-300">Generated TypeScript types catch errors before they reach production</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🌐</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">i18n Ready</h3>
                    <p className="text-gray-600 dark:text-gray-300">Built-in internationalization with localized paths and components</p>
                </div>
            </div>

            {/* Code Example */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">See it in action</h2>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <CodeBlock language="yaml" title="routes.yml">
                            {`user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true

# Internationalized route
about:
    path:
        en: /about
        es: /acerca-de
    component: pages/About`}
                        </CodeBlock>
                    </div>

                    <div className="space-y-4">
                        <CodeBlock language="bash" title="Generate routes">
                            {`npx yaml-routes`}
                        </CodeBlock>

                        <CodeBlock language="typescript" title="Use in React">
                            {`import { routeTo } from "./routeCache.generated";

// Type-safe navigation
const profileUrl = routeTo("user_profile", { 
  id: "alice" 
});

// Automatic i18n
const aboutUrl = routeTo("about");

<Link to={profileUrl}>View Profile</Link>`}
                        </CodeBlock>
                    </div>
                </div>
            </div>

            {/* Quick Start Section */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-6">Ready in 30 seconds</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-lg">
                            1
                        </div>
                        <h3 className="font-semibold mb-2">Install</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Add the package to your TanStack Router project</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold text-lg">
                            2
                        </div>
                        <h3 className="font-semibold mb-2">Configure</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Create routes.yml and define your routes</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 font-bold text-lg">
                            3
                        </div>
                        <h3 className="font-semibold mb-2">Generate</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Run the CLI to generate type-safe routes</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">
                    Currently supports <strong>TanStack Router</strong> • React Router v7 support coming soon
                </p>
            </div>
        </div>
    );
}
