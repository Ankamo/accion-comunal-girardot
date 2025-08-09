'use client';

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-[#23232a] border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center h-12">
          {/* Logo o título */}
          <div className="text-[#19295A] dark:text-white font-bold text-lg"></div>

          {/* Menú desktop */}
          <div className="hidden md:flex space-x-8 text-sm items-center">
            <Link href="/cartelera" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Cartelera
            </Link>
            <Link href="/eventos" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Eventos
            </Link>
            <Link href="/proyectos" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Proyectos
            </Link>
            <Link href="/ingresar" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Ingresar
            </Link>
          </div>

          {/* Botón hamburguesa (visible solo en móviles) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="text-[#19295A] dark:text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              {menuAbierto ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <div className="md:hidden px-4 pb-4 text-sm space-y-2">
          <Link href="/" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300">
            Inicio
          </Link>
          <Link href="/proyectos" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300">
            Proyectos
          </Link>
          <Link href="/ingresar" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300">
            Ingresar
          </Link>
        </div>
      )}
    </nav>
  );
}
