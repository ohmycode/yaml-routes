import { Link, useParams } from "@tanstack/react-router";
import { useRouteTo } from "../../routeCache.generated";

export function PizzaReview() {
    const { pizzaType, reviewId } = useParams({ strict: false });
    const routeTo = useRouteTo();

    // Mock review data
    const reviewData: Record<string, any> = {
        "1": {
            author: "Giuseppe Romano",
            rating: 5,
            title: "Perfetto! 🤌",
            content: `This is exactly how my nonna used to make it! The crust is crispy, the sauce is perfect, and the cheese... mama mia!
            
I've been making pizzas for 30 years, and I can tell when someone really knows what they're doing. This place gets it right. The dough has that perfect chew, the sauce isn't too sweet (a common mistake!), and they don't go overboard with toppings.

The wood-fired oven really makes a difference - you can taste that smoky flavor that you just can't get from a regular oven. Bravo!`,
            date: "2024-08-28",
            avatar: "👨‍🍳",
            verified: true,
            helpful: 23,
            photos: ["🍕", "🔥", "👨‍🍳"],
            location: "Rome, Italy",
        },
        "2": {
            author: "Sarah Chen",
            rating: 4,
            title: "Almost perfect",
            content: `Really great pizza! The only thing missing was a bit more basil, but overall fantastic. Will definitely order again!
            
The delivery was surprisingly fast, and the pizza arrived hot. The box design is cute too! My only complaint is that I'm a huge basil fan and would have loved more, but that's probably just personal preference.

The cheese quality is excellent - you can tell they use good ingredients. Price is fair for the quality you get.`,
            date: "2024-08-25",
            avatar: "👩‍💼",
            verified: true,
            helpful: 18,
            photos: ["📦", "🧀"],
            location: "San Francisco, CA",
        },
        "3": {
            author: "Mike Johnson",
            rating: 5,
            title: "Best pizza in town! 🍕",
            content: `I've tried every pizza place in the city, and this is hands down the best. The delivery was super fast too!
            
As someone who orders pizza way too often (don't judge me!), I consider myself a bit of a connoisseur. This place exceeded all my expectations. The crust has the perfect balance of crispy and chewy, and they're generous with the toppings without making it soggy.

Pro tip: Order extra sauce on the side - it's amazing for dipping the crust!`,
            date: "2024-08-22",
            avatar: "🧔",
            verified: false,
            helpful: 31,
            photos: ["🍕", "🥤"],
            location: "New York, NY",
        },
    };

    const review = reviewData[reviewId as string] || {
        author: "Anonymous Pizza Lover",
        rating: 4,
        title: "Great Pizza Experience!",
        content: "This review seems to have gotten lost in the pizza sauce! But trust me, it was delicious! 🍕",
        date: "2024-08-15",
        avatar: "😋",
        verified: false,
        helpful: 0,
        photos: ["🍕"],
        location: "Pizza Heaven",
    };

    const comments = [
        {
            id: "1",
            author: "Mario Rossi",
            avatar: "👨‍🍳",
            content: "Grazie mille for the amazing review! We're so happy you enjoyed your pizza! 🍕❤️",
            date: "2024-08-29",
            isOwner: true,
        },
        {
            id: "2",
            author: "Pizza Lover 2000",
            avatar: "🍕",
            content: "Totally agree! This place is amazing. Did you try their garlic knots?",
            date: "2024-08-29",
            isOwner: false,
        },
        {
            id: "3",
            author: "Local Foodie",
            avatar: "👩‍🍳",
            content: "I need to try this place! Your review convinced me 😍",
            date: "2024-08-30",
            isOwner: false,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        to={routeTo("pizza_review_list", { pizzaType: pizzaType as string })}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                    >
                        ← Back to All Reviews
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to={routeTo("pizza", { pizzaType: pizzaType as string })} className="hover:text-gray-800">
                            {pizzaType?.charAt(0).toUpperCase()}
                            {pizzaType?.slice(1)} Pizza
                        </Link>
                        <span>→</span>
                        <Link to={routeTo("pizza_review_list", { pizzaType: pizzaType as string })} className="hover:text-gray-800">
                            Reviews
                        </Link>
                        <span>→</span>
                        <span>Review #{reviewId}</span>
                    </div>
                </div>

                {/* Main Review */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">{review.avatar}</div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-2xl font-bold text-gray-800">{review.author}</h2>
                                    {review.verified && <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">✓ Verified Purchase</span>}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-xl ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-gray-600">{review.date}</span>
                                    <span className="text-gray-500">📍 {review.location}</span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            👍 Helpful ({review.helpful})
                        </button>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{review.title}</h3>

                    <div className="prose prose-lg max-w-none mb-6">
                        {review.content.split("\n").map(
                            (paragraph: string, index: number) =>
                                paragraph.trim() && (
                                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                                        {paragraph.trim()}
                                    </p>
                                )
                        )}
                    </div>

                    {/* Photos */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">📸 Photos from this review:</h4>
                        <div className="flex gap-3">
                            {review.photos.map((photo: string, index: number) => (
                                <div
                                    key={index}
                                    className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-200 transition-colors"
                                >
                                    {photo}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                            <span>👍</span>
                            <span>Helpful</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                            <span>↗️</span>
                            <span>Share</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                            <span>🚩</span>
                            <span>Report</span>
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">💬 Comments ({comments.length})</h3>

                    <div className="space-y-4 mb-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white/60 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">{comment.avatar}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-gray-800">{comment.author}</span>
                                            {comment.isOwner && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">🍕 Owner</span>}
                                            <span className="text-gray-500 text-sm">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-700">{comment.content}</p>
                                        <Link
                                            to={routeTo("pizza_review_comments", {
                                                pizzaType: pizzaType as string,
                                                reviewId: reviewId as string,
                                                commentId: comment.id,
                                            })}
                                            className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                                        >
                                            View Thread →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Comment */}
                    <div className="bg-white/80 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">💭 Add a comment</h4>
                        <textarea
                            placeholder="Share your thoughts about this review..."
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                        />
                        <div className="flex justify-end mt-3">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PizzaReview;
