import { redirect } from "next/navigation";

// The proxy redirects "/" → "/fr". This is a fallback for any edge case.
export default function RootPage() {
  redirect("/fr");
}
