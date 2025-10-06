"use client";

import React, { useEffect, useState } from "react";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID, SHEET_NAME_HEADER } from "@/config/idSheets";
import LogoIzq from "@/components/header/LogoIzq";
import LogoDer from "@/components/header/LogoDer";
import Contenido from "@/components/header/Contenido";
import HoraActual from "@/components/header/HoraActual";
import CiudadActual from "@/components/header/CiudadActual";

const HEADER_RANGE = `${SHEET_NAME_HEADER}!A2:N2`;

type HeaderData = {
  id: string;
  TipoOac: string;
  TipoUrbanismo: string;
  NombreOac: string;
  Lema: string;
  NumeroNit: string;
  NumeroPersoneria: string;
  FechaPersoneria: string;
  ExpedidoPor: string;
  NumeroRuc: string;
  Ciudad: string;
  Departamento: string;
  LogoDer: string;
  LogoIzq: string;
};

function parseHeaderRow(row: string[]): HeaderData {
  return {
    id: row[0] || "",
    TipoOac: row[1] || "",
    TipoUrbanismo: row[2] || "",
    NombreOac: row[3] || "",
    Lema: row[4] || "",
    NumeroNit: row[5] || "",
    NumeroPersoneria: row[6] || "",
    FechaPersoneria: row[7] || "",
    ExpedidoPor: row[8] || "",
    NumeroRuc: row[9] || "",
    Ciudad: row[10] || "",
    Departamento: row[11] || "",
    LogoDer: row[12] || "",
    LogoIzq: row[13] || "",
  };
}

export default function Header() {
  const [header, setHeader] = useState<HeaderData | null>(null);

  useEffect(() => {
    async function fetchHeader() {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${HEADER_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.values && data.values.length > 0) {
          setHeader(parseHeaderRow(data.values[0]));
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    }
    fetchHeader();
  }, []);

  const nombreOac = header
    ? [header.TipoOac, header.TipoUrbanismo, header.NombreOac].filter(Boolean).join(" ")
    : "Junta de Acción Comunal";

  return (
    <header className="w-full bg-white dark:bg-[#23232a] shadow-md border-b border-gray-200 dark:border-gray-700">
      {/* Barra superior */}
      <div className="bg-gray-800 text-white text-xs flex justify-between px-4 py-1">
        <CiudadActual />
        <HoraActual />
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-4 gap-3">
        <div className="flex flex-1 justify-center md:justify-end">
          <LogoIzq src={header?.LogoIzq} />
        </div>
        <div className="flex-1 flex justify-center">
          <Contenido
            nombreOac={nombreOac}
            lema={header?.Lema}
            numeroNit={header?.NumeroNit}
            numeroPersoneria={header?.NumeroPersoneria}
            numeroRuc={header?.NumeroRuc}
            ciudad={header?.Ciudad}
            departamento={header?.Departamento}
          />
        </div>
        <div className="flex flex-1 justify-center md:justify-start">
          <LogoDer src={header?.LogoDer} />
        </div>
      </div>
    </header>
  );
}