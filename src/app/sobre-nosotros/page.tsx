"use client";

import React, { useEffect, useState } from "react";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID_NOSOTROS, SHEET_NAME_NOSOTROS } from "@/config/idSheets";
import Image from "next/image";

// Columnas obligatorias
type RequiredCols =
  | "QUIENES SOMOS"
  | "MISION"
  | "VISION"
  | "PRINCIPIOS"
  | "VALORES"
  | "OBJETIVOS"
  | "HISTORIA"
  | "PROYECTOS";

// Columnas opcionales
type OptionalCols = "ESCUDO" | "BANDERA" | "HIMNO";

// Definición final
type SheetData = Record<RequiredCols, string> & Partial<Record<OptionalCols, string>>;

export default function AboutUsPage() {
  const [data, setData] = useState<SheetData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID_NOSOTROS}/values/${encodeURIComponent(
        SHEET_NAME_NOSOTROS
      )}?key=${GOOGLE_SHEETS_API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.values && json.values.length > 1) {
        const headers: string[] = json.values[0];
        const obj = {} as SheetData;

        headers.forEach((h) => {
          const colIndex = headers.indexOf(h);

          // Si es Principios, Valores u Objetivos -> leer todas las filas desde la fila 2
          if (["PRINCIPIOS", "VALORES", "OBJETIVOS"].includes(h)) {
            const items = json.values.slice(1).map((row: string[]) => row[colIndex] || "");
            (obj as Record<string, string>)[h] = items.filter((item: string) => item.trim() !== "").join("; ");
          } else {
            // Otros campos -> solo tomar fila 2
            (obj as Record<string, string>)[h] = json.values[1][colIndex] ?? "";
          }
        });

        setData(obj);
      }
    }
    fetchData();
  }, []);

  if (!data) return <p className="text-center text-gray-400">Cargando...</p>;

  return (
    <div className="w-full min-h-screen text-gray-200 font-sans py-12 px-4">
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Quiénes somos" content={data["QUIENES SOMOS"]} />
        <Card title="Misión" content={data.MISION} />
        <Card title="Visión" content={data.VISION} />
        <Card title="Principios" content={data.PRINCIPIOS} isList />
        <Card title="Valores" content={data.VALORES} isList />
        <Card title="Objetivos" content={data.OBJETIVOS} isList />
        <Card title="Historia" content={data.HISTORIA} />
        <Card title="Proyectos" content={data.PROYECTOS} isList />
        {data.ESCUDO && <ImageCard title="Escudo" src={data.ESCUDO} />}
        {data.BANDERA && <ImageCard title="Bandera" src={data.BANDERA} />}
        <Card title="Himno" content={data.HIMNO || ""} />
        {/* Tarjeta para ver el mapa */}
        <MapCard />
      </div>
    </div>
  );
}

function Card({
  title,
  content,
  isList = false,
}: {
  title: string;
  content: string;
  isList?: boolean;
}) {
  // Si el contenido es una ruta a proyectos
  if (content.trim() === "/presidencia/proyectos") {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">{title}</h2>
        <a
          href={content}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-transform hover:scale-105"
        >
          Ver proyectos
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">{title}</h2>
      {isList ? (
        <ul className="list-disc list-inside space-y-1">
          {content.split(";").map((item: string, idx: number) => (
            <li key={idx}>{item.trim()}</li>
          ))}
        </ul>
      ) : (
        <p className="leading-relaxed">{content}</p>
      )}
    </div>
  );
}

function ImageCard({ title, src }: { title: string; src: string }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">{title}</h2>
      <Image src={src} alt={title} width={200} height={200} className="rounded-lg shadow" />
    </div>
  );
}

// Agrega este componente al final del archivo
function MapCard() {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Mapa</h2>
      <iframe
        title="Mapa ubicación"
        src="https://www.google.com/maps?q=4.311750, -74.800842&z=16&output=embed"
        width={250}
        height={250}
        style={{ border: 0, borderRadius: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
