import { Link, useParams } from "@tanstack/react-router";
import { routeTo } from "../routeCache.generated";

export default function UserImage() {
    const { id, imageId } = useParams({ strict: false });

    // Demo image data
    const demoImages = {
        "1": { title: "Mountain Landscape", description: "A beautiful mountain vista with snow-capped peaks", category: "Nature" },
        "2": { title: "City Skyline", description: "Modern city skyline at sunset", category: "Urban" },
        "3": { title: "Ocean Waves", description: "Peaceful ocean waves on a sandy beach", category: "Nature" },
        "4": { title: "Forest Path", description: "A winding path through a dense forest", category: "Nature" },
        "5": { title: "Abstract Art", description: "Colorful abstract digital artwork", category: "Art" },
        "6": { title: "Space Galaxy", description: "Distant galaxy with bright stars", category: "Space" },
    };

    const image = demoImages[imageId as keyof typeof demoImages];
    const demoImageUrl = `https://picsum.photos/800/600?random=${imageId}`;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link to={routeTo("user_images", { id: id || "demo" })} className="text-blue-600 dark:text-blue-400 hover:underline">
                    ← Back to {id || "demo"}'s Images
                </Link>
                <span className="text-gray-400">|</span>
                <Link to={routeTo("user_profile", { id: id || "demo" })} className="text-blue-600 dark:text-blue-400 hover:underline">
                    View Profile
                </Link>
            </div>

            <h1 className="text-4xl font-bold mb-8">Image Viewer</h1>

            <div className="space-y-8">
                <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">📷 Image Details</h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                            <p className="mb-2">
                                <strong>User ID:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{id || "not-provided"}</code>
                            </p>
                            <p>
                                <strong>Image ID:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{imageId || "not-provided"}</code>
                            </p>
                        </div>
                    </div>
                </section>

                {image ? (
                    <section>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <img src={demoImageUrl} alt={image.title} className="w-full h-96 object-cover" />
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-2xl font-bold">{image.title}</h3>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                        {image.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{image.description}</p>

                                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span>📅 March 15, 2024</span>
                                    <span>📏 800 × 600 pixels</span>
                                    <span>💾 1.2 MB</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Image Not Found</h2>
                        <p className="text-red-600 dark:text-red-300">The image with ID "{imageId}" could not be found. Try using an image ID from 1-6.</p>
                    </section>
                )}

                <section>
                    <h2 className="text-2xl font-semibold mb-4">⚙️ Route Configuration</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">This route demonstrates nested parameters with multiple path segments:</p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                        {`user_image:
    path: /user/{id}/images/{imageId}
    component: pages/UserImage
    parameters:
        imageId:
            type: string
            required: true`}
                    </pre>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">🔗 Navigation Examples</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Navigate to other images for this user:</p>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(demoImages).map((imgId) => (
                                    <Link
                                        key={imgId}
                                        to={routeTo("user_image", { id: id || "demo", imageId: imgId })}
                                        className={`px-3 py-2 rounded transition-colors ${
                                            imgId === imageId
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        Image {imgId}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Try different users:</p>
                            <div className="flex flex-wrap gap-2">
                                {["alice", "bob", "charlie"].map((userId) => (
                                    <Link
                                        key={userId}
                                        to={routeTo("user_image", { id: userId, imageId: imageId || "1" })}
                                        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                    >
                                        {userId}'s Image
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">💡 Implementation Details</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>
                            • <strong>Nested Parameters:</strong> Both user ID and image ID are extracted from the URL
                        </li>
                        <li>
                            • <strong>Demo Data:</strong> Images are simulated using Lorem Picsum service
                        </li>
                        <li>
                            • <strong>Error Handling:</strong> Shows appropriate message for unknown image IDs
                        </li>
                        <li>
                            • <strong>Navigation:</strong> Easy navigation between images and back to gallery
                        </li>
                        <li>
                            • <strong>Type Safety:</strong> All routes use the generated <code>routeTo</code> helper
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
