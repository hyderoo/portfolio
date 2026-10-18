import SectionHeading from "./SectionHeading";
import { FadeUp, ClipReveal } from "../Reveal";
import { stats } from "@/lib/data";
import { R, T } from "@/lib/lang";

const P1 =
  "I'm Dani, a QA engineer from Padang, now based in West Jakarta. By day I test Livin' by Mandiri, a mobile banking app millions of people trust with their money, which means the bugs have to meet me before they meet them.";
const P2 =
  "I graduated in computer engineering from Diponegoro University, and I got into QA the honest way: internships, test cases, and a lot of regression cycles. Outside of work I build dashboards and trackers for the things I follow: fires, earthquakes, F1, League of Legends. Shipping my own projects makes me a better tester of other people's.";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="01" label="About" title="Methodical about breaking things." />
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
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
        </div>
        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-px bg-line">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07} className="bg-bg p-6 md:p-8">
                <p className="font-display text-4xl text-accent md:text-5xl"><T>{s.value}</T></p>
                <p className="mt-3 text-sm leading-snug text-muted"><T>{s.label}</T></p>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.15}>
            <div className="mt-10 border border-line p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent"><T>Now</T></p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <R
                    parts={{
                      a: (inner) => (
                        <a href="https://github.com/hyderoo/ctfl-study-notes" target="_blank" rel="noreferrer" className="link-underline text-ink">
                          {inner}
                        </a>
                      ),
                    }}
                  >
                    {"Preparing for the ISTQB CTFL exam, with {a}notes in public{/a}."}
                  </R>
                </li>
                <li><T>Going deeper on Playwright.</T></li>
                <li><T>Learning Japanese, from zero.</T></li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
