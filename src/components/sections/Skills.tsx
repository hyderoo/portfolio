import SectionHeading from "./SectionHeading";
import { FadeUp } from "../Reveal";
import { skillGroups, credentials, education } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="04" label="Toolbox" title="What I test with." />
      <div className="grid gap-14 md:grid-cols-2">
        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <FadeUp key={group.title} delay={gi * 0.06}>
              <h3 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-accent">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line px-4 py-2 text-sm text-ink/85">
                    {s}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
          <FadeUp delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Honest note: my automation skills come from courses and side
              projects, not production ownership — yet. That&apos;s the gap
              I&apos;m closing on purpose.
            </p>
          </FadeUp>
        </div>
        <div>
          <FadeUp>
            <h3 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-accent">Credentials</h3>
            <ul className="hairline-t">
              {credentials.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span className="font-display text-lg">{c.name}</span>
                  <span className="text-right text-sm text-muted">{c.detail}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="mb-4 mt-12 text-[11px] uppercase tracking-[0.25em] text-accent">Education</h3>
            <div className="border border-line p-6">
              <p className="font-display text-xl">{education.school}</p>
              <p className="mt-1 text-ink/85">{education.degree}</p>
              <p className="mt-2 text-sm text-muted">{education.detail}</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
