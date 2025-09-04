import { fetchHN } from "@/lib/fetchHN";

const KEYWORDS = ["AI", "LLM", "RAG", "LangChain"];
export const revalidate = 3600;

export default async function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q && KEYWORDS.includes(searchParams.q)) ? searchParams.q : "AI";
  const items = await fetchHN(q);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Trend Dashboard</h1>
          <p className="text-sm text-neutral-500">無料API / ISR(1h) / Vercel Hobby</p>
        </div>
        <nav className="flex gap-2">
          {KEYWORDS.map(k => (
            <a
              key={k}
              href={`/?q=${encodeURIComponent(k)}`}
              className={`rounded-lg border px-3 py-1 text-sm transition ${
                k === q ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {k}
            </a>
          ))}
          <a href="/about" className="ml-2 rounded-lg border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">
            About
          </a>
        </nav>
      </header>

      {items.length === 0 ? (
        <p className="text-red-600">ニュース取得に失敗したか、該当がない。</p>
      ) : (
        <ul className="grid gap-3">
          {items.map(it => (
            <li key={it.id} className="rounded-2xl border p-4 hover:shadow-sm transition">
              <a
                href={it.url ?? `https://news.ycombinator.com/item?id=${it.id}`}
                target="_blank"
                className="font-medium underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-700"
              >
                {it.title || "(no title)"}
              </a>
              <div className="mt-1 text-xs text-neutral-500">
                by {it.author} ・ {new Date(it.created_at).toLocaleString()} ・ {it.points} points
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-10 text-center text-xs text-neutral-500">
        Next.js 15 / TypeScript / Tailwind / Vercel Hobby（無料運用）
      </footer>
    </main>
  );
}
