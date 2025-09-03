'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

// Recursive types for multi-level navigation
interface NavLink {
  href: string;
  text: string;
  dropdown?: undefined;
}

interface NavDropdown {
  text: string;
  href?: string; // Allow dropdowns to also be links
  dropdown: (NavLink | NavDropdown)[];
}

type NavItem = NavLink | NavDropdown;

export default function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  // Using an array to track active dropdowns based on clicks
  const [activeDropdown, setActiveDropdown] = useState<string[]>([]);
  const router = useRouter();

  const btnDestacado = "px-4 py-1 rounded-md font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 transition";

  const handleLinkClick = (href: string) => {
    setMenuAbierto(false);
    setActiveDropdown([]);
    router.push(href);
  };

  const navLinks: NavItem[] = [
    { href: "/", text: "Inicio" },
    {
      text: "Presidencia",
      href: "/presidencia",
      dropdown: [
        { href: "/presidencia/proyectos", text: "Proyectos" },
        { href: "/presidencia/plan-desarrollo", text: "Plan de desarrollo 2022-2026" },
        {
          text: "Citación a",
          dropdown: [
            { href: "/presidencia/citacion/asamblea-general", text: "Asamblea General de Afiliados" },
            { href: "/presidencia/citacion/reunion-directivos", text: "Reunión de Directivos y Dignatarios" },
            { href: "/presidencia/citacion/asamblea-residentes", text: "Asamblea de Residentes" },
          ]
        },
        {
          text: "Actos Administrativos",
          dropdown: [
            { href: "/presidencia/actos/ordenacion-gasto", text: "Ordenacion del Gasto" },
            { href: "/presidencia/actos/resoluciones", text: "Resoluciones" },
            { href: "/presidencia/actos/constancias-residencia", text: "Constancias de Residencia" },
            { href: "/presidencia/actos/comunicados", text: "Comunicados" },
            { href: "/presidencia/actos/circulares", text: "Circulares" },
            { href: "/presidencia/actos/acuerdos", text: "Acuerdos" },
          ]
        },
      ],
    },
  ];

  // Logic to handle clicks for both desktop and mobile menus
  const handleDropdownClick = (text: string) => {
    setActiveDropdown(prev => {
      // If the dropdown is already active, close it and all nested menus
      if (prev.includes(text)) {
        const index = prev.indexOf(text);
        return prev.slice(0, index);
      }
      // Otherwise, add the new dropdown to the active list
      return [...prev, text];
    });
  };

  const isDropdownActive = (text: string) => {
    return activeDropdown.includes(text);
  };

  const renderMenuItem = (item: NavLink | NavDropdown, isNested: boolean = false) => {
    if (item.dropdown) {
      const isOpen = isDropdownActive(item.text);
      return (
        <div key={item.text} className="relative z-20">
          <button
            onClick={() => handleDropdownClick(item.text)}
            className={`w-full flex justify-between items-center px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isNested ? '' : 'font-semibold'}`}
          >
            {item.text}
            <span className="ml-2 text-xs">▶</span>
          </button>
          {isOpen && (
            <div className={`absolute z-20 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ${isNested ? 'top-0 left-full ml-1' : 'top-full mt-2'}`}>
              {item.dropdown.map(nestedItem => renderMenuItem(nestedItem, true))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Link
          key={item.href}
          href={item.href!}
          className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={(e) => { e.preventDefault(); handleLinkClick(item.href!); }}
        >
          {item.text}
        </Link>
      );
    }
  };

  const renderMobileMenuItem = (item: NavLink | NavDropdown) => {
    if (item.dropdown) {
      const isOpen = isDropdownActive(item.text);
      return (
        <div key={item.text} className="z-10">
          <button
            onClick={() => handleDropdownClick(item.text)}
            className="w-full text-left font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex justify-between items-center"
          >
            {item.text}
            <span>{isOpen ? '▲' : '▼'}</span>
          </button>
          {isOpen && (
            <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
              {item.href && <a href={item.href} onClick={(e) => { e.preventDefault(); handleLinkClick(item.href!);}} className="block px-2 py-1 font-semibold hover:text-blue-700 dark:hover:text-blue-300">Página Principal</a>}
              {item.dropdown.map(nestedItem => renderMenuItem(nestedItem, true))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <a
          key={item.href}
          href={item.href!}
          className="block font-semibold hover:text-blue-700 dark:hover:text-blue-300"
          onClick={(e) => { e.preventDefault(); handleLinkClick(item.href!); }}
        >
          {item.text}
        </a>
      );
    }
  };


  return (
    <nav className="w-full bg-white dark:bg-[#23232a] border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-12">
          <div className="flex-1 flex justify-start">
            <div className="text-[#19295A] dark:text-white font-bold text-lg cursor-pointer">
              <Link href="/" onClick={() => setMenuAbierto(false)}>
                JAC Rosa Blanca
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex space-x-8 text-sm items-center">
              {navLinks.map((link) => (
                <div
                  key={link.text}
                  className="relative z-20" // Adjusted z-index here
                >
                  {link.dropdown ? (
                    <button
                      onClick={() => handleDropdownClick(link.text)}
                      className="font-semibold hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none"
                    >
                      {link.text}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-semibold hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none"
                      onClick={() => handleLinkClick(link.href)}
                    >
                      {link.text}
                    </Link>
                  )}
                  {link.dropdown && isDropdownActive(link.text) && (
                    <div className="absolute z-30 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                      {link.dropdown.map(item => renderMenuItem(item, true))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center">
            <div className="hidden md:flex items-center space-x-4">
                <Link href="/afiliate" className={btnDestacado}>
                  Afíliate / Inscríbete
                </Link>
                <Link href="/panel" className={`${btnDestacado} bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600`}>
                  Panel de Afiliados
                </Link>
            </div>
            <div className="md:hidden">
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
      </div>

      {menuAbierto && (
        <div className="md:hidden px-4 pb-6 text-sm space-y-2 bg-white dark:bg-[#23232a] border-t border-gray-200 dark:border-gray-700 z-30">
          {navLinks.map(renderMobileMenuItem)}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <Link href="/afiliate" className={`${btnDestacado} block text-center`} onClick={() => handleLinkClick("/afiliate")}>
              Afíliate / Inscríbete
            </Link>
            <Link href="/panel" className={`${btnDestacado} bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 block text-center`} onClick={() => handleLinkClick("/panel")}>
              Panel de Afiliados
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}