"use client";
import { useEffect, useState } from "react";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID_ASAMBLEA_RESIDENTES, SHEET_NAME_ASAMBLEA_RESIDENTES} from "@/config/idSheets";
import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaClipboardList, FaClock } from "react-icons/fa";

// Rango amplio
const ASAMBLEA_RANGE = `${SHEET_NAME_ASAMBLEA_RESIDENTES}!A1:I`;

type Citacion = {
  numero: string;
  tipoReunion: string;
  mes: string;
  fecha: string;
  hora: string;
  lugar: string;
  finalidad: string;
  orden?: string;
  estado: string;
  documento: string;
  anio?: string;
};

// Normalizador
const normalize = (s: string = "") =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s+/g, " ").trim().toUpperCase();

// Limpia celdas con errores de Sheets
const cleanCell = (value: string): string => {
  if (!value) return "";
  if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?\/]*/i.test(value)) return "";
  return String(value).trim();
};

export default function AsambleaGeneralPage() {
  const [citaciones, setCitaciones] = useState<Citacion[]>([]);
  const [anio, setAnio] = useState<string | null>(null);
  const [anios, setAnios] = useState<string[]>([]);
  const [estado, setEstado] = useState<string | null>(null);
  const [estados, setEstados] = useState<string[]>([]);
  const [tipoReunion, setTipoReunion] = useState<string | null>(null);
  const [tiposReunion, setTiposReunion] = useState<string[]>([]);

  const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_ASAMBLEA_RESIDENTES}/values/${ASAMBLEA_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;

  useEffect(() => {
    async function fetchCitaciones() {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const headersNorm = data.values[0].map((h: string) => normalize(h));
          const rows = data.values.slice(1);

          const citacionesData: Citacion[] = rows
            .map((cols: string[]): Citacion => {
              const rowObj: Record<string, string> = {};
              headersNorm.forEach((header: string, idx: number) => {
                rowObj[header] = cleanCell(cols?.[idx] ?? "");
              });

              const pick = (...keys: string[]) => {
                for (const k of keys) {
                  const v = rowObj[normalize(k)];
                  if (v) return v;
                }
                return "";
              };

              const fecha = pick("FECHA");
              const hora = pick("HORA");
              const lugar = pick("LUGAR");
              const orden = pick("ORDEN DEL DIA", "ORDEN DEL DÍA", "ORDEN", "AGENDA");
              const documento = pick("DOCUMENTO", "ENLACE", "LINK", "CITACION");
              const finalidad = pick("FINALIDAD");
              const estado = pick("ESTADO");
              const tipoReunion = pick("TIPO DE REUNION");

              const matchYear = (fecha || "").match(/(19|20)\d{2}/);
              const anio = matchYear ? matchYear[0] : "";

              return {
                numero: rowObj["NUMERO"] || "",
                tipoReunion,
                mes: rowObj["MES"] || "",
                fecha,
                hora,
                lugar,
                finalidad,
                orden,
                estado,
                documento,
                anio,
              };
            })
            // 🔹 Excluir citaciones "SIN PROGRAMAR"
            .filter((c: Citacion) =>
              c.estado?.toUpperCase() !== "SIN PROGRAMAR" &&
              (c.fecha || c.hora || c.lugar || c.finalidad || c.estado || (c.documento && c.documento !== "#"))
            );

          setCitaciones(citacionesData);

          const aniosUnicos = [
            ...new Set(citacionesData.map((c) => c.anio).filter((a): a is string => Boolean(a)))
          ].sort((a, b) => b.localeCompare(a));
          setAnios(aniosUnicos);

          const estadosUnicos = [
            ...new Set(citacionesData.map((c) => c.estado).filter((e): e is string => Boolean(e)))
          ].sort((a, b) => a.localeCompare(b));
          setEstados(estadosUnicos);

          const tiposUnicos = [
            ...new Set(citacionesData.map((c) => c.tipoReunion).filter((t): t is string => Boolean(t)))
          ].sort((a, b) => a.localeCompare(b));
          setTiposReunion(tiposUnicos);
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

  const citacionesFiltradas = citaciones.filter(
    (c: Citacion) =>
      (anio ? c.anio === anio : true) &&
      (estado ? c.estado === estado : true) &&
      (tipoReunion ? c.tipoReunion === tipoReunion : true)
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Citaciones a Asamblea de Residentes
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {/* Año */}
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

        {/* Estado */}
        <div className="flex flex-col">
          <label htmlFor="estado-select" className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Estado:
          </label>
          <select
            id="estado-select"
            value={estado || ""}
            onChange={(e) => setEstado(e.target.value || null)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">Todos los estados</option>
            {estados.map((es) => (
              <option key={es} value={es}>{es}</option>
            ))}
          </select>
        </div>

        {/* Tipo de reunión */}
        <div className="flex flex-col">
          <label htmlFor="tipo-reunion-select" className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Tipo de reunión:
          </label>
          <select
            id="tipo-reunion-select"
            value={tipoReunion || ""}
            onChange={(e) => setTipoReunion(e.target.value || null)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">Todas</option>
            {tiposReunion.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {citacionesFiltradas.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay citaciones registradas en este filtro.
          </p>
        )}

        {citacionesFiltradas.map((cita: Citacion, idx: number) => {
          let fechaBonita = cita.fecha || "Por definir";
          const horaBonita = cita.hora || "Por definir";

          if (cita.fecha) {
            const fechaObj = new Date(cita.fecha + "T00:00:00");
            if (!isNaN(fechaObj.getTime())) {
              fechaBonita = fechaObj.toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              });
            }
          }

          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300">
                {cita.finalidad || "Asamblea General"}
              </h2>

              <div className="flex flex-col text-gray-700 dark:text-gray-300 gap-1">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  <span>Fecha: {fechaBonita}</span>
                </div>

                <div className="flex items-center">
                  <FaClock className="mr-2 text-blue-600" />
                  <span>Hora: {horaBonita}</span>
                </div>

                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-600" />
                  <span>Lugar: {cita.lugar || "Por definir"}</span>
                </div>
              </div>

              {cita.orden && (
                <div className="flex items-start text-gray-700 dark:text-gray-300">
                  <FaClipboardList className="mr-2 mt-1 text-green-600" />
                  <span>{cita.orden}</span>
                </div>
              )}

              {cita.documento && cita.documento !== "#" && (
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
                  onClick={() => window.open(cita.documento, "_blank", "noopener,noreferrer")}
                >
                  <FaFileAlt className="mr-2" /> Ver Documento
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
