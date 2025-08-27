export default function Neutral() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Neutral Page</h1>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Non-localized Route</h2>
                    <p className="text-gray-600 mb-4">
                        This page demonstrates a route that is not localized. It uses the same URL path for all languages:{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded">/neutral-url</code>
                    </p>
                    <p className="text-sm text-gray-500">
                        Sometimes you want certain pages to have the same URL regardless of the selected language. This is useful for technical pages, APIs, or
                        content that doesn't need localization.
                    </p>
                </div>
            </div>
        </div>
    );
}
