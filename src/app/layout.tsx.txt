export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6 leading-7">
      <h1 className="text-2xl font-bold">About</h1>
      <p>
        金融インフラエンジニアの経験を基盤に、モダンWebとAIで価値提供までのリードタイム短縮にフォーカス。
        本サイトは無料API（Hacker News）とISRで1時間ごとに更新する最小実装。
      </p>
      <ul className="list-disc pl-6">
        <li>Stack: Next.js 15 / TypeScript / Tailwind / Vercel Hobby</li>
        <li>Ops: APIアクセスはISRで節約。完全無料運用。</li>
        <li>関心領域: AI×業務改善、観測性、コスト可視化、セキュリティ設計</li>
      </ul>
      <p>GitHub: <a className="underline" href="https://github.com/あなたのID" target="_blank">https://github.com/あなたのID</a></p>
    </main>
  );
}
