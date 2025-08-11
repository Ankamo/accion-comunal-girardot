'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const router = useRouter();

  // Estilo para los botones destacados
  const btnDestacado = "px-4 py-1 rounded-md font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 transition";

  const navLinks = [
    { href: "/", text: "Inicio" },
    { href: "/sobre-nosotros", text: "Sobre nosotros" },
    { href: "/noticias", text: "Noticias y Comunicados" },
    { href: "/comisiones", text: "Comisiones de Trabajo" },
    { href: "/servicios", text: "Servicios y Trámites" },
    { href: "/eventos", text: "Eventos y Actividades" },
    { href: "/contacto", text: "Contacto" },
  ];

  const handleLinkClick = (href: string) => {
    setMenuAbierto(false);
    router.push(href);
  };

  return (
    <nav className="w-full bg-white dark:bg-[#23232a] border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          {/* Logo o título */}
          <div className="text-[#19295A] dark:text-white font-bold text-lg cursor-pointer">
            <Link href="/" onClick={() => setMenuAbierto(false)}>
              JAC Rosa Blanca
            </Link>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex space-x-8 text-sm items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href!}
                className="font-semibold hover:text-blue-700 dark:hover:text-blue-300"
                onClick={() => handleLinkClick(link.href!)}
              >
                {link.text}
              </a>
            ))}

            {/* Botones destacados */}
            <Link href="/afiliate" className={btnDestacado}>
              Afíliate / Inscríbete
            </Link>
            <Link href="/panel" className={`${btnDestacado} bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600`}>
              Panel de Afiliados
            </Link>
          </div>

          {/* Botón hamburguesa (visible solo en móviles) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir menú de navegación"
              aria-expanded={menuAbierto}
              className="text-[#19295A] dark:text-white focus:outline-none text-2xl"
            >
              {menuAbierto ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <div className="md:hidden px-4 pb-6 text-sm space-y-2 bg-white dark:bg-[#23232a] border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href!}
              className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300"
              onClick={() => handleLinkClick(link.href!)}
            >
              {link.text}
            </a>
          ))}

          <Link href="/afiliate" className={`${btnDestacado} block text-center`} onClick={() => setMenuAbierto(false)}>
            Afíliate / Inscríbete
          </Link>
          <Link href="/panel" className={`${btnDestacado} bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 block text-center`} onClick={() => setMenuAbierto(false)}>
            Panel de Afiliados
          </Link>
        </div>
      )}
    </nav>
  );
}
