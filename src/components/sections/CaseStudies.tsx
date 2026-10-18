import SectionHeading from "./SectionHeading";
import { FadeUp } from "../Reveal";
import { caseStudies } from "@/lib/data";
import TestStatus from "../TestStatus";
import { T } from "@/lib/lang";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStudies() {
  return (
    <section id="practice" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="04" label="QA in practice" title="How I actually test." />
      <div className="space-y-6">
        {caseStudies.map((cs, i) => (
          <FadeUp key={cs.title} delay={Math.min(i * 0.05, 0.15)}>
            <article className="grid gap-8 border border-line bg-surface/40 p-6 transition-colors duration-500 hover:border-accent/40 md:grid-cols-12 md:p-10">
              <div className="md:col-span-4">
                <span className="font-display text-5xl italic text-accent/80">{cs.index}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl"><T>{cs.title}</T></h3>
                <p className="mt-4 text-sm leading-relaxed text-muted"><T>{cs.context}</T></p>
                {cs.ci && <TestStatus repo={cs.ci.repo} workflow={cs.ci.workflow} />}
              </div>
              <div className="md:col-span-6">
                <ul className="space-y-3">
                  {cs.approach.map((step, si) => (
                    <li key={si} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <T>{step}</T>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-l-2 border-accent/60 pl-4 text-sm italic leading-relaxed text-muted">
                  <T>{cs.takeaway}</T>
                </p>
              </div>
              <div className="flex flex-row gap-5 md:col-span-2 md:flex-col md:items-end md:justify-start">
                {cs.arch && (
                  <a href={cs.arch} className="link-underline inline-flex items-center gap-1 text-accent">
                    <T>Architecture</T>
                  </a>
                )}
                {cs.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-sm text-ink"
                  >
                    <T>{l.label}</T> <ArrowIcon />
                  </a>
                ))}
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
