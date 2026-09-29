"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  SlidersHorizontal,
  Database,
  CalendarDays,
  Store,
  CalendarPlus,
} from "lucide-react";
import LogoBlanco from "../components/DutyShiftBlanco.png";
import { cn } from "../../lib/cn";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, match: (p) => p === "/admin" },
  { href: "/admin#estadisticas", label: "Estadísticas", icon: BarChart3, match: () => false },
  { href: "/admin#datos", label: "Catálogo", icon: Database, match: () => false },
  { href: "/admin#ajustes", label: "Ajustes", icon: SlidersHorizontal, match: () => false },
  { href: "/admin/turnos", label: "Turnos", icon: CalendarDays, match: (p) => p?.startsWith("/admin/turnos") },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 bg-heading p-4 text-body lg:sticky lg:top-0 lg:h-screen lg:w-64 sm:p-6">
      <div className="mb-6 flex items-center gap-2">
        <Image src={LogoBlanco} alt="" width={44} height={44} />
        <div>
          <p className="text-lg font-bold leading-tight">Car of Duty</p>
          <p className="text-xs text-body/70">Panel de gestión</p>
        </div>
      </div>

      <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col" aria-label="Navegación del panel">
        {links.map((link) => {
          const Icon = link.icon;
          const active = link.match(pathname);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-sm px-3 py-3 transition-colors hover:bg-white/10 lg:py-2",
                active && "bg-white/15"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 hidden border-t border-white/10 pt-4 lg:block">
        <p className="mb-2 text-xs uppercase tracking-wide text-body/60">Sitio público</p>
        <Link href="/products" className="flex items-center gap-2 rounded-sm px-3 py-2 hover:bg-white/10">
          <Store className="h-4 w-4" aria-hidden="true" />
          Tienda
        </Link>
        <Link href="/manage" className="flex items-center gap-2 rounded-sm px-3 py-2 hover:bg-white/10">
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          Nueva reserva
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
