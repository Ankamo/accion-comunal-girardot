"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID_EQUIPO, SHEET_NAME_EQUIPO } from "@/config/idSheets";

type Miembro = {
  nombre: string;
  cargo: string;
  organo: string;
  foto: string;
};

export default function EquipoPage() {
  const [grupos, setGrupos] = useState<Record<string, Miembro[]>>({});

  useEffect(() => {
    async function fetchEquipo() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_EQUIPO}/values/${encodeURIComponent(
        SHEET_NAME_EQUIPO
      )}?key=${GOOGLE_SHEETS_API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.values && json.values.length > 1) {
        const rows = json.values.slice(1); // Omitir encabezados
        const miembros: Miembro[] = rows.map((row: string[]) => ({
          nombre: row[0] || "",
          cargo: row[1] || "",
          organo: row[2] || "",
          foto: row[3] || "",
        }));

        // Agrupar por órgano
        const agrupados = miembros.reduce((acc, miembro) => {
          if (!acc[miembro.organo]) acc[miembro.organo] = [];
          acc[miembro.organo].push(miembro);
          return acc;
        }, {} as Record<string, Miembro[]>);

        setGrupos(agrupados);
      }
    }
    fetchEquipo();
  }, []);

  if (Object.keys(grupos).length === 0) {
    return <p className="text-center text-gray-400 py-10">Cargando equipo...</p>;
  }

  return (
    <div className="w-full min-h-screen text-gray-200 font-sans py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
        Nuestro Equipo
      </h1>

      <div className="max-w-7xl mx-auto space-y-12">
        {Object.entries(grupos).map(([organo, miembros]) => (
          <section key={organo}>
            <h2 className="text-3xl font-bold mb-6 text-center">
              {organo.trim().toLowerCase() === "dirección"
                ? `Junta Directiva – Órgano de ${organo}`
                : `Dignatarios – Órgano de ${organo}`}
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {miembros.map((miembro, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform w-72"
                >
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src={miembro.foto}
                      alt={miembro.nombre}
                      fill
                      className="rounded-full object-cover border-2 border-gray-600"
                    />
                  </div>
                  <h3 className="text-lg font-bold">{miembro.nombre}</h3>
                  <p className="text-gray-400">{miembro.cargo}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
