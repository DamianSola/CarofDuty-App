import { cn } from "../../../lib/cn";

export default function Label({ htmlFor, required, children, className }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-2 block text-left font-medium text-heading", className)}
    >
      {children}
      {required ? (
        <span className="ml-1 text-danger" aria-hidden="true">
          *
        </span>
      ) : null}
      {required ? <span className="sr-only"> (obligatorio)</span> : null}
    </label>
  );
}
