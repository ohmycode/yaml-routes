import { Link, useParams, useLocation } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale } from "../../routeCache.generated";
import { YamlHighlight, pizzaYamlContent, getPizzaHighlightedPaths } from "./components/highlightedRoutes";
import { RouteInfoPanel } from "./components/RouteInfoPanel";
import { Browser } from "./components/Browser";
import { PizzaSite } from "./components/PizzaSite";

// Pizza data generation function moved outside component
const getPizzaData = (currentLocale: string): Record<string, any> => ({
    margherita: {
        name: currentLocale === "es" ? "Margarita Clásica" : currentLocale === "fr" ? "Marguerite Classique" : "Classic Margherita",
        description:
            currentLocale === "es"
                ? "¡La reina de las pizzas! Tomates frescos, mozzarella y albahaca."
                : currentLocale === "fr"
                ? "La reine des pizzas! Tomates fraîches, mozzarella et basilic."
                : "The queen of pizzas! Fresh tomatoes, mozzarella, and basil.",
        price: "$12.99",
        emoji: "🇮🇹",
        reviews: 127,
        rating: 4.8,
    },
    pepperoni: {
        name: currentLocale === "es" ? "Pepperoni Suprema" : currentLocale === "fr" ? "Pepperoni Suprême" : "Pepperoni Supreme",
        description:
            currentLocale === "es"
                ? "¡La favorita de América! Cargada de pepperoni picante y queso extra."
                : currentLocale === "fr"
                ? "Le favori de l'Amérique! Chargé de pepperoni épicé et de fromage supplémentaire."
                : "America's favorite! Loaded with spicy pepperoni and extra cheese.",
        price: "$14.99",
        emoji: "🇺🇸",
        reviews: 203,
        rating: 4.9,
    },
    hawaiian: {
        name: currentLocale === "es" ? "Paraíso Hawaiano" : currentLocale === "fr" ? "Paradis Hawaïen" : "Hawaiian Paradise",
        description:
            currentLocale === "es"
                ? "¡Controversial pero deliciosa! Jamón, piña y queso."
                : currentLocale === "fr"
                ? "Controversé mais délicieux! Jambon, ananas et fromage."
                : "Controversial but delicious! Ham, pineapple, and cheese.",
        price: "$13.99",
        emoji: "🏝️",
        reviews: 89,
        rating: 4.2,
    },
    quattro: {
        name: currentLocale === "es" ? "Quattro Stagioni" : currentLocale === "fr" ? "Quattro Stagioni" : "Quattro Stagioni",
        description:
            currentLocale === "es"
                ? "¡Cuatro estaciones en una pizza! Champiñones, jamón, alcachofas y aceitunas."
                : currentLocale === "fr"
                ? "Quatre saisons dans une pizza! Champignons, jambon, artichauts et olives."
                : "Four seasons in one pizza! Mushrooms, ham, artichokes, and olives.",
        price: "$16.99",
        emoji: "🍄",
        reviews: 67,
        rating: 4.7,
    },
});

function Pizza() {
    const params = useParams({ strict: false });
    const pizzaType = typeof params.pizzaType === "string" ? params.pizzaType : String(params.pizzaType || "");
    const routeTo = useRouteTo();
    const currentLocale = useCurrentLocale();
    const location = useLocation();

    // Pizza data for fun demo content - moved message calls to getter functions
    const pizzaData: Record<string, any> = getPizzaData(currentLocale);
    const iDontExist = pizzaData["IDONTEXIST"]; // Just to demonstrate no linter error

    console.log("iDontExist", iDontExist);

    const pizza = pizzaData[pizzaType] || {
        name: pizzaType ? `${String(pizzaType).charAt(0).toUpperCase()}${String(pizzaType).slice(1)} Pizza` : "Mystery Pizza",
        description: "A mysterious and delicious pizza creation!",
        price: "$15.99",
        emoji: "❓",
        reviews: 42,
        rating: 4.5,
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto p-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
                        YAML Routes Demo
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - YAML Configuration */}
                    <div className="space-y-4">
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                                📝 routes.yml Configuration
                                <span className="text-sm bg-blue-900 text-blue-300 px-2 py-1 rounded">Live</span>
                            </h2>
                            <p className="text-gray-300 mb-4">The highlighted sections show the current active route and parameters</p>
                            <YamlHighlight
                                yamlContent={pizzaYamlContent}
                                highlightedPaths={getPizzaHighlightedPaths("pizza", { pizzaType }, currentLocale)}
                                title="Pizza Routes - Live Demo"
                            />
                        </div>
                    </div>

                    {/* Right Side - Browser Mockup */}
                    <div className="space-y-4">
                        <Browser path={`/pizza/${pizzaType}`} theme="dark">
                            <PizzaSite
                                breadcrumbs={[
                                    {
                                        label: currentLocale === "es" ? "Inicio" : currentLocale === "fr" ? "Accueil" : "Home",
                                        to: routeTo("demo"),
                                    },
                                    {
                                        label: currentLocale === "es" ? "Menú de Pizzas" : currentLocale === "fr" ? "Menu Pizza" : "Pizza Menu",
                                    },
                                    {
                                        label: pizza.name,
                                    },
                                ]}
                            >
                                {/* Pizza Header */}
                                <div className="flex items-start gap-8 mb-8">
                                    <div className="text-8xl">{pizza.emoji}</div>
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-gray-100 mb-2">{pizza.name}</h1>
                                        <p className="text-gray-300 text-lg mb-4">{pizza.description}</p>
                                        <div className="flex items-center gap-6">
                                            <span className="text-3xl font-bold text-green-400">{pizza.price}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-yellow-400">
                                                    {"★".repeat(Math.floor(pizza.rating))}
                                                    {"☆".repeat(5 - Math.floor(pizza.rating))}
                                                </div>
                                                <span className="text-gray-300">
                                                    {pizza.rating} ({pizza.reviews}{" "}
                                                    {currentLocale === "es" ? "reseñas" : currentLocale === "fr" ? "avis" : "reviews"})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 mb-8">
                                    <Link
                                        to={routeTo("pizza_review_list", { pizzaType: pizzaType || "margherita" })}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                                    >
                                        📝{" "}
                                        {currentLocale === "es" ? "Ver Todas las Reseñas" : currentLocale === "fr" ? "Voir Tous les Avis" : "View All Reviews"}
                                    </Link>
                                </div>

                                {/* Pizza Selection Navigation */}
                                <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-100">
                                        {currentLocale === "es"
                                            ? "Otras Pizzas Populares"
                                            : currentLocale === "fr"
                                            ? "Autres Pizzas Populaires"
                                            : "Other Popular Pizzas"}
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {Object.entries(pizzaData).map(([type, data]) => (
                                            <Link
                                                key={type}
                                                to={routeTo("pizza", { pizzaType: type })}
                                                className={`p-3 rounded-lg border-2 transition-all text-center ${
                                                    type === pizzaType
                                                        ? "border-red-500 bg-red-900/50"
                                                        : "border-gray-600 bg-gray-700 hover:border-red-400 hover:bg-red-900/25"
                                                }`}
                                            >
                                                <div className="text-2xl mb-1">{data.emoji}</div>
                                                <div className="text-sm font-medium text-gray-200">{data.name}</div>
                                                <div className="text-xs text-green-400 font-semibold">{data.price}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Reviews Preview */}
                                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-100">
                                            {currentLocale === "es" ? "Reseñas Recientes" : currentLocale === "fr" ? "Avis Récents" : "Recent Reviews"}
                                        </h3>
                                        <Link
                                            to={routeTo("pizza_review_list", { pizzaType: pizzaType || "margherita" })}
                                            className="text-blue-400 hover:underline text-sm font-medium"
                                        >
                                            {currentLocale === "es" ? "Ver todas →" : currentLocale === "fr" ? "Voir tout →" : "View all →"}
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-gray-700 p-4 rounded border border-gray-600">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-100">Maria Rodriguez</span>
                                                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                                                </div>
                                                <span className="text-xs text-gray-400">2 days ago</span>
                                            </div>
                                            <p className="text-gray-300 text-sm">
                                                {currentLocale === "es"
                                                    ? "¡Increíble! La mejor pizza que he probado en años."
                                                    : currentLocale === "fr"
                                                    ? "Incroyable! La meilleure pizza que j'ai goûtée depuis des années."
                                                    : "Amazing! The best pizza I've had in years."}
                                            </p>
                                            <Link
                                                to={routeTo("pizza_review", { pizzaType: pizzaType || "margherita", reviewId: "amazing-flavor" })}
                                                className="text-blue-400 hover:underline text-xs mt-2 inline-block"
                                            >
                                                {currentLocale === "es" ? "Leer más →" : currentLocale === "fr" ? "Lire plus →" : "Read more →"}
                                            </Link>
                                        </div>
                                        <div className="bg-gray-700 p-4 rounded border border-gray-600">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-100">John Smith</span>
                                                    <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                                                </div>
                                                <span className="text-xs text-gray-400">1 week ago</span>
                                            </div>
                                            <p className="text-gray-300 text-sm">
                                                {currentLocale === "es"
                                                    ? "Muy buena pizza, entrega rápida. Lo recomiendo."
                                                    : currentLocale === "fr"
                                                    ? "Très bonne pizza, livraison rapide. Je le recommande."
                                                    : "Great pizza, fast delivery. Highly recommend."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </PizzaSite>
                        </Browser>

                        <RouteInfoPanel
                            routeName="pizza"
                            component="pages/demo/Pizza"
                            params={{ pizzaType }}
                            urlPattern={currentLocale === "es" ? "/demo/pizzalandia/{pizzaType}" : "/demo/pizza-corner/{pizzaType}"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pizza;
