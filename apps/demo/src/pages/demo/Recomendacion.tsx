import React from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import * as m from "../../paraglide/messages.js";

export function Recomendacion() {
    const { pizzaType, reviewId } = useParams({ strict: false });
    const navigate = useNavigate();

    // Mock review data based on reviewId
    const getReviewData = (reviewId: string) => {
        const reviews = {
            "1": {
                author: "María García",
                rating: 5,
                date: "2024-01-15",
                title: "Simplemente perfecta",
                content:
                    "Esta pizza margherita es exactamente como la hacen en Nápoles. La masa es perfecta, los ingredientes frescos y el sabor es auténtico. Sin duda la mejor pizzería de la ciudad.",
                helpful: 42,
                photos: ["pizza1.jpg", "pizza2.jpg"],
            },
            "2": {
                author: "Carlos Rodríguez",
                rating: 4,
                date: "2024-01-10",
                title: "Muy buena, pero puede mejorar",
                content:
                    "La pizza está deliciosa y el ambiente es acogedor. Los ingredientes son de calidad y se nota que usan masa madre. Quizás un poco cara para el tamaño, pero vale la pena.",
                helpful: 28,
                photos: ["pizza3.jpg"],
            },
            "3": {
                author: "Ana Martínez",
                rating: 5,
                date: "2024-01-08",
                title: "Experiencia inolvidable",
                content:
                    "Vine con mi familia y todos quedamos encantados. El servicio es excelente, la pizza está buenísima y el precio es justo. Definitivamente regresaremos pronto.",
                helpful: 35,
                photos: [],
            },
        };
        return reviews[reviewId as keyof typeof reviews];
    };

    const review = getReviewData(reviewId!);

    if (!review) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300">{m.error_not_found()}</p>
                </div>
            </div>
        );
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <button onClick={() => navigate({ to: "/demo" })} className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Demo
                </button>
                <span>•</span>
                <button
                    onClick={() => navigate({ to: `/demo/pizzalandia/${pizzaType}` })}
                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors capitalize"
                >
                    {pizzaType?.replace("-", " ")}
                </button>
                <span>•</span>
                <button
                    onClick={() => navigate({ to: `/demo/pizzalandia/${pizzaType}/recomendaciones` })}
                    className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    Recomendaciones
                </button>
                <span>•</span>
                <span className="text-gray-500">Recomendación #{reviewId}</span>
            </div>

            {/* Review Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">⭐ {review.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 font-medium">{review.rating}/5</span>
                    </div>
                    <span>•</span>
                    <span>por {review.author}</span>
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString("es-ES")}</span>
                </div>
            </div>

            {/* Review Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{review.content}</p>
                </div>

                {/* Photos Section */}
                {review.photos.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">📸 Fotos de la recomendación</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {review.photos.map((photo, index) => (
                                <div
                                    key={index}
                                    className="aspect-square bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg border-2 border-dashed border-red-300 dark:border-red-600 flex items-center justify-center"
                                >
                                    <div className="text-center text-gray-500 dark:text-gray-400">
                                        <div className="text-2xl mb-1">🍕</div>
                                        <div className="text-xs">Foto {index + 1}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <span className="text-xl">👍</span>
                            <span>{review.helpful} personas encontraron esto útil</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                            💬 Responder
                        </button>
                        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            🔗 Compartir
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">💭 Comentarios ({Math.floor(Math.random() * 10) + 1})</h3>

                {/* Sample Comments */}
                <div className="space-y-4">
                    <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            J
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">José Luis</span>
                                <span className="text-xs text-gray-500">hace 2 días</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">¡Completamente de acuerdo! Yo también probé esta pizza y está increíble.</p>
                            <button
                                onClick={() => navigate({ to: `/demo/pizzalandia/${pizzaType}/recomendaciones/${reviewId}/commentario/1` })}
                                className="text-xs text-red-600 dark:text-red-400 hover:underline mt-2"
                            >
                                Ver detalles del comentario →
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            L
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">Lucía Fernández</span>
                                <span className="text-xs text-gray-500">hace 1 semana</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Me encanta que menciones la masa madre. Es lo que marca la diferencia.</p>
                            <button
                                onClick={() => navigate({ to: `/demo/pizzalandia/${pizzaType}/recomendaciones/${reviewId}/commentario/2` })}
                                className="text-xs text-red-600 dark:text-red-400 hover:underline mt-2"
                            >
                                Ver detalles del comentario →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add Comment Form */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-3">Añade tu comentario</h4>
                    <div className="space-y-3">
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                            rows={3}
                            placeholder="Comparte tu experiencia..."
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Sé respetuoso y constructivo</span>
                            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg">
                                Publicar Comentario
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Route Information */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🔗 Información de Ruta (Español)</h4>
                <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <div>
                        <strong>Tipo de Pizza:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">{pizzaType}</code>
                    </div>
                    <div>
                        <strong>ID de Recomendación:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">{reviewId}</code>
                    </div>
                    <div>
                        <strong>Componente:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">pages/demo/Recomendacion</code>
                    </div>
                    <div>
                        <strong>Idioma:</strong>
                        <code className="ml-2 bg-blue-100 dark:bg-blue-800 px-1 rounded">es (Español)</code>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
                <button
                    onClick={() => navigate({ to: `/demo/pizzalandia/${pizzaType}/recomendaciones` })}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    <span>←</span>
                    Volver a Recomendaciones
                </button>
                <button
                    onClick={() => navigate({ to: `/demo/pizzalandia/${pizzaType}` })}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Ver Pizza
                    <span>→</span>
                </button>
            </div>
        </div>
    );
}

export default Recomendacion;
