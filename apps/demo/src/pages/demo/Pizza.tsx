import { Link, useParams } from "@tanstack/react-router";
import { useRouteTo, useCurrentLocale } from "../../routeCache.generated";

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

    // Pizza data for fun demo content - moved message calls to getter functions
    const pizzaData: Record<string, any> = getPizzaData(currentLocale);

    const pizza = pizzaData[pizzaType] || {
        name: pizzaType ? `${String(pizzaType).charAt(0).toUpperCase()}${String(pizzaType).slice(1)} Pizza` : "Mystery Pizza",
        description: "A mysterious and delicious pizza creation!",
        price: "$15.99",
        emoji: "❓",
        reviews: 42,
        rating: 4.5,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {currentLocale === "es"
                            ? "Pizzería Legendaria de Mario"
                            : currentLocale === "fr"
                            ? "Pizzeria Légendaire de Mario"
                            : "Mario's Legendary Pizza Palace"}
                    </h1>
                    <div className="text-6xl mb-4">{pizza.emoji}</div>
                    <h2 className="text-3xl font-semibold text-red-600">🍕 {pizza.name}</h2>
                </div>

                {/* Pizza Details Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                {currentLocale === "es" ? "Acerca de Esta Pizza" : currentLocale === "fr" ? "À Propos de Cette Pizza" : "About This Pizza"}
                            </h3>
                            <p className="text-lg text-gray-600 mb-6">{pizza.description}</p>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-bold text-green-600">{pizza.price}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-semibold">{pizza.rating}</span>
                                    <span className="text-gray-500">
                                        ({pizza.reviews} {currentLocale === "es" ? "reseñas" : currentLocale === "fr" ? "avis" : "reviews"})
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-4">
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

                        <div className="text-center">
                            <div className="text-8xl mb-4">🍕</div>
                            <p className="text-gray-600 italic">
                                "
                                {currentLocale === "es"
                                    ? `¡Mama mia! ¡Esta es la mejor pizza de ${String(pizzaType) || "pizza"} de la ciudad!`
                                    : currentLocale === "fr"
                                    ? `Mama mia! C'est la meilleure pizza ${String(pizzaType) || "pizza"} de la ville!`
                                    : `Mama mia! This is the best ${String(pizzaType) || "pizza"} pizza in town!`}
                                "
                                <br />
                                <span className="text-sm">
                                    - {currentLocale === "es" ? "Chef Mario" : currentLocale === "fr" ? "Chef Mario" : "Chef Mario"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-3xl mb-3">🔥</div>
                        <h4 className="font-bold text-gray-800 mb-2">
                            {currentLocale === "es" ? "Horno de Leña" : currentLocale === "fr" ? "Four à Bois" : "Wood Fired"}
                        </h4>
                        <p className="text-gray-600 text-sm">
                            {currentLocale === "es"
                                ? "Cocinada en nuestro auténtico horno italiano de leña"
                                : currentLocale === "fr"
                                ? "Cuite dans notre authentique four italien à bois"
                                : "Cooked in our authentic Italian wood-fired oven"}
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-3xl mb-3">🧀</div>
                        <h4 className="font-bold text-gray-800 mb-2">
                            {currentLocale === "es" ? "Ingredientes Frescos" : currentLocale === "fr" ? "Ingrédients Frais" : "Fresh Ingredients"}
                        </h4>
                        <p className="text-gray-600 text-sm">
                            {currentLocale === "es"
                                ? "Hecha con los mejores ingredientes italianos importados"
                                : currentLocale === "fr"
                                ? "Faite avec les meilleurs ingrédients italiens importés"
                                : "Made with the finest imported Italian ingredients"}
                        </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-3xl mb-3">⚡</div>
                        <h4 className="font-bold text-gray-800 mb-2">
                            {currentLocale === "es" ? "Entrega Rápida" : currentLocale === "fr" ? "Livraison Rapide" : "Fast Delivery"}
                        </h4>
                        <p className="text-gray-600 text-sm">
                            {currentLocale === "es"
                                ? "Caliente y fresca a tu puerta en 30 minutos o menos"
                                : currentLocale === "fr"
                                ? "Chaude et fraîche à votre porte en 30 minutes ou moins"
                                : "Hot and fresh to your door in 30 minutes or less"}
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-4">
                        🍕 {currentLocale === "es" ? "Explorar Más Pizzas" : currentLocale === "fr" ? "Explorer Plus de Pizzas" : "Explore More Pizzas"}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {Object.keys(pizzaData).map((type) => (
                            <Link
                                key={type}
                                to={routeTo("pizza", { pizzaType: type })}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    type === pizzaType ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                            >
                                🍕 {pizzaData[type].name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pizza;
