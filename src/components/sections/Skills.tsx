import SectionHeading from "./SectionHeading";
import { FadeUp } from "../Reveal";
import { skillGroups, credentials, education } from "@/lib/data";
import { T, useLang } from "@/lib/lang";

const NOTE =
  "An honest note: my automation experience comes from courses and side projects, not from owning automation in production. Not yet. Closing that gap is the point of everything on this page.";

export default function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="06" label="Toolbox" title="What I test with." />
      <div className="grid gap-14 md:grid-cols-2">
        <div className="copy-glass -m-4 space-y-10 p-4 md:-m-6 md:p-6">
          {skillGroups.map((group, gi) => (
            <FadeUp key={group.title} delay={gi * 0.06}>
              <h3 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-accent"><T>{group.title}</T></h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <li key={s.name} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink/85">
                    {s.icon && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={s.icon} alt="" width={14} height={14} loading="lazy" />
                    )}
                    <T>{s.name}</T>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
          <FadeUp delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              <T>{NOTE}</T>
            </p>
          </FadeUp>
        </div>
        <div className="copy-glass -m-4 p-4 md:-m-6 md:p-6">
          <FadeUp>
            <h3 className="mb-4 text-[11px] uppercase tracking-[0.25em] text-accent"><T>Credentials</T></h3>
            <ul className="hairline-t">
              {credentials.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span className="font-display text-lg"><T>{c.name}</T></span>
                  <span className="text-right text-sm text-muted"><T>{c.detail}</T></span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="mb-4 mt-12 text-[11px] uppercase tracking-[0.25em] text-accent"><T>Education</T></h3>
            <div className="flex items-start gap-4 border border-line p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center">
                {education.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={education.logo}
                    alt={t("{org} logo", { org: t(education.school) })}
                    width={44}
                    height={44}
                    className="max-h-11 w-auto object-contain [filter:drop-shadow(0_0_18px_rgba(242,237,227,0.7))_drop-shadow(0_0_6px_rgba(242,237,227,0.55))]"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm border border-accent/40 font-display text-[10px] tracking-wide text-accent">{education.mono}</span>
                )}
              </span>
              <div>
              <p className="font-display text-xl"><T>{education.school}</T></p>
              <p className="mt-1 text-ink/85"><T>{education.degree}</T></p>
              <p className="mt-2 text-sm text-muted"><T>{education.detail}</T></p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
