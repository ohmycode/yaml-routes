import { Link, useParams } from "@tanstack/react-router";
import { useRouteTo } from "../../routeCache.generated";
import * as m from "../../paraglide/messages.js";

export function Pizza() {
    const { pizzaType } = useParams({ strict: false });
    const routeTo = useRouteTo();

    // Pizza data for fun demo content
    const pizzaData: Record<string, any> = {
        margherita: {
            name: `🍕 ${m.pizza_types_margherita_name()}`,
            description: m.pizza_types_margherita_description(),
            price: "$12.99",
            emoji: "🇮🇹",
            reviews: 127,
            rating: 4.8,
        },
        pepperoni: {
            name: `🍕 ${m.pizza_types_pepperoni_name()}`,
            description: m.pizza_types_pepperoni_description(),
            price: "$14.99",
            emoji: "🇺🇸",
            reviews: 203,
            rating: 4.9,
        },
        hawaiian: {
            name: `🍕 ${m.pizza_types_hawaiian_name()}`,
            description: m.pizza_types_hawaiian_description(),
            price: "$13.99",
            emoji: "🏝️",
            reviews: 89,
            rating: 4.2,
        },
        quattro: {
            name: `🍕 ${m.pizza_types_quattro_name()}`,
            description: m.pizza_types_quattro_description(),
            price: "$16.99",
            emoji: "🍄",
            reviews: 67,
            rating: 4.7,
        },
    };

    const pizza = pizzaData[pizzaType as string] || {
        name: `🍕 ${pizzaType?.charAt(0).toUpperCase()}${pizzaType?.slice(1)} Pizza`,
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
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{m.pizza_palace_title()}</h1>
                    <div className="text-6xl mb-4">{pizza.emoji}</div>
                    <h2 className="text-3xl font-semibold text-red-600">{pizza.name}</h2>
                </div>

                {/* Pizza Details Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{m.pizza_about_title()}</h3>
                            <p className="text-lg text-gray-600 mb-6">{pizza.description}</p>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-bold text-green-600">{pizza.price}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-semibold">{pizza.rating}</span>
                                    <span className="text-gray-500">
                                        ({pizza.reviews} {m.pizza_reviews()})
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                    🛒 {m.pizza_add_to_cart()}
                                </button>
                                <Link
                                    to={routeTo("pizza_review_list", { pizzaType: pizzaType as string })}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                                >
                                    📝 {m.pizza_read_reviews()}
                                </Link>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-8xl mb-4">🍕</div>
                            <p className="text-gray-600 italic">
                                "{m.pizza_chef_quote({ pizzaType: pizzaType as string })}"
                                <br />
                                <span className="text-sm">- {m.pizza_chef_name()}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-3xl mb-3">🔥</div>
                        <h4 className="font-bold text-gray-800 mb-2">{m.pizza_wood_fired()}</h4>
                        <p className="text-gray-600 text-sm">{m.pizza_wood_fired_desc()}</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-3xl mb-3">🧀</div>
                        <h4 className="font-bold text-gray-800 mb-2">{m.pizza_fresh_ingredients()}</h4>
                        <p className="text-gray-600 text-sm">{m.pizza_fresh_ingredients_desc()}</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-3xl mb-3">⚡</div>
                        <h4 className="font-bold text-gray-800 mb-2">{m.pizza_fast_delivery()}</h4>
                        <p className="text-gray-600 text-sm">{m.pizza_fast_delivery_desc()}</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 mb-4">🍕 {m.pizza_explore_more()}</h4>
                    <div className="flex flex-wrap gap-3">
                        {Object.keys(pizzaData).map((type) => (
                            <Link
                                key={type}
                                to={routeTo("pizza", { pizzaType: type })}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    type === pizzaType ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                }`}
                            >
                                {pizzaData[type].name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
