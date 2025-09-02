import { Link, useParams, useLocation } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale, useRouteName } from "../../routeCache.generated";
import { YamlHighlight } from "./components/YamlHighlight";
import { RouteInfoPanel } from "./components/RouteInfoPanel";
import { Browser } from "./components/Browser";
import { PizzaSite } from "./components/PizzaSite";
import { Layout } from "./components/Layout";
import { getPizzaData } from "./PizzaType";

// Mock reviews data
export const reviews = [
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

export function PizzaReviewList() {
    const params = useParams({ strict: false });
    const pizzaType = typeof params.pizzaType === "string" ? params.pizzaType : String(params.pizzaType || "");
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

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

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
                            },
                        ]}
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-100 mb-4">
                                📝{" "}
                                {currentLocale === "es"
                                    ? `Reseñas para ${pizza.name}`
                                    : currentLocale === "fr"
                                    ? `Avis pour ${pizza.name}`
                                    : `Reviews for ${pizza.name}`}
                            </h1>

                            <div className="flex items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⭐</span>
                                    <span className="text-2xl font-bold text-gray-100">{averageRating.toFixed(1)}</span>
                                    <span className="text-gray-300">
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
                                <div key={review.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors border border-gray-700">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl">{review.avatar}</div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-100">{review.author}</h3>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}>
                                                                ★
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-400 text-sm">{review.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            to={routeTo("pizza_review", {
                                                pizzaType: pizzaType,
                                                reviewId: review.id,
                                            })}
                                            className="text-blue-400 hover:text-blue-300 font-medium"
                                        >
                                            {currentLocale === "es" ? "Ver Detalles" : currentLocale === "fr" ? "Voir les Détails" : "View Details"} →
                                        </Link>
                                    </div>

                                    <h4 className="text-lg font-semibold text-gray-100 mb-2">{review.title}</h4>
                                    <p className="text-gray-300 mb-4 leading-relaxed">{review.content}</p>

                                    <div className="flex items-center justify-between">
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
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
                    </PizzaSite>
                </Browser>

                <RouteInfoPanel />
            </div>
        </Layout>
    );
}

export default PizzaReviewList;
