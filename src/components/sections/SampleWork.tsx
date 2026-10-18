import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { FadeUp } from "../Reveal";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SampleWork() {
  return (
    <section id="sample-work" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="05" label="Sample work" title="The paperwork too." />
      <FadeUp>
        <div className="grid gap-10 border border-line bg-surface/40 p-6 md:grid-cols-12 md:p-10">
          <div className="md:col-span-7">
            <p className="max-w-xl leading-relaxed text-muted">
              Case studies show the automation side. This is the manual craft: a test plan,
              test cases and bug reports from a real execution against SauceDemo, a public
              training app, because my day-job artifacts are confidential. 11 cases run, 7
              passed, 4 defects reproduced and filed, all on 18 October 2026.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <Link href="/sample-work" className="link-underline inline-flex items-center gap-1 text-ink">
                See the test cases and bug reports <ArrowIcon />
              </Link>
              <Link href="/quality" className="link-underline inline-flex items-center gap-1 text-ink">
                Quality in numbers: coverage, live API checks, bug changelog <ArrowIcon />
              </Link>
              <a
                href="https://github.com/hyderoo/qa-portfolio"
                target="_blank"
                rel="noreferrer"
                className="link-underline inline-flex items-center gap-1 text-muted hover:text-ink"
              >
                Full set on GitHub <ArrowIcon />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px self-start bg-line md:col-span-5">
            <div className="bg-bg p-5">
              <p className="font-display text-3xl text-accent">11</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">Cases run</p>
            </div>
            <div className="bg-bg p-5">
              <p className="font-display text-3xl text-accent">7</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">Passed</p>
            </div>
            <div className="bg-bg p-5">
              <p className="font-display text-3xl text-accent">4</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">Defects filed</p>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
