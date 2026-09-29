import { cn } from "../../../lib/cn";

const STEPS = [
  { n: 1, label: "Auto" },
  { n: 2, label: "Servicios" },
  { n: 3, label: "Datos" },
  { n: 4, label: "Fecha" },
];

export default function ProgressSteps({ current = 1 }) {
  const active = Math.min(Math.max(current, 0), 5);

  return (
    <ol className="mb-6 flex w-full items-center gap-1 sm:gap-2" aria-label="Progreso de reserva">
      {STEPS.map((step, i) => {
        const done = active > step.n || active === 5;
        const isCurrent = active === step.n;
        return (
          <li key={step.n} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
            <div className="flex min-w-0 flex-col items-center sm:flex-row sm:gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  done || isCurrent
                    ? "bg-primary text-body"
                    : "bg-border text-muted"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {step.n}
              </span>
              <span className="hidden truncate text-xs font-medium text-heading sm:inline">
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <span
                className={cn(
                  "h-0.5 flex-1 rounded-full",
                  active > step.n ? "bg-primary" : "bg-border"
                )}
                aria-hidden="true"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
