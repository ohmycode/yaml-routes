import { Link, useParams } from "@tanstack/react-router";
import { useRouteTo } from "../../routeCache.generated";

export function Pizza() {
    const { pizzaType } = useParams({ strict: false });
    const routeTo = useRouteTo();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-8">
            <div className="max-w-4xl mx-auto">Hi</div>
        </div>
    );
}
