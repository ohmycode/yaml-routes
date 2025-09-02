import { Link, useParams, useLocation } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale, useRouteName } from "../../routes.gen";
import { YamlHighlight } from "./components/YamlHighlight";
import { RouteInfoPanel } from "./components/RouteInfoPanel";
import { Browser } from "./components/Browser";
import { PizzaSite } from "./components/PizzaSite";
import { Layout } from "./components/Layout";
import { getPizzaData } from "./PizzaType";
import { reviews, comments } from "./PizzaReviewList";

export function PizzaReview() {
    const params = useParams({ strict: false });
    const pizzaType = typeof params.pizzaType === "string" ? params.pizzaType : String(params.pizzaType || "");
    const reviewId = typeof params.reviewId === "string" ? params.reviewId : String(params.reviewId || "");
    const routeTo = useRouteTo();
    const currentLocale = useCurrentLocale();
    const location = useLocation();
    const currentRouteName = useRouteName();

    // Get pizza data
    const pizzaData = getPizzaData(currentLocale);
    const pizza = pizzaData[pizzaType] || {
        name: pizzaType ? `${String(pizzaType).charAt(0).toUpperCase()}${String(pizzaType).slice(1)} Pizza` : "Mystery Pizza",
        emoji: "❓",
    };

    // Find the review from the imported reviews data
    const review = reviews.find((r) => r.id === reviewId) || {
        id: "unknown",
        author: "Anonymous Pizza Lover",
        rating: 4,
        title: "Great Pizza Experience!",
        content: "This review seems to have gotten lost in the pizza sauce! But trust me, it was delicious! 🍕",
        fullContent: "This review seems to have gotten lost in the pizza sauce! But trust me, it was delicious! 🍕",
        date: "2024-08-15",
        avatar: "😋",
        verified: false,
        helpful: 0,
        photos: ["🍕"],
        location: "Pizza Heaven",
    };

    return (
        <Layout>
            {/* Left Side - YAML Configuration */}
            <YamlHighlight referenceLine={currentRouteName + ":"} highLightedLineNumbers={[0, 1, 2]} />

            {/* Right Side - Browser Mockup */}
            <div className="space-y-4">
                <Browser>
                    <PizzaSite
                        breadcrumbs={[
                            {
                                label: currentLocale === "es" ? "Inicio" : currentLocale === "fr" ? "Accueil" : "Home",
                                to: routeTo("pizza_list"),
                            },
                            {
                                label: currentLocale === "es" ? "Menú de Pizzas" : currentLocale === "fr" ? "Menu Pizza" : "Pizza Menu",
                            },
                            {
                                label: pizza.name,
                                to: routeTo("pizza_detail", { pizzaType: pizzaType }),
                            },
                            {
                                label: currentLocale === "es" ? "Reseñas" : currentLocale === "fr" ? "Avis" : "Reviews",
                                to: routeTo("pizza_review_list", { pizzaType: pizzaType }),
                            },
                            {
                                label: `${currentLocale === "es" ? "Reseña" : currentLocale === "fr" ? "Avis" : "Review"} #${reviewId}`,
                            },
                        ]}
                    >
                        {/* Main Review */}
                        <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{review.avatar}</div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-2xl font-bold text-gray-100">{review.author}</h2>
                                            {review.verified && (
                                                <span className="bg-green-900 text-green-300 text-xs px-3 py-1 rounded-full border border-green-700">
                                                    ✓{" "}
                                                    {currentLocale === "es"
                                                        ? "Compra Verificada"
                                                        : currentLocale === "fr"
                                                        ? "Achat Vérifié"
                                                        : "Verified Purchase"}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`text-xl ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-gray-400">{review.date}</span>
                                            <span className="text-gray-500">📍 {review.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                    👍 {currentLocale === "es" ? "Útil" : currentLocale === "fr" ? "Utile" : "Helpful"} ({review.helpful})
                                </button>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-100 mb-4">{review.title}</h3>

                            <div className="prose prose-lg max-w-none mb-6">
                                {(review.fullContent || review.content).split("\n").map(
                                    (paragraph: string, index: number) =>
                                        paragraph.trim() && (
                                            <p key={index} className="text-gray-300 leading-relaxed mb-4">
                                                {paragraph.trim()}
                                            </p>
                                        )
                                )}
                            </div>

                            {/* Photos */}
                            {review.photos && review.photos.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-100 mb-3">
                                        📸{" "}
                                        {currentLocale === "es"
                                            ? "Fotos de esta reseña"
                                            : currentLocale === "fr"
                                            ? "Photos de cet avis"
                                            : "Photos from this review"}
                                        :
                                    </h4>
                                    <div className="flex gap-3">
                                        {review.photos.map((photo: string, index: number) => (
                                            <div
                                                key={index}
                                                className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600"
                                            >
                                                {photo}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                                <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                                    <span>👍</span>
                                    <span>{currentLocale === "es" ? "Útil" : currentLocale === "fr" ? "Utile" : "Helpful"}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                                    <span>↗️</span>
                                    <span>{currentLocale === "es" ? "Compartir" : currentLocale === "fr" ? "Partager" : "Share"}</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                                    <span>🚩</span>
                                    <span>{currentLocale === "es" ? "Reportar" : currentLocale === "fr" ? "Signaler" : "Report"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                            <h3 className="text-xl font-bold text-gray-100 mb-6">
                                💬 {currentLocale === "es" ? "Comentarios" : currentLocale === "fr" ? "Commentaires" : "Comments"} ({comments.length})
                            </h3>

                            <div className="space-y-4 mb-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">{comment.avatar}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-semibold text-gray-100">{comment.author}</span>
                                                    {comment.isOwner && (
                                                        <span className="bg-red-900 text-red-300 text-xs px-2 py-1 rounded-full border border-red-700">
                                                            🍕 {currentLocale === "es" ? "Propietario" : currentLocale === "fr" ? "Propriétaire" : "Owner"}
                                                        </span>
                                                    )}
                                                    <span className="text-gray-400 text-sm">{comment.date}</span>
                                                </div>
                                                <p className="text-gray-300">{comment.content}</p>
                                                <Link
                                                    to={routeTo("pizza_review_comments", {
                                                        pizzaType: pizzaType,
                                                        reviewId: reviewId,
                                                        commentId: comment.id,
                                                    })}
                                                    className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                                                >
                                                    {currentLocale === "es" ? "Ver Hilo" : currentLocale === "fr" ? "Voir le Fil" : "View Thread"} →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Comment */}
                            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                                <h4 className="font-semibold text-gray-100 mb-3">
                                    💭 {currentLocale === "es" ? "Agregar un comentario" : currentLocale === "fr" ? "Ajouter un commentaire" : "Add a comment"}
                                </h4>
                                <textarea
                                    placeholder={
                                        currentLocale === "es"
                                            ? "Comparte tus pensamientos sobre esta reseña..."
                                            : currentLocale === "fr"
                                            ? "Partagez vos réflexions sur cet avis..."
                                            : "Share your thoughts about this review..."
                                    }
                                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                                    rows={3}
                                />
                                <div className="flex justify-end mt-3">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                        {currentLocale === "es" ? "Publicar Comentario" : currentLocale === "fr" ? "Publier le Commentaire" : "Post Comment"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </PizzaSite>
                </Browser>

                <RouteInfoPanel />
            </div>
        </Layout>
    );
}

export default PizzaReview;
