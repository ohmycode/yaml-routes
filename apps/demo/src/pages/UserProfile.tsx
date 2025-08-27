import { useParams } from "@tanstack/react-router";

export default function UserProfile() {
    const { id } = useParams({ strict: false });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <p>Profile for user ID: {id}</p>
        </div>
    );
}
