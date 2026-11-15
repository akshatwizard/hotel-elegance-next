import Link from "next/link";
import { blogStayBlock } from "@/data/seoContent";

// Contextual internal-link box shown under every blog post.
export default function BlogStay({ slug }) {
  const b = blogStayBlock(slug);
  return (
    <section className="pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="rounded-2xl bg-[#410f06] text-white p-6">
          <h2 className="text-xl font-semibold text-white mb-2">{b.title}</h2>
          <p className="text-white/90 mb-4">{b.text}</p>
          <div className="flex flex-wrap gap-3">
            {b.links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg border border-white/40 px-4 py-2 text-sm text-white hover:bg-white/10">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
