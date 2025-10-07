'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Nav() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleLinkClick = (href: string) => {
        setOpen(false);
        router.push(href);
    };

    return (
        <nav className="w-full bg-[#19295A] dark:bg-[#23232a] shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 py-2 gap-2">
                <div className="flex flex-row gap-4 items-center">
                    <Link href="/" className="text-white font-bold text-lg hover:text-blue-300 transition-colors">
                        Inicio
                    </Link>
                    <div className="relative">
                        <button
                            className="text-white hover:text-blue-300 transition-colors font-semibold flex items-center gap-1"
                            onClick={() => setOpen((v) => !v)}
                            onBlur={() => setOpen(false)}
                            type="button"
                        >
                            OAC registradas
                            <span className="ml-1">&#9662;</span>
                        </button>
                        {open && (
                            <div className="absolute left-0 mt-2 bg-white dark:bg-[#23232a] rounded shadow-lg z-10 min-w-[220px]">
                                <Link
                                    href="/oac/juntas-accion-comunal"
                                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                                    onMouseDown={e => e.preventDefault()}
                                    onClick={() => handleLinkClick("/oac/juntas-accion-comunal")}
                                >
                                    Juntas de Acción Comunal
                                </Link>
                                <Link
                                    href="/oac/juntas-vivienda-comunal"
                                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                                    onMouseDown={e => e.preventDefault()}
                                    onClick={() => handleLinkClick("/oac/juntas-vivienda-comunal")}
                                >
                                    Juntas de Vivienda Comunal
                                </Link>
                                <Link
                                    href="/oac/asociacion-municipal-girardot"
                                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                                    onMouseDown={e => e.preventDefault()}
                                    onClick={() => handleLinkClick("/oac/asociacion-municipal-girardot")}
                                >
                                    Asociación Municipal de Girardot
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link href="/servicios-digitales" className="text-white hover:text-blue-300 transition-colors">
                        Servicios digitales
                    </Link>
                    <Link href="/servicio-tecnico" className="text-white hover:text-blue-300 transition-colors">
                        Servicio Técnico
                    </Link>
                    <Link href="/contactanos" className="text-white hover:text-blue-300 transition-colors">
                        Contáctanos
                    </Link>
                    <Link href="/pqrs" className="text-white hover:text-blue-300 transition-colors">
                        PQRS
                    </Link>
                    <Link href="/registrar-oac" className="text-white hover:text-blue-300 transition-colors font-semibold">
                        Registrar OAC
                    </Link>
                </div>
            </div>
        </nav>
    );
}