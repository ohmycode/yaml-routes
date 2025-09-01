import React from "react";

interface PizzaProps {
    pizzaType: string;
    emoji?: string;
    size?: "sm" | "md" | "lg";
    animated?: boolean;
}

export const Pizza: React.FC<PizzaProps> = ({ pizzaType, emoji = "🍕", size = "md", animated = true }) => {
    // Size configurations
    const sizes = {
        sm: "scale-75",
        md: "scale-100",
        lg: "scale-125",
    };

    // Pizza-specific toppings based on type
    const getToppings = (type: string) => {
        switch (type) {
            case "pepperoni":
                return { color: "#DC644A", count: 3, name: "pepperoni" };
            case "margherita":
                return { color: "#228B22", count: 2, name: "basil" };
            case "hawaiian":
                return { color: "#FFD700", count: 3, name: "pineapple" };
            case "quattro":
                return { color: "#8B4513", count: 4, name: "mushroom" };
            default:
                return { color: "#DC644A", count: 3, name: "pepperoni" };
        }
    };

    const toppings = getToppings(pizzaType);

    return (
        <div className={`relative ${sizes[size]} transform-gpu`}>
            {/* Container for the pizza slice */}
            <div className="relative w-16 h-20 transform rotate-180">
                {/* Pizza Crust (Main Triangle) */}
                <div className="absolute inset-0">
                    {/* Outer crust */}
                    <div
                        className="absolute w-0 h-0 border-l-8 border-r-8 border-b-20 border-transparent"
                        style={{
                            borderBottomColor: "#D6934D",
                            borderRadius: "0 0 40px 40px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            borderBottomWidth: "50px",
                            borderLeftWidth: "25px",
                            borderRightWidth: "25px",
                        }}
                    />

                    {/* Cheese layer */}
                    <div
                        className="absolute w-0 h-0 border-l-7 border-r-7 border-b-18 border-transparent z-10"
                        style={{
                            borderBottomColor: "#FCC61A",
                            borderRadius: "0 0 35px 35px",
                            left: "50%",
                            top: "2px",
                            transform: "translateX(-50%)",
                            borderBottomWidth: "43px",
                            borderLeftWidth: "21px",
                            borderRightWidth: "21px",
                        }}
                    />

                    {/* Sauce layer */}
                    <div
                        className="absolute w-0 h-0 border-l-6 border-r-6 border-b-16 border-transparent z-5"
                        style={{
                            borderBottomColor: "#A82B2B",
                            borderRadius: "0 0 35px 35px",
                            left: "50%",
                            top: "4px",
                            transform: "translateX(-50%)",
                            borderBottomWidth: "40px",
                            borderLeftWidth: "20px",
                            borderRightWidth: "20px",
                        }}
                    />
                </div>

                {/* Toppings */}
                <div className="absolute inset-0 z-20">
                    {/* Main topping */}
                    <div
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: toppings.color,
                            top: "10px",
                            left: "19px",
                        }}
                    />

                    {/* Additional toppings based on type */}
                    {toppings.count > 1 && (
                        <div
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: toppings.color,
                                top: "25px",
                                left: "10px",
                            }}
                        />
                    )}

                    {toppings.count > 2 && (
                        <div
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: toppings.color,
                                top: "22px",
                                left: "28px",
                            }}
                        />
                    )}

                    {toppings.count > 3 && (
                        <div
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: toppings.color,
                                top: "35px",
                                left: "20px",
                            }}
                        />
                    )}
                </div>

                {/* Melting Cheese Animation */}
                {animated && (
                    <div className="absolute z-10">
                        {/* Cheese drip 1 */}
                        <div
                            className="absolute w-1 h-8 bg-yellow-400 rounded-t-full animate-bounce"
                            style={{
                                top: "5px",
                                left: "30px",
                                animationDelay: "0s",
                                animationDuration: "3s",
                            }}
                        />

                        {/* Cheese drip 2 */}
                        <div
                            className="absolute w-1 h-6 bg-yellow-400 rounded-t-full animate-bounce"
                            style={{
                                top: "8px",
                                left: "38px",
                                animationDelay: "1s",
                                animationDuration: "3s",
                            }}
                        />

                        {/* Cheese drip 3 */}
                        <div
                            className="absolute w-1 h-7 bg-yellow-400 rounded-t-full animate-bounce"
                            style={{
                                top: "3px",
                                left: "22px",
                                animationDelay: "2s",
                                animationDuration: "3s",
                            }}
                        />
                    </div>
                )}

                {/* Pizza Type Emoji */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs z-40 rotate-180">{emoji}</div>
            </div>
        </div>
    );
};
