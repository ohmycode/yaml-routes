import React from "react";
import { Link, useParams, useLocation } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale, useRouteName } from "../../routes.gen";
import { YamlHighlight } from "./components/YamlHighlight";
import { RouteInfoPanel } from "./components/RouteInfoPanel";
import { Browser } from "./components/Browser";
import { PizzaSite } from "./components/PizzaSite";
import { Layout } from "./components/Layout";
import { getPizzaData } from "./PizzaType";
import { reviews, comments } from "./PizzaReviewList";

export const PizzaReviewComment: React.FC = () => {
    const params = useParams({ strict: false });
    const pizzaType = typeof params.pizzaType === "string" ? params.pizzaType : String(params.pizzaType || "");
    const reviewId = typeof params.reviewId === "string" ? params.reviewId : String(params.reviewId || "");
    const commentId = typeof params.commentId === "string" ? params.commentId : String(params.commentId || "");
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

    // Find the review and comment from the imported data
    const review = reviews.find((r) => r.id === reviewId);
    const comment = comments.find((c) => c.id === commentId) || {
        id: "unknown",
        author: "Anonymous Commenter",
        avatar: "😊",
        content: "This comment seems to have disappeared into the cheese! But it was probably very insightful! 🧀",
        date: "2024-08-15",
        isOwner: false,
    };

    // Mock thread replies for the comment
    const threadReplies = [
        {
            id: "reply-1",
            author: "Pizza Enthusiast",
            avatar: "🍕",
            content: "I totally agree with this comment! The wood-fired flavor really makes all the difference.",
            date: "2024-08-30",
            isOwner: false,
        },
        {
            id: "reply-2",
            author: "Chef Marco",
            avatar: "👨‍🍳",
            content: "Thank you for the kind words! We put a lot of effort into maintaining our traditional methods.",
            date: "2024-08-31",
            isOwner: true,
        },
    ];

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
                                to: routeTo("pizza_review", { pizzaType: pizzaType, reviewId: reviewId }),
                            },
                            {
                                label: `${currentLocale === "es" ? "Comentario" : currentLocale === "fr" ? "Commentaire" : "Comment"} #${commentId}`,
                            },
                        ]}
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-100 mb-2 flex items-center gap-3">
                                💬 {currentLocale === "es" ? "Hilo de Comentario" : currentLocale === "fr" ? "Fil de Commentaire" : "Comment Thread"}
                            </h1>
                            <p className="text-gray-300">
                                {currentLocale === "es"
                                    ? "Conversación detallada sobre esta reseña"
                                    : currentLocale === "fr"
                                    ? "Conversation détaillée sur cet avis"
                                    : "Detailed conversation about this review"}
                            </p>
                        </div>

                        {/* Original Comment */}
                        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">{comment.avatar}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold text-gray-100">{comment.author}</h3>
                                        {comment.isOwner && (
                                            <span className="bg-red-900 text-red-300 text-xs px-2 py-1 rounded-full border border-red-700">
                                                🍕 {currentLocale === "es" ? "Propietario" : currentLocale === "fr" ? "Propriétaire" : "Owner"}
                                            </span>
                                        )}
                                        <span className="text-gray-400 text-sm">{comment.date}</span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed mb-4">{comment.content}</p>

                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                                            <span>👍</span>
                                            <span>{currentLocale === "es" ? "Me gusta" : currentLocale === "fr" ? "J'aime" : "Like"}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                                            <span>↗️</span>
                                            <span>{currentLocale === "es" ? "Compartir" : currentLocale === "fr" ? "Partager" : "Share"}</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                                            <span>�</span>
                                            <span>{currentLocale === "es" ? "Reportar" : currentLocale === "fr" ? "Signaler" : "Report"}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thread Replies */}
                        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
                            <h3 className="text-xl font-bold text-gray-100 mb-4">
                                🧵 {currentLocale === "es" ? "Respuestas" : currentLocale === "fr" ? "Réponses" : "Replies"} ({threadReplies.length})
                            </h3>

                            <div className="space-y-4">
                                {threadReplies.map((reply) => (
                                    <div key={reply.id} className="bg-gray-700 rounded-lg p-4 ml-6 border-l-4 border-blue-500">
                                        <div className="flex items-start gap-3">
                                            <div className="text-2xl">{reply.avatar}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-semibold text-gray-100">{reply.author}</span>
                                                    {reply.isOwner && (
                                                        <span className="bg-red-900 text-red-300 text-xs px-2 py-1 rounded-full border border-red-700">
                                                            🍕 {currentLocale === "es" ? "Propietario" : currentLocale === "fr" ? "Propriétaire" : "Owner"}
                                                        </span>
                                                    )}
                                                    <span className="text-gray-400 text-sm">{reply.date}</span>
                                                </div>
                                                <p className="text-gray-300">{reply.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reply Form */}
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <h3 className="text-xl font-bold text-gray-100 mb-4">
                                � {currentLocale === "es" ? "Agregar una respuesta" : currentLocale === "fr" ? "Ajouter une réponse" : "Add a reply"}
                            </h3>
                            <div className="space-y-4">
                                <textarea
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                                    rows={4}
                                    placeholder={
                                        currentLocale === "es"
                                            ? "Escribe tu respuesta..."
                                            : currentLocale === "fr"
                                            ? "Écrivez votre réponse..."
                                            : "Write your reply..."
                                    }
                                />
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-400">
                                        {currentLocale === "es"
                                            ? "Mantén un tono respetuoso y constructivo"
                                            : currentLocale === "fr"
                                            ? "Restez respectueux et constructif"
                                            : "Keep it respectful and constructive"}
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                        {currentLocale === "es" ? "Publicar Respuesta" : currentLocale === "fr" ? "Publier la Réponse" : "Post Reply"}
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
};

export default PizzaReviewComment;
