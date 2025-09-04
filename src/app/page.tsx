import { fetchHN } from "@/lib/fetchHN";

export const revalidate = 3600; // ページ側でも保険で1時間キャッシュ

export default async function Page() {
  // "AI" を "LLM" や "RAG" に変えるとテーマ切替できる
  const items = await fetchHN("AI");

  return (
    <main style={{maxWidth: 900, margin: "40px auto", padding: 16}}>
      <header style={{marginBottom: 24}}>
        <h1 style={{fontSize: 28, fontWeight: 800}}>AIニュース（Hacker News）</h1>
        <p style={{color: "#666"}}>無料API / 1時間キャッシュで最新っぽさを保つ。</p>
      </header>

      {items.length === 0 ? (
        <p style={{color:"#a00"}}>ニュース取得に失敗したか、該当がない。</p>
      ) : (
        <ul style={{display: "grid", gap: 12, gridTemplateColumns: "1fr"}}>
          {items.map((it) => (
            <li key={it.id} style={{border: "1px solid #eee", borderRadius: 12, padding: 16}}>
              <a
                href={it.url ?? `https://news.ycombinator.com/item?id=${it.id}`}
                target="_blank"
                rel="noreferrer"
                style={{fontWeight: 600, textDecoration: "underline"}}
              >
                {it.title || "(no title)"}
              </a>
              <div style={{fontSize: 12, color: "#666", marginTop: 6}}>
                by {it.author} ・ {new Date(it.created_at).toLocaleString()} ・ {it.points} points
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer style={{marginTop: 24, fontSize: 12, color: "#888"}}>
        Next.js App Router / ISR（1時間キャッシュ） / Hacker News API
      </footer>
    </main>
  );
}
