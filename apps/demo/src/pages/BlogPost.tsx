import { useParams } from "@tanstack/react-router";

export default function BlogPost() {
    const { slug } = useParams({ strict: false });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Blog Post: {slug}</h1>
            <p>Blog post content for slug: {slug}</p>
        </div>
    );
}
