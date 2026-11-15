import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";

// Server-rendered guide block: keyword-focused sections, quick facts,
// internal links and FAQs (with FAQPage schema). Content lives in src/data/seoContent.js.
export default function SeoGuide({ content }) {
  if (!content) return null;
  const { heading, intro, facts, sections, links, faqs } = content;
  return (
    <section className="py-12 bg-white seo-guide">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#410f06] mb-4">{heading}</h2>
        {intro?.map((p, i) => (
          <p key={i} className="text-gray-700 leading-relaxed mb-3">{p}</p>
        ))}

        {facts?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
            {facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-[#9a5e2a]/30 bg-[#eae7e1]/50 p-4">
                <p className="text-xs uppercase tracking-wide text-[#9a5e2a] mb-1">{f.label}</p>
                <p className="text-gray-800 font-medium mb-0">{f.value}</p>
              </div>
            ))}
          </div>
        )}

        {sections?.map((s) => (
          <div key={s.title} className="mb-6">
            <h3 className="text-xl font-semibold text-[#410f06] mb-2">{s.title}</h3>
            {s.body?.map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-2">{p}</p>
            ))}
            {s.list && (
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {links?.length > 0 && (
          <p className="text-gray-700 mb-8">
            {links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <Link href={l.href} className="text-[#9a5e2a] underline">
                  {l.label}
                </Link>
              </span>
            ))}
          </p>
        )}

        {faqs?.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-[#410f06] mb-3">Frequently asked questions</h3>
            {faqs.map((f) => (
              <details key={f.q} className="border-b border-gray-200 py-3">
                <summary className="font-medium text-gray-900 cursor-pointer">{f.q}</summary>
                <p className="text-gray-700 mt-2 leading-relaxed mb-0">{f.a}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
