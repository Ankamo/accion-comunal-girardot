'use client';

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estilo para los botones destacados
  const btnDestacado = "px-4 py-1 rounded-md font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 transition";

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
            <Link href="/" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Inicio
            </Link>

            <div className="relative group">
              <button
                type="button"
                className="font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                La OAC
                <svg className="w-3 h-3 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Submenú */}
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#23232a] border border-gray-200 dark:border-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10 min-w-[180px]">
                <Link href="/quienes-somos" className="block px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-blue-700" onClick={() => setMenuAbierto(false)}>
                  Quiénes somos
                </Link>
                <Link href="/historia" className="block px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-blue-700" onClick={() => setMenuAbierto(false)}>
                  Historia
                </Link>
                <Link href="/mision" className="block px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-blue-700" onClick={() => setMenuAbierto(false)}>
                  Misión
                </Link>
                <Link href="/vision" className="block px-4 py-2 text-sm hover:bg-blue-100 dark:hover:bg-blue-700" onClick={() => setMenuAbierto(false)}>
                  Visión
                </Link>
              </div>
            </div>

            <Link href="/noticias" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Noticias y Comunicados
            </Link>
            <Link href="/comisiones" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Comisiones de Trabajo
            </Link>
            <Link href="/servicios" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Servicios y Trámites
            </Link>
            <Link href="/eventos" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Eventos y Actividades
            </Link>
            <Link href="/contacto" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Contacto
            </Link>

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
              aria-label="Abrir menú"
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
          <Link href="/" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
            Inicio
          </Link>

          <details className="group">
            <summary className="cursor-pointer font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              La OAC
            </summary>
            <div className="pl-4 mt-1 space-y-1">
              <Link href="/quienes-somos" className="block hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
                Quiénes somos
              </Link>
              <Link href="/historia" className="block hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
                Historia
              </Link>
              <Link href="/mision" className="block hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
                Misión
              </Link>
              <Link href="/vision" className="block hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
                Visión
              </Link>
            </div>
          </details>

          <Link href="/noticias" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
            Noticias y Comunicados
          </Link>
          <Link href="/comisiones" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
            Comisiones de Trabajo
          </Link>
          <Link href="/servicios" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
            Servicios y Trámites
          </Link>
          <Link href="/eventos" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
            Eventos y Actividades
          </Link>
          <Link href="/contacto" className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300" onClick={() => setMenuAbierto(false)}>
            Contacto
          </Link>

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
