"use client";

import { useState } from "react";

type Ticket = {
  id: string;
  summary: string;
  severity: "Critical" | "Major";
  priority: "High" | "Medium";
  account: string;
  found: string;
  steps: string[];
  expected: string;
  actual: string;
  evidence?: { src: string; alt: string; caption: string };
  notes?: string;
  related: string[];
};

const TICKETS: Ticket[] = [
  {
    id: "BUG-001",
    summary: "All product images render as the same placeholder image",
    severity: "Major",
    priority: "Medium",
    account: "problem_user (passes on standard_user)",
    found: "18 Oct 2026, exploratory session; reproduced 2/2 times",
    steps: ["Log in as problem_user / secret_sauce.", "Observe the product images on /inventory.html."],
    expected:
      "Each product shows its own image (standard_user shows 6 distinct images: backpack, bike light, t-shirt, jacket, onesie, red t-shirt).",
    actual:
      "All 6 product images are byte-identical placeholder images (1 distinct src across all 6, confirmed in the DOM). The placeholder loads without error, so no broken-image indicator appears.",
    evidence: {
      src: "/sample-work/qa-problem-images.png",
      alt: "Inventory page as problem_user: every product shows the same dog placeholder photo",
      caption: "Inventory as problem_user: one placeholder image for every product.",
    },
    notes:
      "The image src itself is wrong (a 404-named asset), not a loading failure. Would mislead any visual check of product content.",
    related: ["TC-INV-002"],
  },
  {
    id: "BUG-002",
    summary: "Half the catalog cannot be added to the cart",
    severity: "Critical",
    priority: "High",
    account: "problem_user (passes on standard_user)",
    found: "18 Oct 2026; reproduced 2/2 times, including after Reset App State",
    steps: ["Log in as problem_user.", 'Click "Add to cart" on each of the 6 products, one at a time.'],
    expected:
      'Every click adds the item: the cart badge increments and the button switches to "Remove" (verified on standard_user, where all 6 work).',
    actual:
      'Bolt T-Shirt, Fleece Jacket and Test.allTheThings() T-Shirt (Red) do nothing: the badge stays, the button keeps saying "Add to cart", and the item never reaches the cart. The other 3 add correctly (badge reaches 3).',
    evidence: {
      src: "/sample-work/qa-problem-inventory.png",
      alt: "Inventory page as problem_user: 3 items added, 3 buttons unresponsive",
      caption: "Badge stuck at 3 while the 4th product is clicked.",
    },
    related: ["TC-INV-003"],
  },
  {
    id: "BUG-003",
    summary: "Product sorting has no effect",
    severity: "Major",
    priority: "Medium",
    account: "problem_user (passes on standard_user)",
    found: "18 Oct 2026; reproduced for all 4 sort options, each from a fresh page load",
    steps: [
      "Log in as problem_user.",
      "Select each option of the sort dropdown in turn: Name (Z to A), Price (low to high), Price (high to low).",
    ],
    expected:
      'Order changes per selection. Reference on standard_user, verified same day: Price (high to low) puts the $49.99 Fleece Jacket first, Price (low to high) the $7.99 Onesie, Name (Z to A) "Test.allTheThings() T-Shirt (Red)".',
    actual:
      'Every option leaves the list in the default order (first product "Sauce Labs Backpack", $29.99). Measured on fresh page loads per option to rule out UI-state artifacts.',
    notes:
      "Measured: Name (A to Z) correct; Name (Z to A), Price (low to high) and Price (high to low) all wrong. No screenshot attached: nothing visually changes, which is the bug.",
    related: ["TC-INV-003", "TC-INV-004", "TC-INV-005"],
  },
  {
    id: "BUG-004",
    summary: "Checkout: Last Name input writes into First Name; checkout blocked",
    severity: "Critical",
    priority: "High",
    account: "problem_user (passes on standard_user)",
    found: "18 Oct 2026; reproduced 2/2 times",
    steps: [
      "Log in as problem_user, add a working item (e.g. Backpack) to the cart.",
      "Cart, then Checkout.",
      "Type Dani into First Name, Hamdani into Last Name, 11730 into Zip/Postal Code.",
      "Click Continue.",
    ],
    expected:
      'Each field holds its own value and the form advances to the overview (on standard_user the same input completes checkout with "Thank you for your order!").',
    actual:
      'First Name now contains "Hamdani" (overwriting "Dani"), Last Name is empty, and submission fails with "Error: Last Name is required". Checkout cannot be completed.',
    evidence: {
      src: "/sample-work/qa-problem-checkout.png",
      alt: "Checkout form as problem_user: Last Name text landed in the First Name field",
      caption: 'First Name holds "Hamdani"; Last Name is empty; the error blocks checkout.',
    },
    related: ["TC-CHK-001"],
  },
];

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "accent" | "green" }) {
  const cls =
    tone === "accent"
      ? "border-accent/60 text-accent"
      : tone === "green"
        ? "border-emerald-500/40 text-emerald-400"
        : "border-line text-muted";
  return (
    <span className={`rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${cls}`}>{children}</span>
  );
}

export default function BugPlayground() {
  const [openId, setOpenId] = useState<string>("BUG-002");
  const open = TICKETS.find((t) => t.id === openId) ?? TICKETS[0];

  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-lg border border-line">
        {TICKETS.map((t) => (
          <button
            key={t.id}
            onClick={() => setOpenId(t.id)}
            className={`flex w-full flex-wrap items-center gap-3 border-b border-line px-4 py-3 text-left transition-colors last:border-b-0 ${
              openId === t.id ? "bg-surface/70" : "hover:bg-surface/30"
            }`}
            aria-pressed={openId === t.id}
          >
            <span className="font-mono text-xs text-accent">{t.id}</span>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{t.summary}</span>
            <Pill tone={t.severity === "Critical" ? "accent" : "neutral"}>{t.severity}</Pill>
            <Pill>{t.priority}</Pill>
            <Pill>Open</Pill>
          </button>
        ))}
      </div>

      <article key={open.id} className="mt-6 rounded-lg border border-line bg-surface/40">
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-5 py-3 text-xs text-muted">
          <span className="font-mono">SAUCEDEMO-QA</span>
          <span>/</span>
          <span className="font-mono text-ink">{open.id}</span>
          <span className="ml-auto flex gap-2">
            <Pill>Bug</Pill>
            <Pill tone="green">Reproduced</Pill>
          </span>
        </div>
        <div className="grid gap-8 p-5 md:grid-cols-[1fr_240px] md:p-8">
          <div>
            <h3 className="font-display text-xl md:text-2xl">{open.summary}</h3>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted">Steps to reproduce</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink/90">
              {open.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted">Expected</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{open.expected}</p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted">Actual</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{open.actual}</p>
            {open.notes && (
              <>
                <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted">Notes</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{open.notes}</p>
              </>
            )}
            {open.evidence && (
              <figure className="mt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={open.evidence.src} alt={open.evidence.alt} className="w-full max-w-xl border border-line" />
                <figcaption className="mt-2 text-xs text-muted">{open.evidence.caption}</figcaption>
              </figure>
            )}
          </div>
          <aside className="space-y-4 border-t border-line pt-5 text-sm md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Severity</p>
              <p className="mt-1">{open.severity}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Priority</p>
              <p className="mt-1">{open.priority}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Environment</p>
              <p className="mt-1">SauceDemo, desktop Chrome, 1280x720</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Account</p>
              <p className="mt-1 font-mono text-xs">{open.account}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Found</p>
              <p className="mt-1 text-muted">{open.found}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Related test cases</p>
              <p className="mt-1 font-mono text-xs">{open.related.join(", ")}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Status</p>
              <p className="mt-1">Open (training app; not filed upstream)</p>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
