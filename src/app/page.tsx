import { redirect } from "next/navigation";

export default function Page() {
  // デフォルトは /ai にリダイレクト
  redirect("/ai");
}
