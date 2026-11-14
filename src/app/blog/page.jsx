import { buildMetadata } from "@/utils/metadata";
import { API_BASE, REVALIDATE_SECONDS } from "@/lib/config";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogList from "./BlogList";
import BlogSkeleton from "./BlogSkeleton";

async function getBlogList() {
    try {
        const res = await fetch(
            API_BASE + "/blog",
            {
                next: { revalidate: REVALIDATE_SECONDS },
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();

        if (data?.status && data?.data) {
            return data.data;
        }

        return [];
    } catch (error) {
        console.error("Blog fetch error:", error);
        return [];
    }
}
export const metadata = buildMetadata({
    title: "Varanasi Travel & Hotel Blog",
    description:
        "Explore our Varanasi travel blog covering hotel stays, nearby attractions, food experiences, travel tips, and insights for a memorable visit.",
    path: "/blog",
});

export default async function BlogPage() {
    const blogData = await getBlogList();

    return (
        <>
            <Breadcrumb
                title="Blog"
                backgroundImage="/assets/dev-img/bread-banner/Tariff.jpg"
                mobileBackgroundImage=""
                subtitle=""
            />

            <section className="section-spa padding-b-50 list-blog-section">
                <div className="container">
                    <Suspense fallback={<BlogSkeleton />}>
                        <BlogList initialBlogData={blogData} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}
