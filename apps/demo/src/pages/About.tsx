export default function About() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">About YAML Routes</h1>

            <div className="space-y-8">
                <section>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        YAML Routes is a developer tool that generates type-safe routing configuration for modern web frameworks using simple YAML syntax. Born
                        from the need for better internationalization support in React applications.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🎯 Mission</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        To simplify routing configuration while maintaining type safety and excellent developer experience. We believe that routing should be
                        declarative, readable, and internationalization should be a first-class citizen.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🚀 Current Status</h2>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">✅ Supported</h3>
                                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                                    <li>• TanStack Router v1.x</li>
                                    <li>• TypeScript integration</li>
                                    <li>• Internationalization (i18n)</li>
                                    <li>• Parameter validation</li>
                                    <li>• Watch mode for development</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">🔄 Coming Soon</h3>
                                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                                    <li>• React Router v7 support</li>
                                    <li>• Next.js App Router</li>
                                    <li>• Advanced parameter types</li>
                                    <li>• Route middlewares</li>
                                    <li>• Plugin system</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🛠 Technical Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">Architecture</h3>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>• YAML parsing with schema validation</li>
                                <li>• TypeScript code generation</li>
                                <li>• Framework-specific adapters</li>
                                <li>• Build-time optimization</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="font-semibold mb-2">Dependencies</h3>
                            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>• Zero runtime dependencies</li>
                                <li>• Minimal build dependencies</li>
                                <li>• Framework peer dependencies only</li>
                                <li>• TypeScript optional but recommended</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">🤝 Contributing</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">YAML Routes is open source and we welcome contributions! Whether it's:</p>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                        <li>• 🐛 Bug reports and fixes</li>
                        <li>• 💡 Feature requests and implementations</li>
                        <li>• 📖 Documentation improvements</li>
                        <li>• 🧪 Test coverage enhancements</li>
                        <li>• 🎨 Framework adapters for new routers</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
