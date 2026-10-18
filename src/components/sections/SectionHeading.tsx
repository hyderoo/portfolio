import { SplitChars } from "../Reveal";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-12 md:mb-20">
      <div className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        <span>{label}</span>
      </div>
      <SplitChars as="h2" text={title} className="font-display display-2 block" />
    </div>
  );
}
