import { redirect } from "next/navigation";
export default function Page() {
  // デフォルトは /ai に統一
  redirect("/ai");
}
