import SectionHeading from "./SectionHeading";
import { FadeUp, ClipReveal } from "../Reveal";
import { stats } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="01" label="About" title="Methodical about breaking things." />
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <ClipReveal>
            <p className="max-w-xl text-lg leading-relaxed text-ink/90 md:text-xl">
              I&apos;m Dani — a QA engineer from Padang, now based in West
              Jakarta. By day I test Livin&apos; by Mandiri, a mobile banking
              app millions of people trust with their money, which means the
              bugs have to meet me before they meet them.
            </p>
          </ClipReveal>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              I graduated in computer engineering from Diponegoro University,
              and I got into QA the honest way: internships, test cases, and a
              lot of regression cycles. Outside of work I build dashboards and
              trackers for the things I follow — fires, earthquakes, F1,
              League of Legends — because shipping my own projects makes me a
              better tester of other people&apos;s.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-px bg-line">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07} className="bg-bg p-6 md:p-8">
                <p className="font-display text-4xl text-accent md:text-5xl">{s.value}</p>
                <p className="mt-3 text-sm leading-snug text-muted">{s.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
