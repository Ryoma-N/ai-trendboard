// src/lib/fetchHN.ts
const ONE_HOUR = 60 * 60;

export type HNItem = {
  id: string;
  title: string;
  url: string | null;
  points: number;
  author: string;
  created_at: string;
};

// Hacker News APIの返却形をざっくり型定義
type HNHit = {
  objectID: string;
  title: string;
  url: string | null;
  points?: number;
  author?: string;
  created_at: string;
};

type HNSearchResponse = {
  hits: HNHit[];
};

export async function fetchHN(keyword = "AI"): Promise<HNItem[]> {
  const url = new URL("https://hn.algolia.com/api/v1/search");
  url.searchParams.set("query", keyword);
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "20");

  const res = await fetch(url.toString(), {
    next: { revalidate: ONE_HOUR }, // 1時間キャッシュ
  });
  if (!res.ok) return [];

  const data: HNSearchResponse = await res.json();
  const hits = Array.isArray(data.hits) ? data.hits : [];

  return hits.map((h) => ({
    id: h.objectID,
    title: h.title ?? "(no title)",
    url: h.url ?? null,
    points: h.points ?? 0,
    author: h.author ?? "unknown",
    created_at: h.created_at,
  }));
}
