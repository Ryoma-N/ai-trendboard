import { fetchHN } from "@/lib/fetchHN";

// 許可するキーワードを厳密型で定義
const KEYWORDS = ["AI", "LLM", "RAG", "LangChain"] as const;
type Keyword = typeof KEYWORDS[number];

// Next.js App Router 用の searchParams 型を適切に定義
interface PageProps {
  // ✅ PromiseLike として誤解されないために、Record型で安全に扱う
  searchParams?: { [key: string]: string | string[] | undefined };
}

// 型ガード：stringかつKEYWORDSに含まれる場合のみ有効
function isKeyword(v: unknown): v is Keyword {
  return typeof v === "string" && (KEYWORDS as readonly string[]).includes(v);
}

export const revalidate = 3600;

export default async function Page({ searchParams }: PageProps) {
  const raw = searchParams?.q;

  // デフォルトはAI
  let q: Keyword = "AI";
  if (Array.isArray(raw)) {
    const first = raw[0];
    if (isKeyword(first)) q = first;
  } else if (isKeyword(raw)) {
    q = raw;
  }

  const items = await fetchHN(q);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-6 flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Trend Dashboard</h1>
          <p className="text-sm text-neutral-500">無料API / ISR(1h) / Vercel Hobby</p>
        </div>
        <nav className="flex gap-2">
          {KEYWORDS.map((k) => (
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
          <a
            href="/about"
            className="ml-2 rounded-lg border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            About
          </a>
        </nav>
      </header>

      {items.length === 0 ? (
        <p className="text-red-600">ニュース取得に失敗したか、該当がない。</p>
      ) : (
        <ul className="grid gap-3">
          {items.map((it) => (
            <li key={it.id} className="rounded-2xl border p-4 hover:shadow-sm transition">
              <a
                href={it.url ?? `https://news.ycombinator.com/item?id=${it.id}`}
                target="_blank"
                className="font-medium underline decoration-neutral-400 underline-offset-4 hove
