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

export async function fetchHN(keyword = "AI"): Promise<HNItem[]> {
  const url = new URL("https://hn.algolia.com/api/v1/search");
  url.searchParams.set("query", keyword);
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "20");

  const res = await fetch(url.toString(), {
    // API叩き過ぎ防止。1時間はキャッシュ（無料運用の鍵）
    next: { revalidate: ONE_HOUR },
  });
  if (!res.ok) {
    // 失敗時は空配列で返す（画面を壊さない）
    return [];
  }
  const data = await res.json();
  return (data.hits || []).map((h: any) => ({
    id: h.objectID,
    title: h.title,
    url: h.url,
    points: h.points ?? 0,
    author: h.author ?? "unknown",
    created_at: h.created_at,
  }));
}
