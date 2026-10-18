import SectionHeading from "./SectionHeading";
import { FadeUp } from "../Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="02" label="Experience" title="Where I've tested." />
      <div className="hairline-t">
        {experience.map((job, i) => (
          <FadeUp key={job.role} delay={i * 0.05}>
            <article className="group grid gap-4 border-b border-line py-10 transition-colors duration-500 hover:bg-surface md:grid-cols-12 md:gap-8 md:px-4">
              <p className="text-sm text-muted md:col-span-2">{job.period}</p>
              <div className="flex items-start gap-4 md:col-span-4">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-accent/40 font-display text-xs tracking-wide text-accent">
                  {job.mono}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight md:text-3xl">{job.role}</h3>
                  <p className="mt-2 text-sm text-accent">{job.org}</p>
                </div>
              </div>
              <div className="md:col-span-6">
                <p className="max-w-xl leading-relaxed text-muted">{job.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
