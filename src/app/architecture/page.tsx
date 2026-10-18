import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/lib/lang";
import ArchExplorer from "@/components/ArchExplorer";

export const metadata: Metadata = {
  alternates: { canonical: "/architecture" },
  openGraph: {
    title: "Architecture | Hafiz Hamdani",
    description: "System context, sequence, data flow, use case and ER diagrams for each project, drawn from the real code and schemas in the repositories.",
    url: "/architecture",
  },
  title: "Architecture | Hafiz Hamdani",
  description:
    "System context, sequence, data flow, use case and ER diagrams for each project, drawn from the real code and schemas in the repositories.",
};

const INTRO =
  "Every diagram on this page is drawn from the actual repository: real routes, real tables, real cron schedules. Where a diagram type does not apply to a project, that is stated instead of drawn.";

export default function ArchitecturePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-28 md:px-10">
      <Link href="/" className="text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent">
        <T>Back to home</T>
      </Link>
      <h1 className="mt-6 font-display text-4xl md:text-6xl"><T>Architecture.</T></h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        <T>{INTRO}</T>
      </p>

      <p className="mt-3 max-w-2xl text-sm text-muted lang-ja-only">
        <T>Diagram labels are kept in English on purpose, so they match the route, table and service names in the code.</T>
      </p>

      <ArchExplorer />
    </main>
  );
}
