"use client";

import React, { useState, useEffect } from "react";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID, SHEET_NAME_FOOTER } from "@/config/idSheets";
import { MapPin, Phone, Mail } from "lucide-react";

const FOOTER_RANGE = `${SHEET_NAME_FOOTER}!A2:H2`;

type FooterData = {
  DireccionSede: string;
  BarrioVereda: string;
  LlamadasYWhatsapp: string;
  CorreoElectronico: string;
};

function parseFooterRow(row: string[]): FooterData {
  return {
    DireccionSede: row[0] || "",
    BarrioVereda: row[1] || "",
    LlamadasYWhatsapp: row[2] || "",
    CorreoElectronico: row[3] || "",
  };
}

export default function ContactsPage() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${FOOTER_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.values && data.values.length > 0) {
          setFooter(parseFooterRow(data.values[0]));
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }
    fetchFooter();
  }, []);

  const direccion = footer?.DireccionSede || "Dirección de la Sede";
  const llamadas = footer?.LlamadasYWhatsapp || "+57 3XX XXX XXXX";
  const correo = footer?.CorreoElectronico || "info@jacrosablanca.org";

  const cardColor =
  "text-white hover:opacity-90 transition-transform duration-300 hover:scale-105 cursor-pointer flex-1 flex flex-col justify-center items-center p-4";

  
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-stretch justify-center gap-0">
      {/* Dirección */}
      <a
        href="https://maps.app.goo.gl/AUsGC9NXH1oDhmLR6"
        target="_blank"
        rel="noopener noreferrer"
        className={cardColor}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#1F1F23]">
            <MapPin size={24} />
          </div>
          <h3 className="mt-4 text-lg font-bold">Dirección</h3>
          <p className="mt-2 text-center">{direccion}</p>
        </div>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${llamadas.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cardColor}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#1F1F23]">
            <Phone size={24} />
          </div>
          <h3 className="mt-4 text-lg font-bold">WhatsApp</h3>
          <p className="mt-2">{llamadas}</p>
        </div>
      </a>

      {/* Correo */}
      <a
        href={`mailto:${correo}`}
        className={cardColor}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#1F1F23]">
            <Mail size={24} />
          </div>
          <h3 className="mt-4 text-lg font-bold">Correo</h3>
          <p className="mt-2">{correo}</p>
        </div>
      </a>
    </div>
  );
}
