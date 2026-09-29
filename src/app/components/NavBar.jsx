"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LogoBlanco from "./DutyShiftBlanco.png";
import IconButton from "./ui/IconButton";
import { cn } from "../../lib/cn";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Tienda" },
  { href: "/manage", label: "Reservar" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 w-full bg-heading shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-2 text-body">
          <Image src={LogoBlanco} alt="Logo Car of Duty" width={48} height={48} />
          <span className="text-lg font-bold">Car of Duty</span>
        </a>

        <div className="hidden items-center gap-7 text-body md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "border-b py-1 transition-colors hover:border-divider",
                pathname === link.href ? "border-divider" : "border-transparent"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <IconButton
          label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="menu-movil"
          className="text-body hover:bg-white/10 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </IconButton>
      </div>

      {isOpen ? (
        <div id="menu-movil" className="flex flex-col gap-1 bg-primary-hover px-4 py-3 text-body md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="rounded-sm px-3 py-3 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
