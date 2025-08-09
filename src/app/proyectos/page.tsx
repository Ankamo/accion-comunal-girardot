"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey"; // Importa la API Key
import { SPREADSHEET_ID_PROYECTOS, SHEET_NAME_PROYECTOS } from "@/config/idSheets"; // Importa los IDs de la hoja de proyectos

// Define el rango específico para los proyectos, desde la fila 2 hasta la última columna K
const PROYECTOS_RANGE = `${SHEET_NAME_PROYECTOS}!A1:K`; // Cambiado a A1 para obtener los encabezados también

type Proyecto = {
  titulo: string;
  anio: string;
  estado: string;
  web: string;
  doc: string;
  rendicion?: string;
  fotos: string[];
};

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([]);

  // URL para obtener datos de Google Sheets API en formato JSON
  const SHEET_URL =
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_PROYECTOS}/values/${PROYECTOS_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`;

  // Función para limpiar celdas de errores de Google Sheets o espacios extra
  const cleanCell = (value: string): string => {
    if (!value) return "";
    // Expresión regular para detectar errores comunes de Google Sheets
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  // Efecto para cargar los proyectos desde la hoja de cálculo al montar el componente
  useEffect(() => {
    async function fetchProyectos() {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Asegurarse de que hay valores y al menos una fila de datos (después de los encabezados)
        if (data.values && data.values.length > 1) {
          const headers = data.values[0].map((h: string) => h.trim()); // Obtener y limpiar los encabezados
          const rows = data.values.slice(1); // Obtener las filas de datos (excluyendo los encabezados)

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
              web: rowObj["Sitio Web"] || "", // Asegúrate de que esta columna contenga la URL completa
              rendicion: rowObj["RENDICION"] || "",
              fotos: [
                rowObj["FOTO 1"],
                rowObj["FOTO 2"],
                rowObj["FOTO 3"],
                rowObj["FOTO 4"],
                rowObj["FOTO 5"],
              ].filter(Boolean), // Filtra cualquier valor vacío o indefinido
            };
          });

          setProyectos(proyectosData);
          // Inicializa el índice de la imagen actual para cada proyecto a 0
          setCurrentImageIndex(new Array(proyectosData.length).fill(0));
        } else {
          // Si no hay datos o solo hay encabezados, establecer proyectos como un arreglo vacío
          setProyectos([]);
          setCurrentImageIndex([]);
        }
      } catch (error) {
        console.error("Error cargando proyectos:", error);
        setProyectos([]); // En caso de error, limpiar los proyectos
        setCurrentImageIndex([]); // Y los índices de imagen
      }
    }
    fetchProyectos();
  }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar

  // Filtra los proyectos según la categoría seleccionada
  const proyectosFiltrados = proyectos.filter((p) =>
    categoria ? p.estado === categoria : true
  );

  // Devuelve una clase de color Tailwind según el estado del proyecto
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

  // Formatea el estado para mostrarlo con la primera letra en mayúscula
  const formatEstado = (estado: string) =>
    estado
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Manejadores para el carrusel de imágenes
  const handlePrevImage = (index: number, total: number) => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] = (prev[index] - 1 + total) % total;
      return newIndexes;
    });
  };

  const handleNextImage = (index: number, total: number) => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] = (prev[index] + 1) % total;
      return newIndexes;
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Historial de Proyectos Comunitarios
      </h1>

      {/* Botones de filtro por categoría */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {["ejecutado", "postulado", "rechazado", "en proceso"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(categoria === cat ? null : cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              categoria === cat
                ? "bg-[#19295A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            }`}
          >
            {formatEstado(cat)}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
      <div className="flex flex-wrap justify-center gap-8">
        {proyectosFiltrados.map((proyecto, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition max-w-xs"
          >
            {/* Sección de imágenes del proyecto */}
            <div className="relative w-full h-56">
              {proyecto.fotos.length > 0 ? (
                <Image
                  src={proyecto.fotos[currentImageIndex[idx]]}
                  alt={proyecto.titulo}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Imagen de fallback si no hay fotos
                <Image
                  src="/LogoJac.png" // Asegúrate de tener esta imagen en public/
                  alt={proyecto.titulo}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              )}
              {proyecto.fotos.length > 1 && (
                <>
                  {/* Botones de navegación de imágenes */}
                  <button
                    onClick={() => handlePrevImage(idx, proyecto.fotos.length)}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 opacity-75 hover:opacity-100 transition-opacity"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => handleNextImage(idx, proyecto.fotos.length)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 opacity-75 hover:opacity-100 transition-opacity"
                  >
                    ▶
                  </button>
                </>
              )}
            </div>

            {/* Contenido del proyecto (título, estado, enlaces) */}
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
                {/* Enlace a Documentación */}
                <Link
                  href={proyecto.doc}
                  target="_blank"
                  rel="noopener noreferrer" // Añadido por buenas prácticas
                  className="flex-1 text-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
                >
                  Documentación
                </Link>
                {/* Enlace a Rendición de Cuentas (si existe) */}
                {proyecto.rendicion && (
                  <Link
                    href={proyecto.rendicion}
                    target="_blank"
                    rel="noopener noreferrer" // Añadido por buenas prácticas
                    className="flex-1 text-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Inversión
                  </Link>
                )}
                {/* Enlace a Sitio Web (si existe) */}
                {proyecto.web && (
                  <Link
                    href={
                      proyecto.web.startsWith("http")
                        ? proyecto.web
                        : `/proyectos${proyecto.web}` // Mantener la lógica de ruta relativa si no es una URL completa
                    }
                    target={proyecto.web.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer" // Añadido por buenas prácticas
                    className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ver Sitio
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Mensaje si no hay proyectos filtrados */}
        {proyectosFiltrados.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay proyectos registrados en este filtro.
          </p>
        )}
      </div>
    </div>
  );
}