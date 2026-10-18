import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
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

const BUGS = [
  {
    id: "BUG-002",
    severity: "Critical",
    summary: "3 of 6 products cannot be added to the cart (problem_user)",
    environment: "saucedemo.com, desktop Chrome 1280x720, account problem_user",
    steps: [
      "Log in as problem_user",
      'On the inventory page, click "Add to cart" on all 6 products',
    ],
    expected: "Every button responds; the cart badge counts up to 6.",
    actual:
      "Only 3 buttons respond (the others call a broken handler). The badge stops at 3 and the affected buttons never switch to Remove.",
    evidence: "/sample-work/qa-problem-inventory.png",
    evidenceAlt:
      "Inventory page as problem_user: 3 items added, 3 buttons unresponsive",
  },
  {
    id: "BUG-004",
    severity: "Critical",
    summary: "Last Name input writes into First Name; checkout is blocked (problem_user)",
    environment: "saucedemo.com, desktop Chrome 1280x720, account problem_user",
    steps: [
      "Log in as problem_user and add any item",
      "Open the cart, click Checkout",
      "Type into First Name, Last Name and Postal Code, then Continue",
    ],
    expected: "Each field keeps its own value; the form advances to the overview.",
    actual:
      'Typing into Last Name overwrites First Name instead ("Dani" became "Hamdani", Last Name stayed empty). Continue fails with "Error: Last Name is required", so checkout cannot be completed at all.',
    evidence: "/sample-work/qa-problem-checkout.png",
    evidenceAlt:
      "Checkout form as problem_user: Last Name text landed in the First Name field",
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

export default function SampleWorkPage() {
  return (
    <main className="px-6 pb-28 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-5xl">
        <Link href="/#sample-work" className="link-underline text-sm text-muted hover:text-ink">
          &larr; Back to sample work
        </Link>

        <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-accent">Sample work</p>
        <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
          Test cases and bug reports, on an app anyone can open.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          My day-job test artifacts are confidential, so this page shows how I plan, execute and
          report testing against{" "}
          <a href="https://www.saucedemo.com/" target="_blank" rel="noreferrer" className="link-underline text-ink">
            SauceDemo
          </a>
          , a public training app that ships defects on purpose. Every result below comes from a
          real execution on 18 October 2026 (desktop Chrome, 1280x720). The same flows pass on the
          standard account, which is the control that makes the failures worth reporting. The full
          24-case set, test plan and exploratory notes live in the{" "}
          <a href="https://github.com/hyderoo/qa-portfolio" target="_blank" rel="noreferrer" className="link-underline text-ink">
            qa-portfolio repo
          </a>
          .
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">11</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Cases executed</p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">7</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Passed</p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">4</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Defects reproduced</p>
          </div>
        </div>

        <h2 className="mt-20 font-display text-2xl md:text-3xl">Execution record</h2>
        <div className="mt-6 overflow-x-auto border border-line">
          <table className="w-full min-w-[880px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-[0.18em] text-muted">
                <th className="px-4 py-3 font-normal">ID</th>
                <th className="px-4 py-3 font-normal">Test case</th>
                <th className="px-4 py-3 font-normal">Expected</th>
                <th className="px-4 py-3 font-normal">Account</th>
                <th className="px-4 py-3 font-normal">Actual</th>
                <th className="px-4 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={`${r.id}-${r.account}`} className={i % 2 ? "bg-surface/40" : ""}>
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted">{r.id}</td>
                  <td className="px-4 py-3 align-top">{r.title}</td>
                  <td className="px-4 py-3 align-top text-muted">{r.expected}</td>
                  <td className="px-4 py-3 align-top font-mono text-xs text-muted">{r.account}</td>
                  <td className="px-4 py-3 align-top text-muted">
                    {r.actual}
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

        <h2 className="mt-20 font-display text-2xl md:text-3xl">Bug reports</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Two of the four reproduced defects, written the way I file them at work. BUG-001 (product
          images identical) and BUG-003 (sorting has no effect) are documented in the repo.
        </p>
        <div className="mt-8 space-y-6">
          {BUGS.map((b) => (
            <article key={b.id} className="border border-line bg-surface/40 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-accent">{b.id}</span>
                <span className="rounded-sm border border-accent/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-accent">
                  {b.severity}
                </span>
                <span className="rounded-sm border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-muted">
                  Bug
                </span>
                <span className="rounded-sm border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-muted">
                  Status: Open
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl md:text-2xl">{b.summary}</h3>
              <p className="mt-2 text-xs text-muted">{b.environment}</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Steps to reproduce</p>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
                    {b.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted">Expected</p>
                  <p className="mt-1 text-sm text-muted">{b.expected}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted">Actual</p>
                  <p className="mt-1 text-sm text-muted">{b.actual}</p>
                </div>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.evidence}
                    alt={b.evidenceAlt}
                    className="w-full border border-line"
                  />
                  <figcaption className="mt-2 text-xs text-muted">
                    Evidence captured during the 18 Oct 2026 execution.
                  </figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>

        <figure className="mt-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sample-work/qa-std-complete.png"
            alt="Order confirmation on the standard account: Thank you for your order!"
            className="w-full max-w-2xl border border-line"
          />
          <figcaption className="mt-2 text-xs text-muted">
            The control: the same checkout flow passes on standard_user.
          </figcaption>
        </figure>

        <p className="mt-12 text-sm text-muted">
          <Link href="/#work" className="link-underline hover:text-ink">
            &larr; Back to selected work
          </Link>
        </p>
      </div>
    </main>
  );
}
