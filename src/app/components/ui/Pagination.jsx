"use client";

import { cn } from "../../../lib/cn";
import Button from "./Button";

export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage = 1,
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage) || 1;
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación">
      <ul className="flex flex-wrap justify-center gap-1">
        {pageNumbers.map((number) => (
          <li key={number}>
            <Button
              variant={currentPage === number ? "primary" : "ghost"}
              size="sm"
              onClick={() => paginate(number)}
              aria-current={currentPage === number ? "page" : undefined}
              aria-label={`Página ${number}`}
              className={cn("min-w-10 px-3")}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
