export function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-0.5 w-6 shrink-0 bg-green" />
      <span className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-green">
        {label}
      </span>
    </div>
  );
}
