"use client";
import { useEffect, useState } from "react";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID_ASAMBLEA, SHEET_NAME_ASAMBLEA } from "@/config/idSheets";
import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaClipboardList } from "react-icons/fa";

// Rango dinámico para citaciones
const ASAMBLEA_RANGE = `${SHEET_NAME_ASAMBLEA}!A1:I`;

type Citacion = {
  fecha: string;
  hora: string;
  lugar: string;
  orden: string;
  documento: string;
};

export default function AsambleaGeneralPage() {
  const [citaciones, setCitaciones] = useState<Citacion[]>([]);
  const [anio, setAnio] = useState<string | null>(null);
  const [anios, setAnios] = useState<string[]>([]);

  const SHEET_URL =
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_ASAMBLEA}/values/${ASAMBLEA_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`;

  const cleanCell = (value: string): string => {
    if (!value) return "";
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  useEffect(() => {
    async function fetchCitaciones() {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const headers = data.values[0].map((h: string) => h.trim());
          const rows = data.values.slice(1);

          const citacionesData: Citacion[] = rows.map((cols: string[]) => {
            const rowObj: Record<string, string> = {};
            headers.forEach((header: string, idx: number) => {
              rowObj[header] = cleanCell(cols[idx] || "");
            });

            return {
              fecha: rowObj["FECHA"] || "",
              hora: rowObj["HORA"] || "",
              lugar: rowObj["LUGAR"] || "",
              orden: rowObj["ORDEN DEL DÍA"] || "",
              documento: rowObj["DOCUMENTO"] || "#",
            };
          });

          setCitaciones(citacionesData);
          const aniosUnicos = [...new Set(citacionesData.map(c => c.fecha?.split("-")[0]).filter(a => a))].sort((a, b) => b.localeCompare(a));
          setAnios(aniosUnicos);
        } else {
          setCitaciones([]);
        }
      } catch (err) {
        console.error("Error cargando citaciones:", err);
        setCitaciones([]);
      }
    }
    fetchCitaciones();
  }, [SHEET_URL]);

  const citacionesFiltradas = citaciones.filter((c) => {
    const filtroAnio = anio ? c.fecha.startsWith(anio) : true;
    return filtroAnio;
  });

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Citaciones a Asamblea General
      </h1>

      {/* Filtro por año */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-col">
          <label htmlFor="anio-select" className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Año:
          </label>
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
      </div>

      {/* Listado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {citacionesFiltradas.map((cita, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300">
              Asamblea General
            </h2>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaCalendarAlt className="mr-2 text-blue-600" /> {cita.fecha} - {cita.hora}
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaMapMarkerAlt className="mr-2 text-red-600" /> {cita.lugar}
            </div>
            {cita.orden && (
              <div className="flex items-start text-gray-700 dark:text-gray-300">
                <FaClipboardList className="mr-2 mt-1 text-green-600" />
                <span>{cita.orden}</span>
              </div>
            )}
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
              onClick={() => window.open(cita.documento, "_blank", "noopener,noreferrer")}
            >
              <FaFileAlt className="mr-2" /> Ver Documento
            </button>
          </div>
        ))}

        {citacionesFiltradas.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay citaciones registradas en este filtro.
          </p>
        )}
      </div>
    </div>
  );
}
