import { API_BASE, REVALIDATE_SECONDS } from "@/lib/config";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogDetailsPage from "./BlogDetailsPage";
async function getBlogDetails(slug) {
    try {
        const apiUrl = `${API_BASE}/blog/${slug}`;
        const res = await fetch(apiUrl, { next: { revalidate: REVALIDATE_SECONDS } });
        if (res.status === 404) return { status: false };
        if (!res.ok) throw new Error(`Blog API failed: ${res.status}`);
        return await res.json();
    } catch (error) {
        // Backend unreachable: surface as a server error so crawlers retry
        // instead of indexing a fake "not found" page.
        console.error("Blog details fetch error:", error);
        throw error;
    }
}
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const res = await getBlogDetails(slug);
    if (!res?.status) {
        return { title: "Blog Not Found | The Elegance Hotel", robots: { index: false } };
    }
    const blog = res.data;
    return {
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.short_desc,
        alternates: {
            canonical: `https://www.theelegance.co.in/blog/${slug}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.short_desc,
            images: blog.featured_image ? [blog.featured_image] : [],
            type: "article",
        },
    };
}
export default async function Page({ params }) {
    const { slug } = await params;
    const blogRes = await getBlogDetails(slug);
    if (!blogRes?.status) notFound();
    return (
        <>
            <Breadcrumb
                title={blogRes.data.title}
                backgroundImage="/assets/dev-img/bread-banner/Tariff.jpg"
                mobileBackgroundImage=""
                subtitle=""
            />

            <BlogDetailsPage blog={blogRes.data} />
        </>
    );
}
