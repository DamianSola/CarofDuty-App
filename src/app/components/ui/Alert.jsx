import { cn } from "../../../lib/cn";

const variants = {
  info: "border-border bg-body text-ink",
  success: "border-success/30 bg-success/10 text-success",
  danger: "border-danger/30 bg-danger/10 text-danger",
  warning: "border-warning/30 bg-warning/10 text-warning",
};

export default function Alert({ children, variant = "info", className, role = "status" }) {
  return (
    <div
      role={role}
      className={cn("rounded-sm border px-4 py-3 text-sm", variants[variant], className)}
    >
      {children}
    </div>
  );
}
