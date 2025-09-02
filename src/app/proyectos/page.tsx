"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID_PROYECTOS, SHEET_NAME_PROYECTOS } from "@/config/idSheets";
import { FaFacebook, FaInstagram, FaGlobe, FaFileAlt, FaDollarSign } from "react-icons/fa";

// Actualiza el rango para reflejar el nuevo encabezado
const PROYECTOS_RANGE = `${SHEET_NAME_PROYECTOS}!A1:G`;

type Proyecto = {
  titulo: string;
  anio: string;
  estado: string;
  web: string;
  doc: string;
  rendicion?: string;
  publicacion?: string;
};

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [anio, setAnio] = useState<string | null>(null);
  const [anios, setAnios] = useState<string[]>([]);

  const SHEET_URL =
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_PROYECTOS}/values/${PROYECTOS_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`;

  const cleanCell = (value: string): string => {
    if (!value) return "";
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  useEffect(() => {
    async function fetchProyectos() {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const headers = data.values[0].map((h: string) => h.trim());
          const rows = data.values.slice(1);

          const proyectosData: Proyecto[] = rows.map((cols: string[]) => {
            const rowObj: Record<string, string> = {};
            headers.forEach((header: string, idx: number) => {
              rowObj[header] = cleanCell(cols[idx] || "");
            });

            return {
              titulo: rowObj["NOMBRE DEL PROYECTO"] || "Proyecto sin nombre",
              anio: rowObj["AÑO"] || "",
              estado: (rowObj["ESTADO"] || "desconocido").toLowerCase().trim(),
              doc: rowObj["DOCUMENTACION"] || "#",
              web: rowObj["Sitio Web"] || "",
              rendicion: rowObj["RENDICION"] || "",
              publicacion: rowObj["PUBLICACION"] || "",
            };
          });

          setProyectos(proyectosData);
          const aniosUnicos = [...new Set(proyectosData.map(p => p.anio).filter(a => a))].sort((a, b) => b.localeCompare(a));
          setAnios(aniosUnicos);
        } else {
          setProyectos([]);
        }
      } catch (error) {
        console.error("Error cargando proyectos:", error);
        setProyectos([]);
      }
    }
    fetchProyectos();
  }, [SHEET_URL]);

  const proyectosFiltrados = proyectos.filter((p) => {
    const filtroCategoria = categoria ? p.estado === categoria : true;
    const filtroAnio = anio ? p.anio === anio : true;
    return filtroCategoria && filtroAnio;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "ejecutado":
        return "bg-green-500";
      case "postulado":
        return "bg-yellow-500";
      case "rechazado":
        return "bg-red-500";
      case "en proceso":
        return "bg-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  const formatEstado = (estado: string) =>
    estado
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const getSocialInfo = (url: string) => {
    if (url.includes("facebook.com")) {
      return {
        icon: <FaFacebook className="mr-2" />,
        text: "Facebook",
        color: "bg-blue-600 hover:bg-blue-700",
      };
    }
    if (url.includes("instagram.com")) {
      return {
        icon: <FaInstagram className="mr-2" />,
        text: "Instagram",
        color: "bg-pink-600 hover:bg-pink-700",
      };
    }
    return {
      icon: <FaGlobe className="mr-2" />,
      text: "Ver Sitio",
      color: "bg-green-600 hover:bg-green-700",
    };
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Historial de Proyectos Comunitarios
      </h1>

      {/* Filtros */}
      <div className="flex justify-center flex-wrap gap-6 mb-8">
        <div className="flex flex-col">
          <label htmlFor="anio-select" className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Año:</label>
          <select
            id="anio-select"
            value={anio || ""}
            onChange={(e) => setAnio(e.target.value || null)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">Todos los años</option>
            {anios.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="estado-select" className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Estado:</label>
          <select
            id="estado-select"
            value={categoria || ""}
            onChange={(e) => setCategoria(e.target.value || null)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">Todos los estados</option>
            {["ejecutado", "postulado", "rechazado", "en proceso"].map((cat) => (
              <option key={cat} value={cat}>{formatEstado(cat)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de proyectos */}
      <div className="flex flex-wrap justify-center gap-8">
        {proyectosFiltrados.map((proyecto, idx) => {
          const cardHref = proyecto.web
            ? (proyecto.web.startsWith("http") ? proyecto.web : `/proyectos${proyecto.web}`)
            : undefined;

          if (cardHref) {
            return (
              <Link
                key={idx}
                href={cardHref}
                className="block max-w-xs"
                target={proyecto.web && proyecto.web.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer">
                  {/* Imagen de fallback */}
                  <div className="relative w-full h-56">
                    <Image
                      src="/LogoJac.png"
                      alt={proyecto.titulo}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Contenido del proyecto */}
                  <div className="p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300">
                      {proyecto.titulo}
                      {!proyecto.titulo.includes(proyecto.anio) && proyecto.anio && (
                        <span className="text-gray-500"> ({proyecto.anio})</span>
                      )}
                    </h2>
                    <span
                      className={`inline-block px-3 py-1 text-white rounded-lg text-sm font-semibold ${getEstadoColor(
                        proyecto.estado
                      )}`}
                    >
                      {formatEstado(proyecto.estado)}
                    </span>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        className="flex items-center justify-center flex-1 text-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(proyecto.doc, "_blank", "noopener,noreferrer");
                        }}
                      >
                        <FaFileAlt className="mr-2" />
                        <span>Documentación</span>
                      </button>
                      {proyecto.rendicion && (
                        <button
                          type="button"
                          className="flex items-center justify-center flex-1 text-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(proyecto.rendicion, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <FaDollarSign className="mr-2" />
                          <span>Rendición de Cuentas</span>
                        </button>
                      )}
                      {proyecto.publicacion && (
                        <button
                          type="button"
                          className={`flex items-center justify-center flex-1 text-center px-4 py-2 text-white rounded-lg transition-colors ${
                            getSocialInfo(proyecto.publicacion).color
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(proyecto.publicacion, "_blank", "noopener,noreferrer");
                          }}
                        >
                          {getSocialInfo(proyecto.publicacion).icon}
                          <span>Publicación</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          } else {
            return (
              <div key={idx} className="max-w-xs">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                  {/* Imagen de fallback */}
                  <div className="relative w-full h-56">
                    <Image
                      src="/LogoJac.png"
                      alt={proyecto.titulo}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Contenido del proyecto */}
                  <div className="p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300">
                      {proyecto.titulo}
                      {!proyecto.titulo.includes(proyecto.anio) && proyecto.anio && (
                        <span className="text-gray-500"> ({proyecto.anio})</span>
                      )}
                    </h2>
                    <span
                      className={`inline-block px-3 py-1 text-white rounded-lg text-sm font-semibold ${getEstadoColor(
                        proyecto.estado
                      )}`}
                    >
                      {formatEstado(proyecto.estado)}
                    </span>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        className="flex items-center justify-center flex-1 text-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
                        onClick={() => window.open(proyecto.doc, "_blank", "noopener,noreferrer")}
                      >
                        <FaFileAlt className="mr-2" />
                        <span>Documentación</span>
                      </button>
                      {proyecto.rendicion && (
                        <button
                          type="button"
                          className="flex items-center justify-center flex-1 text-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          onClick={() => window.open(proyecto.rendicion, "_blank", "noopener,noreferrer")}
                        >
                          <FaDollarSign className="mr-2" />
                          <span>Rendición de Cuentas</span>
                        </button>
                      )}
                      {proyecto.publicacion && (
                        <button
                          type="button"
                          className={`flex items-center justify-center flex-1 text-center px-4 py-2 text-white rounded-lg transition-colors ${
                            getSocialInfo(proyecto.publicacion).color
                          }`}
                          onClick={() => window.open(proyecto.publicacion, "_blank", "noopener,noreferrer")}
                        >
                          {getSocialInfo(proyecto.publicacion).icon}
                          <span>Publicación</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}

        {proyectosFiltrados.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay proyectos registrados en este filtro.
          </p>
        )}
      </div>
    </div>
  );
}