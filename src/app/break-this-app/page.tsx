import type { Metadata } from "next";
import Link from "next/link";
import BreakThisApp from "@/components/BreakThisApp";
import { T } from "@/lib/lang";

export const metadata: Metadata = {
  title: "Break this app | Hafiz Hamdani",
  description:
    "A tiny coffee shop with six deliberately seeded bugs. Hunt them down, then read the bug report I would file for each one.",
};

const INTRO =
  "This coffee shop ships with six real bugs, seeded on purpose across functional, logic and layout behaviour. Hunt them like a user would. Every bug you trigger unlocks the report I would file for it: steps, expected, actual, severity. Nothing is staged; the bugs are live in the code you are clicking.";

export default function BreakThisAppPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-10">
      <Link href="/" className="text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent">
        <T>Back to home</T>
      </Link>
      <h1 className="mt-6 font-display text-4xl md:text-6xl"><T>Break this app.</T></h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        <T>{INTRO}</T>
      </p>
      <BreakThisApp />
    </main>
  );
}
