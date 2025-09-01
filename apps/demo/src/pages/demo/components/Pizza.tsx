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
        lg: "scale-200",
    };

    // Pizza-specific sophisticated toppings based on type
    const getToppings = (type: string) => {
        switch (type) {
            case "pepperoni":
                return {
                    primary: { color: "#DC644A", size: "w-3 h-3", shape: "rounded-full" },
                    secondary: { color: "#A0352B", size: "w-2 h-2", shape: "rounded-full" },
                    count: 4,
                    name: "pepperoni",
                    pattern: "scattered",
                };
            case "margherita":
                return {
                    primary: { color: "#228B22", size: "w-4 h-2", shape: "rounded-full transform rotate-12" },
                    secondary: { color: "#32CD32", size: "w-3 h-1", shape: "rounded-full transform -rotate-6" },
                    count: 2,
                    name: "basil",
                    pattern: "organic",
                };
            case "hawaiian":
                return {
                    primary: { color: "#FFD700", size: "w-3 h-3", shape: "rounded-sm transform rotate-45" },
                    secondary: { color: "#FF69B4", size: "w-2 h-2", shape: "rounded-full" },
                    count: 3,
                    name: "pineapple & ham",
                    pattern: "paired",
                };
            case "quattro":
                return {
                    primary: { color: "#8B4513", size: "w-3 h-2", shape: "rounded-full" },
                    secondary: { color: "#654321", size: "w-2 h-3", shape: "rounded-sm" },
                    count: 5,
                    name: "mushroom medley",
                    pattern: "dense",
                };
            default:
                return {
                    primary: { color: "#DC644A", size: "w-3 h-3", shape: "rounded-full" },
                    secondary: { color: "#A0352B", size: "w-2 h-2", shape: "rounded-full" },
                    count: 4,
                    name: "pepperoni",
                    pattern: "scattered",
                };
        }
    };

    const toppings = getToppings(pizzaType);

    return (
        <div className={`relative ${sizes[size]} transform-gpu`}>
            {/* Container for the pizza slice */}
            <div className="relative w-16 h-20 transform rotate-180 z-10">
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

                {/* Sophisticated Toppings */}
                <div className="absolute inset-0 z-20">
                    {/* Primary toppings with sophisticated patterns */}
                    <div
                        className={`absolute ${toppings.primary.size} ${toppings.primary.shape}`}
                        style={{
                            backgroundColor: toppings.primary.color,
                            top: "15px",
                            left: "26px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                    />

                    {/* Secondary and additional toppings based on pattern */}
                    {toppings.count > 1 && (
                        <div
                            className={`absolute ${toppings.secondary.size} ${toppings.secondary.shape}`}
                            style={{
                                backgroundColor: toppings.secondary.color,
                                top: toppings.pattern === "paired" ? "29px" : "30px",
                                left: toppings.pattern === "organic" ? "19px" : "17px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                            }}
                        />
                    )}

                    {toppings.count > 2 && (
                        <div
                            className={`absolute ${toppings.primary.size} ${toppings.primary.shape}`}
                            style={{
                                backgroundColor: toppings.primary.color,
                                top: toppings.pattern === "dense" ? "25px" : "27px",
                                left: toppings.pattern === "organic" ? "33px" : "35px",
                                opacity: 0.9,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                            }}
                        />
                    )}

                    {toppings.count > 3 && (
                        <div
                            className={`absolute ${toppings.secondary.size} ${toppings.secondary.shape}`}
                            style={{
                                backgroundColor: toppings.secondary.color,
                                top: "40px",
                                left: "27px",
                                opacity: 0.8,
                                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                            }}
                        />
                    )}

                    {toppings.count > 4 && (
                        <div
                            className={`absolute ${toppings.primary.size} ${toppings.primary.shape}`}
                            style={{
                                backgroundColor: toppings.primary.color,
                                top: "35px",
                                left: "22px",
                                opacity: 0.7,
                                transform: "scale(0.8)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
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
            </div>
        </div>
    );
};
