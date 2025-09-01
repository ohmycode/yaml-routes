import { Link, useParams, useLocation } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale } from "../../routeCache.generated";
import { YamlHighlight, pizzaYamlContent, getPizzaHighlightedPaths } from "./components/highlightedRoutes";

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

                    {/* Right Side - Pizza Content (Dark Mode) */}
                    <div className="space-y-6">
                        {/* Pizza Details Card */}
                        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                            <div className="text-center mb-8">
                                <div className="text-8xl mb-4">{pizza.emoji}</div>
                                <h2 className="text-3xl font-semibold text-red-400 mb-4">{pizza.name}</h2>
                                <p className="text-lg text-gray-300 mb-6">{pizza.description}</p>

                                <div className="flex items-center justify-center gap-6 mb-6">
                                    <span className="text-4xl font-bold text-green-400">{pizza.price}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="font-semibold text-white">{pizza.rating}</span>
                                        <span className="text-gray-400">
                                            ({pizza.reviews} {currentLocale === "es" ? "reseñas" : currentLocale === "fr" ? "avis" : "reviews"})
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-center mb-8">
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                        🛒 {currentLocale === "es" ? "Agregar al Carrito" : currentLocale === "fr" ? "Ajouter au Panier" : "Add to Cart"}
                                    </button>
                                    <Link
                                        to={routeTo("pizza_review_list", { pizzaType: pizzaType || "margherita" })}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                                    >
                                        📝 {currentLocale === "es" ? "Leer Reseñas" : currentLocale === "fr" ? "Lire les Avis" : "Read Reviews"}
                                    </Link>
                                </div>
                            </div>

                            {/* Chef's Quote */}
                            <div className="bg-gray-700/50 rounded-xl p-6 mb-8 border border-gray-600">
                                <p className="text-gray-300 italic text-center text-lg">
                                    "
                                    {currentLocale === "es"
                                        ? `¡Mama mia! ¡Esta es la mejor pizza de ${String(pizzaType) || "pizza"} de la ciudad!`
                                        : currentLocale === "fr"
                                        ? `Mama mia! C'est la meilleure pizza ${String(pizzaType) || "pizza"} de la ville!`
                                        : `Mama mia! This is the best ${String(pizzaType) || "pizza"} pizza in town!`}
                                    "
                                    <br />
                                    <span className="text-sm text-gray-400 mt-2 block">
                                        - {currentLocale === "es" ? "Chef Mario" : currentLocale === "fr" ? "Chef Mario" : "Chef Mario"}
                                    </span>
                                </p>
                            </div>

                            {/* Features */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-700/30 rounded-xl p-6 text-center border border-gray-600">
                                    <div className="text-3xl mb-3">🔥</div>
                                    <h4 className="font-bold text-white mb-2">
                                        {currentLocale === "es" ? "Horno de Leña" : currentLocale === "fr" ? "Four à Bois" : "Wood Fired"}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {currentLocale === "es"
                                            ? "Cocinada en nuestro auténtico horno italiano de leña"
                                            : currentLocale === "fr"
                                            ? "Cuite dans notre authentique four italien à bois"
                                            : "Cooked in our authentic Italian wood-fired oven"}
                                    </p>
                                </div>
                                <div className="bg-gray-700/30 rounded-xl p-6 text-center border border-gray-600">
                                    <div className="text-3xl mb-3">🧀</div>
                                    <h4 className="font-bold text-white mb-2">
                                        {currentLocale === "es" ? "Ingredientes Frescos" : currentLocale === "fr" ? "Ingrédients Frais" : "Fresh Ingredients"}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {currentLocale === "es"
                                            ? "Hecha con los mejores ingredientes italianos importados"
                                            : currentLocale === "fr"
                                            ? "Faite avec les meilleurs ingrédients italiens importés"
                                            : "Made with the finest imported Italian ingredients"}
                                    </p>
                                </div>
                                <div className="bg-gray-700/30 rounded-xl p-6 text-center border border-gray-600">
                                    <div className="text-3xl mb-3">⚡</div>
                                    <h4 className="font-bold text-white mb-2">
                                        {currentLocale === "es" ? "Entrega Rápida" : currentLocale === "fr" ? "Livraison Rapide" : "Fast Delivery"}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {currentLocale === "es"
                                            ? "Caliente y fresca a tu puerta en 30 minutos o menos"
                                            : currentLocale === "fr"
                                            ? "Chaude et fraîche à votre porte en 30 minutes ou moins"
                                            : "Hot and fresh to your door in 30 minutes or less"}
                                    </p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                                <h4 className="font-bold text-white mb-4">
                                    🍕{" "}
                                    {currentLocale === "es"
                                        ? "Explorar Más Pizzas"
                                        : currentLocale === "fr"
                                        ? "Explorer Plus de Pizzas"
                                        : "Explore More Pizzas"}
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {Object.keys(pizzaData).map((type) => (
                                        <Link
                                            key={type}
                                            to={routeTo("pizza", { pizzaType: type })}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                type === pizzaType ? "bg-red-600 text-white" : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                                            }`}
                                        >
                                            🍕 {pizzaData[type].name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pizza;
