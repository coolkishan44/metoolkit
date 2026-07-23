export default function SectionHeading({
  eyebrow,
  title,
  action
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl md:text-3xl italic text-ink dark:text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}
