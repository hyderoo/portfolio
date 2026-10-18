import { SplitChars } from "../Reveal";
import { T, useLang } from "@/lib/lang";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  const { t } = useLang();
  return (
    <div className="mb-12 md:mb-20">
      <div className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        <span><T>{label}</T></span>
      </div>
      <SplitChars as="h2" text={t(title)} className="font-display display-2 block" />
    </div>
  );
}
