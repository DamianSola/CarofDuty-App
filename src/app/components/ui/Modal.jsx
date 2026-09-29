"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../../lib/cn";
import IconButton from "./IconButton";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  labelledBy,
}) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    lastFocus.current = document.activeElement;
    const node = dialogRef.current;
    const focusable = node?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(
        node.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Cerrar diálogo"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy || titleId}
        className={cn(
          "relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-lg bg-surface p-5 shadow-lg sm:rounded-lg sm:p-6",
          className
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          {title ? (
            <h2 id={titleId} className="text-xl font-semibold text-heading">
              {title}
            </h2>
          ) : (
            <span id={titleId} className="sr-only">
              Diálogo
            </span>
          )}
          <IconButton label="Cerrar" onClick={onClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
