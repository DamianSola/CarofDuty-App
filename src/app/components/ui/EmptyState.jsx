import { cn } from "../../../lib/cn";

export default function EmptyState({ title, description, className, children }) {
  return (
    <div className={cn("rounded-sm border border-dashed border-divider bg-body/60 px-4 py-8 text-center", className)}>
      {title ? <p className="font-semibold text-heading">{title}</p> : null}
      {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      {children}
    </div>
  );
}
