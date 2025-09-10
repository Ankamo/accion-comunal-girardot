// src/app/actividades/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID_ACTIVIDADES, SHEET_NAME_ACTIVIDADES } from "@/config/idSheets";

// Define el tipo para cada actividad, basándose en los encabezados de tu hoja de cálculo
type Actividad = {
  Foto: string; // Columna 'Foto' en tu hoja, que contiene la URL de la imagen
  Tipo: string; // Nueva columna 'Tipo'
  Actividad: string; // Columna 'Actividad' en tu hoja, que es el título
  Descripcion: string; // Columna 'Descripcion' en tu hoja
  Fecha: string; // Columna 'Fecha' en tu hoja
  Hora: string; // Columna 'Hora' en tu hoja
  Lugar: string; // Columna 'Lugar' en tu hoja
  LinkFacebook?: string; // Columna 'Link Facebook'
  Donar?: string; // Nueva columna 'Donar' (texto del botón)
  LinkDonar?: string; // Nueva columna 'Link Donar' (URL de donación)
  Patrocinadores?: string; // Nueva columna 'Patrocinadores' (opcional)
  VerPatrocinadores?: string; // Nueva columna 'Ver Patrocinadores' (opcional)
};

export default function ActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  // **ESTADOS PARA LOS FILTROS**
  const [selectedYear, setSelectedYear] = useState<string>("Todos los años");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Todas las actividades");
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("Todos los lugares");
  const [availablePlaces, setAvailablePlaces] = useState<string[]>([]);


  // Define el rango de la hoja de cálculo, ahora hasta la columna J para incluir las nuevas columnas
  const ACTIVIDADES_RANGE = `${SHEET_NAME_ACTIVIDADES}!A1:L`;

  // URL para obtener datos de Google Sheets API en formato JSON
  const SHEET_URL =
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_ACTIVIDADES}/values/${ACTIVIDADES_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;

  // Función para limpiar celdas de errores de Google Sheets o espacios extra
  const cleanCell = (value: string): string => {
    if (!value) return "";
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  // Manejador de clic en la imagen
  const handleImageClick = (imageUrl: string) => {
    setIsImageLoading(true);
    // Pre-carga la imagen para evitar un destello al abrir el modal
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setSelectedImage(imageUrl);
      setIsImageLoading(false);
    };
    img.onerror = () => {
      console.error("Error al cargar la imagen seleccionada.");
      setIsImageLoading(false);
      setSelectedImage(null);
    };
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Efecto para cargar las actividades desde la hoja de cálculo
  useEffect(() => {
    async function fetchActividades() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();

        if (data.values && data.values.length > 1) {
          const headers = data.values[0].map((h: string) => h.trim()); // Encabezados de la primera fila
          const rows = data.values.slice(1); // Datos a partir de la segunda fila

          const parsedActividades: Actividad[] = rows.map((cols: string[]) => {
            const rowObj: Record<string, string> = {};
            headers.forEach((header: string, idx: number) => {
              rowObj[header] = cleanCell(cols[idx] || "");
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
          setActividades(parsedActividades);

          // **Extracción de años únicos para el filtro**
          const years = Array.from(new Set(
            parsedActividades
              .map(act => act.Fecha)
              .filter(fecha => fecha)
              .map(fecha => fecha.split(" ").pop()!)
          )).sort((a, b) => parseInt(b) - parseInt(a));
          setAvailableYears(["Todos los años", ...years]);
          
          // **Extracción de tipos de actividad únicos para el filtro**
          const types = Array.from(new Set(
            parsedActividades
              .map(act => act.Tipo)
              .filter(tipo => tipo)
          ));
          setAvailableTypes(["Todas las actividades", ...types]);
          
          // **Extracción de lugares únicos para el filtro**
          const places = Array.from(new Set(
            parsedActividades
              .map(act => act.Lugar)
              .filter(lugar => lugar)
          ));
          setAvailablePlaces(["Todos los lugares", ...places]);

        } else {
          setActividades([]); // No hay datos o solo encabezados
          setAvailableYears([]); // No hay años disponibles
          setAvailableTypes([]); // No hay tipos disponibles
          setAvailablePlaces([]); // No hay lugares disponibles
        }
      } catch (err) {
        console.error("Error cargando actividades:", err);
        setError("No se pudieron cargar las actividades. Revisa tu conexión y la configuración de la API.");
      } finally {
        setLoading(false);
      }
    }
    fetchActividades();
  }, [SHEET_URL]);

  // **FILTRADO DE ACTIVIDADES COMBINADO**
  const filteredActividades = actividades.filter(actividad => {
    const yearMatch = selectedYear === "Todos los años" || actividad.Fecha.split(" ").pop() === selectedYear;
    const typeMatch = selectedType === "Todas las actividades" || actividad.Tipo === selectedType;
    const placeMatch = selectedPlace === "Todos los lugares" || actividad.Lugar === selectedPlace;
    return yearMatch && typeMatch && placeMatch;
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Nuestras Actividades
      </h1>

      {/* **CONTENEDOR DE FILTROS** */}
      {!loading && !error && (availableYears.length > 1 || availableTypes.length > 1 || availablePlaces.length > 1) && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          {/* Selector de Años */}
          {availableYears.length > 1 && (
            <div className="flex items-center space-x-2">
              <label htmlFor="year-filter" className="text-gray-700 dark:text-gray-300 font-semibold">Año:</label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          )}

          {/* Selector de Tipos de Actividad */}
          {availableTypes.length > 1 && (
            <div className="flex items-center space-x-2">
              <label htmlFor="type-filter" className="text-gray-700 dark:text-gray-300 font-semibold">Tipo:</label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {availableTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}
          
          {/* Selector de Lugares */}
          {availablePlaces.length > 1 && (
            <div className="flex items-center space-x-2">
              <label htmlFor="place-filter" className="text-gray-700 dark:text-gray-300 font-semibold">Lugar:</label>
              <select
                id="place-filter"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {availablePlaces.map(place => (
                  <option key={place} value={place}>{place}</option>
                ))}
              </select>
            </div>
          )}

        </div>
      )}

      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400">Cargando actividades...</p>
      )}

      {error && (
        <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>
      )}

      {!loading && !error && filteredActividades.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No hay actividades registradas con los filtros seleccionados.
        </p>
      )}

      {!loading && !error && actividades.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No hay actividades registradas en este momento.
        </p>
      )}

      {/* Grid de actividades, ahora usando la lista filtrada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredActividades.map((actividad, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            {/* Contenedor de la imagen con onClick para abrir el modal */}
            <div
              className="relative w-full h-48 flex-shrink-0 cursor-pointer"
              onClick={() => handleImageClick(actividad.Foto || "/LogoJac.png")}
            >
              <Image
                src={actividad.Foto || "/LogoJac.png"}
                alt={actividad.Actividad}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
                onError={(e) => { e.currentTarget.src = "/LogoJac.png"; }}
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              {actividad.Tipo && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900 mb-2">
                  {actividad.Tipo}
                </span>
              )}
              <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-300 mt-2">
                {actividad.Actividad}
              </h2>
              {actividad.Descripcion && (
                <p className="text-gray-700 dark:text-gray-200 mt-3 text-base flex-grow">
                  {actividad.Descripcion}
                </p>
              )}
              {(actividad.Fecha || actividad.Hora || actividad.Lugar) && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  {actividad.Fecha && <p><strong>Fecha:</strong> {actividad.Fecha}</p>}
                  {actividad.Hora && <p><strong>Hora:</strong> {actividad.Hora}</p>}
                  {actividad.Lugar && <p><strong>Lugar:</strong> {actividad.Lugar}</p>}
                </div>
              )}
              
              {/* Contenedor para los botones */}
              <div className="mt-4 space-y-2">
                {actividad.LinkFacebook && (
                  <Link
                    href={actividad.LinkFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold text-center"
                  >
                    {/* Icono de Facebook */}
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 13.5h2V16h-2v3h-3v-3H9v-2h2v-2c0-1.66 1.34-3 3-3h2v2h-2c-.55 0-1 .45-1 1v2z"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    Ver en Facebook
                  </Link>
                )}
                {actividad.Donar && actividad.LinkDonar && (
                  <Link
                    href={actividad.LinkDonar}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold text-center"
                  >
                    {actividad.Donar}
                  </Link>
                )}
                {actividad.Patrocinadores && actividad.VerPatrocinadores && (
                  <Link
                    href={actividad.VerPatrocinadores}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold text-center"
                  >
                    {actividad.Patrocinadores}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal para la imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-[95vw] max-h-[95vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {isImageLoading ? (
              <div className="flex justify-center items-center w-full h-full text-white">
                Cargando imagen...
              </div>
            ) : (
              <Image
                src={selectedImage}
                alt="Imagen ampliada"
                layout="fill"
                objectFit="contain"
                className="rounded-lg shadow-xl"
              />
            )}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold p-2 leading-none bg-black bg-opacity-50 rounded-full"
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
