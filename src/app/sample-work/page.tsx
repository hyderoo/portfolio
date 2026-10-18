import type { Metadata } from "next";
import Link from "next/link";
import BugPlayground from "@/components/BugPlayground";
import { SampleWorkIntro } from "@/components/I18nBlocks";
import { T, TImg } from "@/lib/lang";

export const metadata: Metadata = {
  alternates: { canonical: "/sample-work" },
  openGraph: {
    title: "Sample work: test cases and bug reports | Hafiz Hamdani",
    description: "A manual QA sample: real test cases and reproduced bug reports from a live execution against the public SauceDemo training app.",
    url: "/sample-work",
  },
  title: "Sample work: test cases and bug reports | Hafiz Hamdani",
  description:
    "A manual QA sample: real test cases and reproduced bug reports from a live execution against the public SauceDemo training app.",
};

type Row = {
  id: string;
  title: string;
  expected: string;
  account: string;
  actual: string;
  status: "PASS" | "FAIL";
  bug?: string;
};

const ROWS: Row[] = [
  {
    id: "TC-LOG-001",
    title: "Login with valid credentials",
    expected: "Redirected to /inventory.html, 6 products shown",
    account: "standard_user",
    actual: "On /inventory.html, 6 products shown",
    status: "PASS",
  },
  {
    id: "TC-LOG-002",
    title: "Locked-out account is rejected",
    expected: "Stays on login page with a locked-out error",
    account: "locked_out_user",
    actual: 'Error shown: "Epic sadface: Sorry, this user has been locked out."',
    status: "PASS",
  },
  {
    id: "TC-INV-002",
    title: "Product images are distinct and load",
    expected: "Each product shows its own, non-broken image",
    account: "standard_user",
    actual: "6 distinct images",
    status: "PASS",
  },
  {
    id: "TC-INV-003",
    title: "Sort by price, high to low",
    expected: "Most expensive product first ($49.99)",
    account: "standard_user",
    actual: "$49.99 first",
    status: "PASS",
  },
  {
    id: "TC-CART-001",
    title: "Add all products to cart",
    expected: "Cart badge shows 6, buttons switch to Remove",
    account: "standard_user",
    actual: "Badge 6",
    status: "PASS",
  },
  {
    id: "TC-CHK-001",
    title: "Checkout information accepts valid input",
    expected: "Fields keep their values, advance to the overview",
    account: "standard_user",
    actual: 'Values kept ("Dani" / "Hamdani"), on the overview page',
    status: "PASS",
  },
  {
    id: "TC-CHK-004",
    title: "Finish order",
    expected: "Order confirmation shown",
    account: "standard_user",
    actual: 'Confirmation shown: "Thank you for your order!"',
    status: "PASS",
  },
  {
    id: "TC-INV-002",
    title: "Product images are distinct and load",
    expected: "Each product shows its own, non-broken image",
    account: "problem_user",
    actual: "All 6 products render the same placeholder image",
    status: "FAIL",
    bug: "BUG-001",
  },
  {
    id: "TC-CART-001",
    title: "Add all products to cart",
    expected: "Cart badge shows 6, buttons switch to Remove",
    account: "problem_user",
    actual: "Badge stops at 3; 3 of 6 buttons never respond",
    status: "FAIL",
    bug: "BUG-002",
  },
  {
    id: "TC-INV-003",
    title: "Sort by price, high to low",
    expected: "Most expensive product first ($49.99)",
    account: "problem_user",
    actual: "Order unchanged, first price still $29.99",
    status: "FAIL",
    bug: "BUG-003",
  },
  {
    id: "TC-CHK-001",
    title: "Checkout information accepts valid input",
    expected: "Fields keep their values, advance to the overview",
    account: "problem_user",
    actual:
      'Last Name input writes into First Name; blocked with "Error: Last Name is required"',
    status: "FAIL",
    bug: "BUG-004",
  },
];



function Status({ s }: { s: "PASS" | "FAIL" }) {
  return (
    <span
      className={`inline-block rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${
        s === "PASS"
          ? "border-emerald-500/40 text-emerald-400"
          : "border-accent/60 text-accent"
      }`}
    >
      {s}
    </span>
  );
}

const BUGS =
  "All four reproduced defects, written the way I file them at work: severity, priority, environment, exact steps, expected vs actual, evidence. Pick a ticket to open it.";

export default function SampleWorkPage() {
  return (
    <main className="px-6 pb-28 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <Link href="/#sample-work" className="link-underline text-sm text-muted hover:text-ink">
          <T>{"← Back to sample work"}</T>
        </Link>

        <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-accent"><T>Sample work</T></p>
        <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
          <T>Test cases and bug reports, on an app anyone can open.</T>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          <SampleWorkIntro />
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">11</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted"><T>Cases executed</T></p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">7</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted"><T>Passed</T></p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">4</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted"><T>Defects reproduced</T></p>
          </div>
        </div>

        <h2 className="mt-20 font-display text-2xl md:text-3xl"><T>Execution record</T></h2>
        <div className="mt-6 overflow-x-auto border border-line">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.18em] text-muted">
                <th className="px-4 py-3 font-normal">ID</th>
                <th className="px-4 py-3 font-normal"><T>Test case</T></th>
                <th className="px-4 py-3 font-normal"><T>Expected</T></th>
                <th className="px-4 py-3 font-normal"><T>Account</T></th>
                <th className="px-4 py-3 font-normal"><T>Actual</T></th>
                <th className="px-4 py-3 font-normal"><T>Status</T></th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={`${r.id}-${r.account}`} className={i % 2 ? "bg-surface/40" : ""}>
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted">{r.id}</td>
                  <td className="px-4 py-3 align-top"><T>{r.title}</T></td>
                  <td className="px-4 py-3 align-top text-muted"><T>{r.expected}</T></td>
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted">{r.account}</td>
                  <td className="px-4 py-3 align-top text-muted">
                    <T>{r.actual}</T>
                    {r.bug && (
                      <span className="ml-2 font-mono text-xs text-accent">{r.bug}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Status s={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-20 font-display text-2xl md:text-3xl"><T>Bug reports, filed like tickets</T></h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          <T>{BUGS}</T>
        </p>
        <BugPlayground />

        <figure className="mt-12">
          <TImg
            src="/sample-work/qa-std-complete.png"
            alt="Order confirmation on the standard account: Thank you for your order!"
            className="w-full max-w-2xl border border-line"
          />
          <figcaption className="mt-2 text-xs text-muted">
            <T>The control: the same checkout flow passes on standard_user.</T>
          </figcaption>
        </figure>

        <p className="mt-12 text-sm text-muted">
          <Link href="/#work" className="link-underline hover:text-ink">
            <T>{"← Back to selected work"}</T>
          </Link>
          <span className="mx-3 text-line">·</span>
          <Link href="/break-this-app" className="link-underline hover:text-ink">
            <T>{"Try it yourself: break this app →"}</T>
          </Link>
        </p>
      </div>
    </main>
  );
}
