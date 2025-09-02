import { Link } from "@tanstack/react-router";
import { useRouteTo } from "../routes.gen";
import { useState, useEffect } from "react";
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
            className={`group relative px-4 py-2 text-xs bg-gray-800/90 hover:bg-gray-700/90 text-gray-300 hover:text-white rounded-lg transition-all duration-200 font-medium backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
            title="Copy to clipboard"
        >
            <div className="flex items-center gap-2">
                {copied ? (
                    <>
                        <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-400">Copied!</span>
                    </>
                ) : (
                    <>
                        <svg
                            className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                        Copy
                    </>
                )}
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-sm"></div>
        </button>
    );
}

function InstallBox() {
    const commands = [
        { label: "npm", command: "npm install @yaml-routes/tanstack", icon: "📦" },
        { label: "pnpm", command: "pnpm add @yaml-routes/tanstack", icon: "🚀" },
        { label: "yarn", command: "yarn add @yaml-routes/tanstack", icon: "🧶" },
    ];

    const [activeTab, setActiveTab] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(commands[activeTab].command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = commands[activeTab].command;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl transform transition-all duration-700 group-hover:scale-105 opacity-70"></div>

            {/* Main container with glassmorphism effect */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50 transform transition-all duration-500 hover:shadow-blue-500/10 hover:shadow-3xl">
                {/* Header with enhanced styling */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <span className={`text-3xl transition-transform duration-300 ${isHovered ? "animate-pulse scale-110" : ""}`}>⚡</span>
                            <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Quick Install</h3>
                            <p className="text-gray-400 text-sm">Get started in seconds</p>
                        </div>
                    </div>

                    {/* Enhanced tab selector */}
                    <div className="flex bg-gray-800/80 backdrop-blur-sm rounded-xl p-1.5 border border-gray-600/30">
                        {commands.map((cmd, index) => (
                            <button
                                key={cmd.label}
                                onClick={() => {
                                    setActiveTab(index);
                                    setCopied(false); // Reset copy state when switching tabs
                                }}
                                className={`relative px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === index
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                                        : "text-gray-300 hover:text-white hover:bg-gray-700/50 hover:scale-105"
                                }`}
                            >
                                <span className="text-base">{cmd.icon}</span>
                                {cmd.label}
                                {activeTab === index && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-lg blur-sm"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Enhanced code block */}
                <div className="relative">
                    {/* Terminal window decoration */}
                    <div className="bg-gray-800/80 px-6 py-3 rounded-t-xl border-b border-gray-700/50 flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                        </div>
                        <span className="text-gray-400 text-sm font-mono ml-3">Terminal</span>
                    </div>

                    {/* Command display */}
                    <div className="relative bg-black/80 backdrop-blur-sm rounded-b-xl border border-gray-800/50">
                        <pre className="p-6 text-green-400 font-mono text-lg leading-relaxed overflow-x-auto">
                            <code className="flex items-center gap-3">
                                <span className="text-blue-400 select-none">$</span>
                                <span className={`transition-all duration-500 ${isHovered ? "text-green-300" : "text-green-400"}`}>
                                    {commands[activeTab].command}
                                </span>
                            </code>
                        </pre>

                        {/* Enhanced copy button */}
                        <button
                            onClick={handleCopy}
                            disabled={copied}
                            className={`absolute top-4 right-4 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm backdrop-blur-sm border flex items-center gap-2 hover:scale-105 ${
                                copied
                                    ? "bg-green-600/80 text-white border-green-500/50 shadow-green-500/30"
                                    : "bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600/30 hover:border-gray-500/50"
                            }`}
                            title="Copy to clipboard"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShikiCodeBlock({ language, children, title, className = "" }: { language: string; children: string; title?: string; className?: string }) {
    const [highlightedHtml, setHighlightedHtml] = useState("");

    useEffect(() => {
        const highlightCode = async () => {
            const highlighted = await codeToHtml(children.trim(), {
                lang: language as any,
                theme: "github-dark",
                transformers: [
                    {
                        pre(node) {
                            // Add custom styling to the pre element
                            node.properties.style =
                                "background-color: #0d1117; padding: 1.5rem; margin: 0; font-size: 0.875rem; line-height: 1.6; overflow-x: auto;";
                        },
                    },
                ],
            });
            setHighlightedHtml(highlighted);
        };
        highlightCode();
    }, [children, language]);

    return (
        <div className={`relative group ${className}`}>
            {title && (
                <div className="bg-gray-800/90 backdrop-blur-sm px-5 py-3 text-sm text-gray-300 rounded-t-xl border-b border-gray-600/50 flex items-center gap-3 shadow-lg">
                    <div className="flex gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></span>
                    </div>
                    <span className="font-medium text-gray-200">{title}</span>
                </div>
            )}
            <div className="relative overflow-hidden">
                {/* Enhanced background with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 opacity-95"></div>

                {/* Subtle border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div
                    className={`relative ${
                        title ? "rounded-b-xl" : "rounded-xl"
                    } border border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-300 shadow-xl`}
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />

                {/* Enhanced copy button with better positioning */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <CopyButton
                        text={children.trim()}
                        className="bg-gray-700/80 hover:bg-gray-600/90 backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    />
                </div>
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
        <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <span className="text-4xl block transform group-hover:scale-110 transition-transform duration-300">{icon}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                        {title}
                    </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">{description}</p>
                <ShikiCodeBlock language={language}>{codeExample}</ShikiCodeBlock>
            </div>
        </div>
    );
}

export default function Home() {
    const routeTo = useRouteTo();

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
                        to={routeTo("pizza_homea")}
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
                        codeExample={`import { routeTo } from "./routes.gen";

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
            <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-900/80 p-8 md:p-12 rounded-3xl mb-20 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-50"></div>
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-x-36 -translate-y-36"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl translate-x-36 translate-y-36"></div>

                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                        See the complete workflow
                    </h2>
                    <p className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-medium">
                        From YAML configuration to type-safe React components in seconds
                    </p>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <ShikiCodeBlock language="yaml" title="routes.yml" className="h-full">
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
                            </ShikiCodeBlock>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <ShikiCodeBlock language="bash" title="Terminal">
                                {`$ npx yaml-routes --watch
👀 Watching for changes...
📁 Config file: routes.yml
🔄 Press Ctrl+C to stop watching

🔧 Loading routing configuration...
🚀 Generating TanStack Router code-based routes cache...
🌐 i18n enabled, default locale: en, supported: [en, es]
✅ Generated code-based route cache: src/routes.gen.tsx
📊 Generated 4 base routes with 6 localized variants
🎉 Route generation completed!`}
                            </ShikiCodeBlock>

                            <ShikiCodeBlock language="typescript" title="App.tsx">
                                {`import { routeTo } from "./routes.gen";

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
                            </ShikiCodeBlock>
                        </div>
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
