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
  GoogleMapsLink: string;
};

function parseFooterRow(row: string[]): FooterData {
  return {
    DireccionSede: row[0] || "",
    BarrioVereda: row[1] || "",
    LlamadasYWhatsapp: row[2] || "",
    CorreoElectronico: row[3] || "",
    GoogleMapsLink: row[4] || "",
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
  const googleMapsLink =
    footer?.GoogleMapsLink || "https://maps.app.goo.gl/AUsGC9NXH1oDhmLR6";

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Título más pequeño */}
        <h2 className="text-white text-center text-xl md:text-2xl font-bold mb-8">
          CONTÁCTANOS
        </h2>
        {/* Contenedor de las tarjetas de contacto */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
          {/* Tarjeta de Dirección */}
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            // Color de fondo de la tarjeta y efecto al pasar el mouse
            className="text-white bg-[#1F1F23] hover:bg-[#2A2A2E] transition-colors duration-300 flex-1 flex flex-col justify-center items-center p-6 rounded-lg"
          >
            <div className="flex flex-col items-center">
              {/* Icono más pequeño */}
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#1F1F23]">
                <MapPin size={24} />
              </div>
              {/* Título y texto más pequeños */}
              <h3 className="mt-2 text-lg font-bold">Dirección</h3>
              <p className="mt-1 text-center text-sm">{direccion}</p>
            </div>
          </a>

          {/* Tarjeta de WhatsApp */}
          <a
            href={`https://wa.me/${llamadas.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#1F1F23] hover:bg-[#2A2A2E] transition-colors duration-300 flex-1 flex flex-col justify-center items-center p-6 rounded-lg"
          >
            <div className="flex flex-col items-center">
              {/* Icono más pequeño */}
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#1F1F23]">
                <Phone size={24} />
              </div>
              {/* Título y texto más pequeños */}
              <h3 className="mt-2 text-lg font-bold">WhatsApp</h3>
              <p className="mt-1 text-sm">{llamadas}</p>
            </div>
          </a>

          {/* Tarjeta de Correo */}
          <a
            href={`mailto:${correo}`}
            className="text-white bg-[#1F1F23] hover:bg-[#2A2A2E] transition-colors duration-300 flex-1 flex flex-col justify-center items-center p-6 rounded-lg"
          >
            <div className="flex flex-col items-center">
              {/* Icono más pequeño */}
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#1F1F23]">
                <Mail size={24} />
              </div>
              {/* Título y texto más pequeños */}
              <h3 className="mt-2 text-lg font-bold">Correo</h3>
              <p className="mt-1 text-sm">{correo}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}