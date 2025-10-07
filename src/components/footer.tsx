"use client";

import React, { useEffect, useState } from "react";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";
import { SPREADSHEET_ID, SHEET_NAME_FOOTER, SHEET_NAME_REDES } from "@/config/idSheets";
import Enlaces from "@/components/footer/Enlaces";
import Contactos from "@/components/footer/Contactos";
import Redes from "@/components/footer/Redes";

const FOOTER_RANGE = `${SHEET_NAME_FOOTER}!A2:H2`;
const REDES_RANGE = `${SHEET_NAME_REDES}!A2:G2`;

type FooterData = {
  DireccionSede: string;
  BarrioVereda: string;
  LlamadasYWhatsapp: string;
  CorreoElectronico: string;
  EscudoPais: string;
  EscudoDepto: string;
  EscudoMunicipio: string;
  LogoIVC: string;
};

type SocialMediaData = {
  Whatsapp: string;
  Facebook: string;
  Instagram: string;
  X: string;
  TikTok: string;
  Threads: string;
  Youtube: string;
};

function parseFooterRow(row: string[]): FooterData {
  return {
    DireccionSede: row[0] || "",
    BarrioVereda: row[1] || "",
    LlamadasYWhatsapp: row[2] || "",
    CorreoElectronico: row[3] || "",
    EscudoPais: row[4] || "",
    EscudoDepto: row[5] || "",
    EscudoMunicipio: row[6] || "",
    LogoIVC: row[7] || "",
  };
}

function parseSocialMediaRow(row: string[]): SocialMediaData {
  return {
    Whatsapp: row[0] || "",
    Facebook: row[1] || "",
    Instagram: row[2] || "",
    X: row[3] || "",
    TikTok: row[4] || "",
    Threads: row[5] || "",
    Youtube: row[6] || "",
  };
}

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);
  const [socialMedia, setSocialMedia] = useState<SocialMediaData | null>(null);

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
        setFooter(null);
      }
    }
    fetchFooter();
  }, []);

  useEffect(() => {
    async function fetchSocialMedia() {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${REDES_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.values && data.values.length > 0) {
          setSocialMedia(parseSocialMediaRow(data.values[0]));
        }
      } catch (error) {
        console.error("Error fetching social media data:", error);
        setSocialMedia(null);
      }
    }
    fetchSocialMedia();
  }, []);

  const direccion = footer?.DireccionSede || "Dirección de la Sede";
  const barrio = footer?.BarrioVereda || "Barrio/Vereda";
  const llamadas = footer?.LlamadasYWhatsapp || "+57 3XX XXX XXXX";
  const correo = footer?.CorreoElectronico || "info@jacrosablanca.org";
  const escudoPais = footer?.EscudoPais || "/default-country-shield.png";
  const escudoDepto = footer?.EscudoDepto || "/default-department-shield.png";
  const escudoMunicipio = footer?.EscudoMunicipio || "/default-municipality-shield.png";
  const logoIVC = footer?.LogoIVC || "/default-ivc-logo.png";

  const whatsappUrl = socialMedia?.Whatsapp || "";
  const facebookUrl = socialMedia?.Facebook || "";
  const instagramUrl = socialMedia?.Instagram || "";
  const xUrl = socialMedia?.X || "";
  const tiktokUrl = socialMedia?.TikTok || "";
  const threadsUrl = socialMedia?.Threads || "";
  const youtubeUrl = socialMedia?.Youtube || "";

  return (
    <footer className="w-full bg-white dark:bg-[#23232a] border-t border-gray-200 dark:border-gray-700 py-8 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <Enlaces />
        <Contactos
          correo={correo}
          llamadas={llamadas}
          direccion={direccion}
          barrio={barrio}
          escudoPais={escudoPais}
          escudoDepto={escudoDepto}
          escudoMunicipio={escudoMunicipio}
          logoIVC={logoIVC}
        />
        <Redes
          whatsappUrl={whatsappUrl}
          facebookUrl={facebookUrl}
          instagramUrl={instagramUrl}
          xUrl={xUrl}
          tiktokUrl={tiktokUrl}
          threadsUrl={threadsUrl}
          youtubeUrl={youtubeUrl}
        />
      </div>
      <div className="text-center text-xs text-[#19295A] dark:text-blue-200 mt-6">
        © {new Date().getFullYear()} Accion Comunal Girardot. Todos los derechos
        reservados.
      </div>
      <div className="text-center text-xs text-blue-400 dark:text-blue-300 mt-1">
        <a
          href="https://next-code-labs.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Desarrollado por NextCode-Labs
        </a>
      </div>
    </footer>
  );
}