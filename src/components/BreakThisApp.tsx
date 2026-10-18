"use client";

import { useMemo, useState } from "react";
import { T, useLang } from "@/lib/lang";

type Product = { id: string; name: string; price: number };
type CartLine = { id: string; qty: number };

const PRODUCTS: Product[] = [
  { id: "espresso", name: "Espresso Blend 250g", price: 12.0 },
  { id: "filter", name: "Filter Roast 250g", price: 8.5 },
  { id: "coldbrew", name: "Cold Brew Bottle", price: 15.0 },
  { id: "deluxe", name: "Super Deluxe Cold Brew Reserve With An Absurdly Long Product Name", price: 9.99 },
];

type BugId = "dead-button" | "promo" | "sort" | "whitespace" | "remove" | "overflow";

const BUGS: Record<
  BugId,
  {
    title: string;
    severity: string;
    steps: string[];
    expected: string;
    actual: string;
  }
> = {
  "dead-button": {
    title: '"Add to cart" on Cold Brew Bottle does nothing',
    severity: "Critical",
    steps: ["Open the cart app", 'Click "Add" on Cold Brew Bottle'],
    expected: "The item is added and the cart count increments, like every other product.",
    actual:
      "Nothing happens: no cart change, no feedback. The handler for this one product is a no-op, so the item can never be bought.",
  },
  promo: {
    title: "Promo code WELCOME10 raises the total by 10%",
    severity: "Critical",
    steps: ["Add any item", 'Enter promo code WELCOME10 and apply it'],
    expected: "A 10% discount: the total decreases.",
    actual:
      "The total increases by 10%. The discount sign is inverted; anyone applying the code pays more.",
  },
  sort: {
    title: "Sorting by price orders products as text, not numbers",
    severity: "Major",
    steps: ['Choose "Price: high to low" in the sort control'],
    expected: "Cold Brew Bottle ($15.00) first, then Espresso Blend ($12.00), then the $9.99 and $8.50 items.",
    actual:
      '"$9.99" sorts above "$15.00" because prices are compared as strings. The order looks plausible at a glance and is wrong.',
  },
  whitespace: {
    title: "Checkout accepts a name made only of spaces",
    severity: "Major",
    steps: ["Add an item", "Open checkout", "Type three spaces into the name field", "Place the order"],
    expected: "Required fields reject whitespace-only input.",
    actual:
      'The order is accepted with a name of "   ". The confirmation screen prints an empty customer name.',
  },
  remove: {
    title: "Removing a cart line removes the first line instead",
    severity: "Critical",
    steps: ["Add two different products", 'Click "Remove" on the second line'],
    expected: "The second line disappears.",
    actual:
      "The first line disappears. The removal handler uses index 0 instead of the clicked row.",
  },
  overflow: {
    title: "A long product name breaks the cart layout",
    severity: "Minor",
    steps: ['Add "Super Deluxe Cold Brew Reserve With An Absurdly Long Product Name"'],
    expected: "Long names truncate or wrap; the remove control stays reachable.",
    actual:
      "The name pushes the row past its container and the Remove button can leave the visible area.",
  },
};

const BUG_ORDER: BugId[] = ["dead-button", "promo", "sort", "whitespace", "remove", "overflow"];

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function BreakThisApp() {
  const { t, lang } = useLang();
  const [cart, setCart] = useState<CartLine[]>([]);
  const [sort, setSort] = useState("featured");
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const [name, setName] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [found, setFound] = useState<Set<BugId>>(new Set());
  const [openBug, setOpenBug] = useState<BugId | null>(null);

  function mark(id: BugId) {
    setFound((f) => (f.has(id) ? f : new Set(f).add(id)));
    setOpenBug((o) => o ?? id);
  }

  const sorted = useMemo(() => {
    const list = [...PRODUCTS];
    if (sort === "price-desc") list.sort((a, b) => String(b.price).localeCompare(String(a.price)));
    if (sort === "price-asc") list.sort((a, b) => String(a.price).localeCompare(String(b.price)));
    return list;
  }, [sort]);

  function add(id: string) {
    if (id === "coldbrew") {
      mark("dead-button");
      return; // intentionally a no-op: this is seeded bug 1
    }
    if (id === "deluxe") mark("overflow");
    setCart((c) => {
      const line = c.find((l) => l.id === id);
      return line ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...c, { id, qty: 1 }];
    });
  }

  function removeAt(index: number) {
    if (cart.length >= 2 && index > 0) mark("remove");
    setCart((c) => c.filter((_, i) => i !== 0)); // intentionally wrong index: seeded bug 5
  }

  function changeSort(v: string) {
    setSort(v);
    if (v === "price-desc") {
      const list = [...PRODUCTS].sort((a, b) => String(b.price).localeCompare(String(a.price)));
      if (list[0].id !== "coldbrew") mark("sort");
    }
  }

  function applyPromo() {
    if (promo.trim().toUpperCase() === "WELCOME10") {
      setApplied(true);
      mark("promo");
    }
  }

  const subtotal = cart.reduce((s, l) => s + (PRODUCTS.find((p) => p.id === l.id)?.price ?? 0) * l.qty, 0);
  const total = applied ? subtotal * 1.1 : subtotal; // intentionally inverted discount: seeded bug 2

  function placeOrder() {
    if (name.trim() === "") {
      mark("whitespace");
      setOrdered(true);
      return;
    }
    setOrdered(true);
  }

  const count = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
      <div className="rounded-lg border border-line p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-lg"><T>QA Beans, a very small coffee shop</T></p>
          <select
            aria-label={t("Sort products")}
            value={sort}
            onChange={(e) => changeSort(e.target.value)}
            className="rounded-sm border border-line bg-transparent px-2 py-1 text-sm"
          >
            <option value="featured">{t("Featured")}</option>
            <option value="price-asc">{t("Price: low to high")}</option>
            <option value="price-desc">{t("Price: high to low")}</option>
          </select>
        </div>

        <ul className="mt-5 space-y-3">
          {sorted.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 border-b border-line pb-3">
              <div className="min-w-0">
                <p className="text-sm">{p.name}</p>
                <p className="text-xs text-muted">{money(p.price)}</p>
              </div>
              <button
                onClick={() => add(p.id)}
                className="shrink-0 rounded-full border border-ink/30 px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors hover:border-accent hover:text-accent"
              >
                <T>Add</T>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-md border border-line bg-surface/40 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted"><T vars={{ count }}>{"Cart ({count})"}</T></p>
          {cart.length === 0 && <p className="mt-2 text-sm text-muted"><T>Empty.</T></p>}
          <ul className="mt-2 space-y-2 overflow-hidden">
            {cart.map((l, i) => {
              const p = PRODUCTS.find((x) => x.id === l.id)!;
              return (
                <li key={l.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className="whitespace-nowrap">
                    {p.name} x{l.qty}
                  </span>
                  <button onClick={() => removeAt(i)} className="ml-2 shrink-0 text-xs text-accent hover:underline">
                    <T>Remove</T>
                  </button>
                </li>
              );
            })}
          </ul>
          {cart.length > 0 && (
            <div className="mt-4 border-t border-line pt-3 text-sm">
              <div className="flex justify-between">
                <span><T>Subtotal</T></span>
                <span>{money(subtotal)}</span>
              </div>
              {applied && (
                <div className="flex justify-between text-muted">
                  <span>Promo WELCOME10</span>
                  <span>-10%</span>
                </div>
              )}
              <div className="mt-1 flex justify-between font-semibold">
                <span><T>Total</T></span>
                <span>{money(total)}</span>
              </div>
              {!applied && (
                <div className="mt-3 flex gap-2">
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder={t("Promo code (try WELCOME10)")}
                    aria-label={t("Promo code")}
                    className="min-w-0 flex-1 rounded-sm border border-line bg-transparent px-2 py-1 text-sm"
                  />
                  <button onClick={applyPromo} className="rounded-sm border border-line px-3 py-1 text-xs uppercase tracking-[0.15em] hover:border-accent">
                    <T>Apply</T>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && !ordered && (
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.2em] text-muted" htmlFor="buyer-name">
              <T>Your name</T>
            </label>
            <input
              id="buyer-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full max-w-sm rounded-sm border border-line bg-transparent px-2 py-1.5 text-sm"
            />
            <button
              onClick={placeOrder}
              className="mt-3 rounded-full border border-ink/30 px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent"
            >
              <T>Place order</T>
            </button>
          </div>
        )}
        {ordered && (
          <p className="mt-4 rounded-md border border-emerald-500/40 p-3 text-sm text-emerald-400">
            <T vars={{ name, total: money(total) }}>{"Order placed for “{name}”. Total charged: {total}."}</T>
          </p>
        )}
      </div>

      <aside>
        <div className="rounded-lg border border-line p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted"><T>Your hunt</T></p>
          <p className="mt-2 font-display text-3xl">
            {lang === "ja" ? (
              <span className="text-lg text-muted">
                <T vars={{ n: found.size }}>{"{n} of 6 bugs found"}</T>
              </span>
            ) : (
              <>
                {found.size} <span className="text-lg text-muted">of 6 bugs found</span>
              </>
            )}
          </p>
          <ul className="mt-4 space-y-2">
            {BUG_ORDER.map((id, i) => {
              const isFound = found.has(id);
              return (
                <li key={id}>
                  <button
                    onClick={() => isFound && setOpenBug(openBug === id ? null : id)}
                    disabled={!isFound}
                    className={`flex w-full items-center gap-2 rounded-sm border px-3 py-2 text-left text-sm transition-colors ${
                      isFound ? "border-accent/50 text-ink hover:bg-surface/60" : "border-line text-muted"
                    }`}
                  >
                    <span className="font-mono text-xs">{`#${i + 1}`}</span>
                    {isFound ? <T>{BUGS[id].title}</T> : <T>Not found yet</T>}
                  </button>
                </li>
              );
            })}
          </ul>
          {found.size === 6 && (
            <p className="mt-4 rounded-md border border-emerald-500/40 p-3 text-sm text-emerald-400">
              <T>Full sweep. This is what I do for a living.</T>
            </p>
          )}
        </div>

        {openBug && found.has(openBug) && (
          <article className="mt-4 rounded-lg border border-accent/40 bg-surface/40 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-accent">{openBug.toUpperCase()}</span>
              <span className="rounded-sm border border-accent/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-accent">
                <T>{BUGS[openBug].severity}</T>
              </span>
            </div>
            <h3 className="mt-2 text-base font-semibold"><T>{BUGS[openBug].title}</T></h3>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted"><T>How you found it</T></p>
            <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm text-ink/90">
              {BUGS[openBug].steps.map((s) => (
                <li key={s}><T>{s}</T></li>
              ))}
            </ol>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted"><T>Expected</T></p>
            <p className="mt-1 text-sm text-muted"><T>{BUGS[openBug].expected}</T></p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted"><T>Actual</T></p>
            <p className="mt-1 text-sm text-muted"><T>{BUGS[openBug].actual}</T></p>
          </article>
        )}
      </aside>
    </div>
  );
}
