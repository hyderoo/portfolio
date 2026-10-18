import { T } from "@/lib/lang";

const items = [
  "Functional Testing",
  "API Testing",
  "Regression",
  "UAT / SIT",
  "Test Planning",
  "Defect Tracking",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
                <span className="font-display text-xl italic text-ink/85 md:text-2xl"><T>{item}</T></span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
