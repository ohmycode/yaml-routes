import { Link, useParams } from "@tanstack/react-router";
import { routeTo } from "../routeCache.generated";

export default function UserImages() {
    const { id } = useParams({ strict: false });

    // Demo image data
    const demoImages = [
        { id: "1", title: "Mountain Landscape", description: "A beautiful mountain vista with snow-capped peaks", category: "Nature" },
        { id: "2", title: "City Skyline", description: "Modern city skyline at sunset", category: "Urban" },
        { id: "3", title: "Ocean Waves", description: "Peaceful ocean waves on a sandy beach", category: "Nature" },
        { id: "4", title: "Forest Path", description: "A winding path through a dense forest", category: "Nature" },
        { id: "5", title: "Abstract Art", description: "Colorful abstract digital artwork", category: "Art" },
        { id: "6", title: "Space Galaxy", description: "Distant galaxy with bright stars", category: "Space" },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link to={routeTo("user_profile", { id: id || "demo" })} className="text-blue-600 dark:text-blue-400 hover:underline">
                    ← Back to {id || "demo"}'s Profile
                </Link>
                <span className="text-gray-400">|</span>
                <Link to={routeTo("home")} className="text-blue-600 dark:text-blue-400 hover:underline">
                    Home
                </Link>
            </div>

            <h1 className="text-4xl font-bold mb-8">Image Gallery</h1>

            <div className="space-y-8">
                <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">📸 User Gallery</h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                            <p className="mb-2">
                                <strong>Viewing images for user:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{id || "demo"}</code>
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">This page demonstrates nested routes with user-specific image galleries.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6">🖼️ Images ({demoImages.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {demoImages.map((image) => (
                            <Link
                                key={image.id}
                                to={routeTo("user_image", { id: id || "demo", imageId: image.id })}
                                className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <img
                                    src={`https://picsum.photos/400/300?random=${image.id}`}
                                    alt={image.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {image.title}
                                        </h3>
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                                            {image.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{image.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">⚙️ Route Configuration</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">This gallery page is defined with a user parameter in the route:</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                        {`user_images:
    path: /user/{id}/images
    component: pages/UserImages
    parameters:
        id:
            type: string
            required: true`}
                    </pre>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🔗 Navigation Examples</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                The <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">routeTo</code> helper handles nested parameters
                                automatically:
                            </p>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
                                {`// Navigate to a specific image
routeTo("user_image", { id: "${id || "demo"}", imageId: "1" })

// Navigate back to user profile  
routeTo("user_profile", { id: "${id || "demo"}" })`}
                            </pre>
                        </div>

                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Try viewing galleries for other users:</p>
                            <div className="flex flex-wrap gap-2">
                                {["alice", "bob", "charlie", "demo"].map((userId) => (
                                    <Link
                                        key={userId}
                                        to={routeTo("user_images", { id: userId })}
                                        className={`px-3 py-2 rounded transition-colors ${
                                            userId === id
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {userId}'s Gallery
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">💡 Features Demonstrated</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>
                            • <strong>Nested Routes:</strong> User-specific image galleries with clean URLs
                        </li>
                        <li>
                            • <strong>Parameter Extraction:</strong> Dynamic user ID from the route path
                        </li>
                        <li>
                            • <strong>Grid Layout:</strong> Responsive image grid using CSS Grid
                        </li>
                        <li>
                            • <strong>Interactive Navigation:</strong> Click any image to view details
                        </li>
                        <li>
                            • <strong>Demo Images:</strong> Lorem Picsum integration for realistic placeholders
                        </li>
                        <li>
                            • <strong>Type-Safe Routing:</strong> Generated <code>routeTo</code> helper ensures parameter correctness
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
