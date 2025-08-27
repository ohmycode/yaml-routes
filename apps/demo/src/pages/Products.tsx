export default function Products() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Products</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((id) => (
                        <div key={id} className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold mb-2">Product {id}</h3>
                            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <a href={`/products/${id}`} className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                View Details
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
