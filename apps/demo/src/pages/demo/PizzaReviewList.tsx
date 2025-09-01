import { Link, useParams } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale } from "../../routeCache.generated";

export function PizzaReviewList() {
    const { pizzaType } = useParams({ strict: false });
    const routeTo = useRouteTo();
    const currentLocale = useCurrentLocale();

    // Mock reviews data
    const reviews = [
        {
            id: "1",
            author: "Giuseppe Romano",
            rating: 5,
            title: "Perfetto! 🤌",
            content: "This is exactly how my nonna used to make it! The crust is crispy, the sauce is perfect, and the cheese... mama mia!",
            date: "2024-08-28",
            avatar: "👨‍🍳",
            verified: true,
            helpful: 23,
        },
        {
            id: "2",
            author: "Sarah Chen",
            rating: 4,
            title: "Almost perfect",
            content: "Really great pizza! The only thing missing was a bit more basil, but overall fantastic. Will definitely order again!",
            date: "2024-08-25",
            avatar: "👩‍💼",
            verified: true,
            helpful: 18,
        },
        {
            id: "3",
            author: "Mike Johnson",
            rating: 5,
            title: "Best pizza in town! 🍕",
            content: "I've tried every pizza place in the city, and this is hands down the best. The delivery was super fast too!",
            date: "2024-08-22",
            avatar: "🧔",
            verified: false,
            helpful: 31,
        },
        {
            id: "4",
            author: "Isabella Rodriguez",
            rating: 4,
            title: "Muy deliciosa!",
            content: "Amazing flavor combinations! The wood-fired taste really comes through. My kids loved it too!",
            date: "2024-08-20",
            avatar: "👩‍👧‍👦",
            verified: true,
            helpful: 15,
        },
        {
            id: "5",
            author: "David Kim",
            rating: 3,
            title: "Good but pricey",
            content: "The pizza was good quality, but I think it's a bit overpriced for what you get. Taste was solid though.",
            date: "2024-08-18",
            avatar: "👨‍💻",
            verified: true,
            helpful: 8,
        },
    ];

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to={routeTo("pizza", { pizzaType: pizzaType as string })}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                    >
                        ←{" "}
                        {currentLocale === "es"
                            ? `Volver a Pizza de ${(pizzaType?.charAt(0).toUpperCase() || "") + (pizzaType?.slice(1) || "")}`
                            : currentLocale === "fr"
                            ? `Retour à Pizza ${(pizzaType?.charAt(0).toUpperCase() || "") + (pizzaType?.slice(1) || "")}`
                            : `Back to ${(pizzaType?.charAt(0).toUpperCase() || "") + (pizzaType?.slice(1) || "")} Pizza`}
                    </Link>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        📝{" "}
                        {currentLocale === "es"
                            ? `Reseñas para Pizza de ${(pizzaType?.charAt(0).toUpperCase() || "") + (pizzaType?.slice(1) || "")}`
                            : currentLocale === "fr"
                            ? `Avis pour Pizza ${(pizzaType?.charAt(0).toUpperCase() || "") + (pizzaType?.slice(1) || "")}`
                            : `Reviews for ${(pizzaType?.charAt(0).toUpperCase() || "") + (pizzaType?.slice(1) || "")} Pizza`}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⭐</span>
                            <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-600">
                                ({reviews.length} {currentLocale === "es" ? "reseñas" : currentLocale === "fr" ? "avis" : "reviews"})
                            </span>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            ✍️ {currentLocale === "es" ? "Escribir una Reseña" : currentLocale === "fr" ? "Écrire un Avis" : "Write a Review"}
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{review.avatar}</div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-800">{review.author}</h3>
                                            {review.verified && (
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                    ✓ {currentLocale === "es" ? "Verificado" : currentLocale === "fr" ? "Vérifié" : "Verified"}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-gray-500 text-sm">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to={routeTo("pizza_review", {
                                        pizzaType: pizzaType as string,
                                        reviewId: review.id,
                                    })}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {currentLocale === "es" ? "Ver Detalles" : currentLocale === "fr" ? "Voir les Détails" : "View Details"} →
                                </Link>
                            </div>

                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{review.title}</h4>
                            <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                            <div className="flex items-center justify-between">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                                    <span>👍</span>
                                    <span>
                                        {review.helpful}{" "}
                                        {currentLocale === "es"
                                            ? "encontraron esto útil"
                                            : currentLocale === "fr"
                                            ? "ont trouvé cela utile"
                                            : "found this helpful"}
                                    </span>
                                </button>
                                <div className="flex gap-2">
                                    <button className="text-gray-500 hover:text-gray-700">
                                        💬 {currentLocale === "es" ? "Responder" : currentLocale === "fr" ? "Répondre" : "Reply"}
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        🚩 {currentLocale === "es" ? "Reportar" : currentLocale === "fr" ? "Signaler" : "Report"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        📜 {currentLocale === "es" ? "Cargar Más Reseñas" : currentLocale === "fr" ? "Charger Plus d'Avis" : "Load More Reviews"}
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mt-8">
                    <h4 className="font-bold text-gray-800 mb-4">
                        📊 {currentLocale === "es" ? "Resumen de Reseñas" : currentLocale === "fr" ? "Résumé des Avis" : "Review Summary"}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const count = reviews.filter((r) => r.rating === stars).length;
                            const percentage = (count / reviews.length) * 100;
                            return (
                                <div key={stars} className="bg-white/60 rounded-lg p-3">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <span>{stars}</span>
                                        <span className="text-yellow-500">★</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">{count}</div>
                                    <div className="text-xs text-gray-600">{percentage.toFixed(0)}%</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PizzaReviewList;
