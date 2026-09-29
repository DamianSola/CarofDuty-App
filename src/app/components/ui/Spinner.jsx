import { cn } from "../../../lib/cn";

export default function Spinner({ className, label = "Cargando" }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 p-6", className)} role="status">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-divider border-t-primary"
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-muted">{label}</span>
    </div>
  );
}
