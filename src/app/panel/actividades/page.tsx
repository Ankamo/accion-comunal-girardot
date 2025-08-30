// src/app/panel/actividades/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Tipo de actividad igual al público
type Actividad = {
  Foto: string;
  Tipo: string;
  Actividad: string;
  Descripcion: string;
  Fecha: string;
  Hora: string;
  Lugar: string;
  LinkFacebook?: string;
  Donar?: string;
  LinkDonar?: string;
  Patrocinadores?: string;
  VerPatrocinadores?: string;
};

export default function PanelActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActividades() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/panel/actividades/get");
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        const data = await res.json();

        // El API devuelve rows como un array de arrays → mapear
        if (data.values && data.values.length > 1) {
          const headers = data.values[0];
          const rows = data.values.slice(1);

          const parsed: Actividad[] = rows.map((cols: string[]) => {
            const rowObj: Record<string, string> = {};
            headers.forEach((h: string, idx: number) => {
              rowObj[h] = cols[idx] || "";
            });
            return {
              Foto: rowObj["Foto"] || "/LogoJac.png",
              Tipo: rowObj["Tipo"] || "General",
              Actividad: rowObj["Actividad"] || "Actividad sin título",
              Descripcion: rowObj["Descripcion"] || "Sin descripción.",
              Fecha: rowObj["Fecha"] || "",
              Hora: rowObj["Hora"] || "",
              Lugar: rowObj["Lugar"] || "",
              LinkFacebook: rowObj["Link Facebook"] || "",
              Donar: rowObj["Donar"] || "",
              LinkDonar: rowObj["Link Donar"] || "",
              Patrocinadores: rowObj["Patrocinadores"] || "",
              VerPatrocinadores: rowObj["Ver Patrocinadores"] || "",
            };
          });
          setActividades(parsed);
        } else {
          setActividades([]);
        }
      } catch (err) {
  const error = err as Error; // casteo seguro
  console.error("Error obteniendo actividades:", error.message);
  setError("No se pudieron cargar las actividades");
} finally {
  setLoading(false);
}

    }
    fetchActividades();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-[#19295A] dark:text-blue-200 mb-8">
        Panel de Actividades
      </h1>

      {loading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && actividades.length === 0 && (
        <p className="text-center text-gray-400">No hay actividades registradas.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {actividades.map((actividad, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative w-full h-48 flex-shrink-0">
              <Image
                src={actividad.Foto || "/LogoJac.png"}
                alt={actividad.Actividad}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
                {actividad.Tipo}
              </span>
              <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-300 mt-2">
                {actividad.Actividad}
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mt-3 flex-grow">
                {actividad.Descripcion}
              </p>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                {actividad.Fecha && <p><strong>Fecha:</strong> {actividad.Fecha}</p>}
                {actividad.Hora && <p><strong>Hora:</strong> {actividad.Hora}</p>}
                {actividad.Lugar && <p><strong>Lugar:</strong> {actividad.Lugar}</p>}
              </div>

              {/* Botones de acción en el panel */}
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                  Editar
                </button>
                <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
