import SectionHeading from "./SectionHeading";
import { FadeUp, ClipReveal } from "../Reveal";
import { T } from "@/lib/lang";

const P1 =
  "Smart contracts move real money and cannot be quietly patched after deploy. That is exactly the kind of software I already test for a living, so Web3 is where I am pointing next.";
const P2 =
  "I have no Web3 experience yet, and I would rather say that out loud. This section is the plan in public: four steps, each one ending in something checkable on GitHub. The roadmap started 23 October 2026.";
const NOTE =
  "Honest note: nothing in this section is experience or a claim of skill. It is a dated plan with placeholders, posted so future commits have somewhere to land.";

type Step = {
  n: string;
  title: string;
  body: string;
  status: "Starting" | "Planned" | "Placeholder";
};

const steps: Step[] = [
  {
    n: "1",
    title: "Foundations",
    body: "How Ethereum and the EVM actually work: accounts, keys, wallets, gas, transactions. Docs first, then tiny scripts that read a real chain.",
    status: "Starting",
  },
  {
    n: "2",
    title: "Write and test contracts",
    body: "Small contracts in Solidity with Foundry: unit tests, fuzz tests, invariant tests. The test suite matters more than the contract.",
    status: "Planned",
  },
  {
    n: "3",
    title: "Break contracts on purpose",
    body: "The classic failure modes, learned by exploiting them in CTFs like Ethernaut: reentrancy, bad access control, oracle manipulation. A writeup for every level.",
    status: "Planned",
  },
  {
    n: "4",
    title: "First public project",
    body: "Placeholder. This slot stays empty until there is a real, fully tested contract with CI on GitHub to put here.",
    status: "Placeholder",
  },
];

function StatusTag({ status }: { status: Step["status"] }) {
  const style =
    status === "Starting"
      ? "border-accent/60 text-accent"
      : status === "Placeholder"
        ? "border-dashed border-line text-muted"
        : "border-line text-muted";
  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${style}`}
    >
      <T>{status}</T>
    </span>
  );
}

export default function Web3() {
  return (
    <section id="web3" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="07" label="Learning in public" title="Where I'm headed: Web3." />
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <ClipReveal>
            <p className="max-w-xl text-lg leading-relaxed text-ink/90 md:text-xl">
              <T>{P1}</T>
            </p>
          </ClipReveal>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              <T>{P2}</T>
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-10 max-w-md border border-line p-6 text-sm leading-relaxed text-muted">
              <T>{NOTE}</T>
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-7">
          <ol className="hairline-t">
            {steps.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.06}>
                <li
                  className={`flex items-start gap-6 border-b border-line py-6 ${
                    s.status === "Placeholder" ? "opacity-75" : ""
                  }`}
                >
                  <span className="w-8 shrink-0 pt-1 font-display text-2xl text-accent">{s.n}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-xl"><T>{s.title}</T></h3>
                      <StatusTag status={s.status} />
                    </div>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                      <T>{s.body}</T>
                    </p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
