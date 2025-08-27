export default function Demo() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Demo Page</h1>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Interactive Demo</h2>
                    <p className="text-gray-600 mb-6">
                        This page demonstrates the routing capabilities. Notice how the URL changes based on the current locale.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded p-4">
                            <h3 className="font-semibold text-green-800">English</h3>
                            <p className="text-sm text-green-600">Path: /demo</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-4">
                            <h3 className="font-semibold text-blue-800">Français</h3>
                            <p className="text-sm text-blue-600">Path: /fr/demo</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded p-4">
                            <h3 className="font-semibold text-purple-800">Español</h3>
                            <p className="text-sm text-purple-600">Path: /es/demo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
