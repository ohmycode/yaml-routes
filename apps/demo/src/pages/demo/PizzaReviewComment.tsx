import React from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useCurrentLocale } from "../../routeCache.generated";

export const PizzaReviewComment: React.FC = () => {
    const params = useParams({ strict: false });
    const pizzaType = typeof params.pizzaType === "string" ? params.pizzaType : String(params.pizzaType || "");
    const reviewId = typeof params.reviewId === "string" ? params.reviewId : String(params.reviewId || "");
    const commentId = typeof params.commentId === "string" ? params.commentId : String(params.commentId || "");
    const navigate = useNavigate();
    const currentLocale = useCurrentLocale();

    // Simple locale detection from current URL
    const currentPath = window.location.pathname;
    const locale = currentPath.includes("/pizzalandia/") ? "es" : "en";

    // Mock comment data based on commentId
    const getCommentData = (commentId: string) => {
        const comments = {
            "1": {
                author: "Giuseppe",
                date: "2024-01-15",
                content:
                    locale === "es"
                        ? "Estoy completamente de acuerdo. Su masa madre es legendaria en la ciudad."
                        : "I completely agree. Their sourdough is legendary in the city.",
                likes: 42,
                replies: 3,
            },
            "2": {
                author: "Maria Rosa",
                date: "2024-01-14",
                content:
                    locale === "es"
                        ? "No olvides mencionar la salsa especial de albahaca. ¡Es increíble!"
                        : "Don't forget to mention the special basil sauce. It's incredible!",
                likes: 28,
                replies: 1,
            },
            "3": {
                author: "Antonio",
                date: "2024-01-13",
                content:
                    locale === "es" ? "He estado viniendo aquí durante 20 años. Nunca decepciona." : "I've been coming here for 20 years. Never disappoints.",
                likes: 15,
                replies: 0,
            },
        };
        return comments[commentId as keyof typeof comments];
    };

    const comment = getCommentData(commentId!);

    if (!comment) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300">
                        {currentLocale === "es" ? "Página no encontrada" : currentLocale === "fr" ? "Page non trouvée" : "Page not found"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <button onClick={() => navigate({ to: "/demo" })} className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Demo
                </button>
                <span>•</span>
                <button
                    onClick={() =>
                        navigate({
                            to: `/demo/${locale === "es" ? "pizzalandia" : "pizza-corner"}/${pizzaType}`,
                        })
                    }
                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors capitalize"
                >
                    {pizzaType?.replace("-", " ")}
                </button>
                <span>•</span>
                <button
                    onClick={() =>
                        navigate({
                            to: `/demo/${locale === "es" ? "pizzalandia" : "pizza-corner"}/${pizzaType}/${locale === "es" ? "recomendaciones" : "reviews"}`,
                        })
                    }
                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    {locale === "es" ? "Recomendaciones" : "Reviews"}
                </button>
                <span>•</span>
                <button
                    onClick={() =>
                        navigate({
                            to: `/demo/${locale === "es" ? "pizzalandia" : "pizza-corner"}/${pizzaType}/${
                                locale === "es" ? "recomendaciones" : "reviews"
                            }/${reviewId}`,
                        })
                    }
                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    {locale === "es" ? `Recomendación #${reviewId}` : `Review #${reviewId}`}
                </button>
                <span>•</span>
                <span className="text-gray-500">{locale === "es" ? `Comentario #${commentId}` : `Comment #${commentId}`}</span>
            </div>

            {/* Comment Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">💬 {locale === "es" ? "Comentario Detallado" : "Comment Details"}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {locale === "es" ? "Conversación comunitaria sobre esta recomendación" : "Community conversation about this review"}
                </p>
            </div>

            {/* Comment Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {comment.author[0]}
                    </div>

                    {/* Comment Body */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{comment.author}</h3>
                            <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US")}</span>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{comment.content}</p>

                        {/* Comment Actions */}
                        <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                <span className="text-xl">👍</span>
                                <span>{comment.likes}</span>
                            </button>

                            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                <span className="text-xl">💬</span>
                                <span>
                                    {comment.replies} {locale === "es" ? "respuestas" : "replies"}
                                </span>
                            </button>

                            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                <span className="text-xl">🔗</span>
                                <span>{locale === "es" ? "Compartir" : "Share"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reply Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">{locale === "es" ? "Responder a este comentario" : "Reply to this comment"}</h3>
                <div className="space-y-4">
                    <textarea
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                        rows={4}
                        placeholder={locale === "es" ? "Escribe tu respuesta..." : "Write your reply..."}
                    />
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            {locale === "es" ? "Mantén un tono respetuoso y constructivo" : "Keep it respectful and constructive"}
                        </div>
                        <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg">
                            {locale === "es" ? "Publicar Respuesta" : "Post Reply"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Route Information */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🔗 {locale === "es" ? "Información de Ruta" : "Route Information"}</h4>
                <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <div>
                        <strong>{locale === "es" ? "Tipo de Pizza" : "Pizza Type"}:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">{pizzaType}</code>
                    </div>
                    <div>
                        <strong>{locale === "es" ? "ID de Recomendación" : "Review ID"}:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">{reviewId}</code>
                    </div>
                    <div>
                        <strong>{locale === "es" ? "ID de Comentario" : "Comment ID"}:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">{commentId}</code>
                    </div>
                    <div>
                        <strong>{locale === "es" ? "Idioma" : "Locale"}:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">{locale}</code>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex gap-4">
                <button
                    onClick={() =>
                        navigate({
                            to: `/demo/${locale === "es" ? "pizzalandia" : "pizza-corner"}/${pizzaType}/${
                                locale === "es" ? "recomendaciones" : "reviews"
                            }/${reviewId}`,
                        })
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    <span>←</span>
                    {locale === "es" ? "Volver a la Recomendación" : "Back to Review"}
                </button>
            </div>
        </div>
    );
};

export default PizzaReviewComment;
