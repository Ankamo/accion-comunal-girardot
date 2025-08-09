"use client"; // Este componente se renderiza en el cliente

import React, { useEffect, useState } from "react";
import Image from "next/image";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey"; // Importa la API Key desde credentials.ts
import { SPREADSHEET_ID, SHEET_NAME_FOOTER, SHEET_NAME_REDES } from "@/config/idSheets"; // Importa los IDs y nombres de hoja

// Define el rango específico para el footer
const FOOTER_RANGE = `${SHEET_NAME_FOOTER}!A2:H2`;
const REDES_RANGE = `${SHEET_NAME_REDES}!A2:G2`; // Rango para las URLs de redes sociales (A2 a G2)

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

// Nuevo tipo para las URLs de redes sociales
type SocialMediaData = {
  Whatsapp: string;
  Facebook: string;
  Instagram: string;
  X: string;
  TikTok: string;
  Threads: string;
  Youtube: string; // Asegúrate de que este campo exista en tu hoja de redes sociales
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

// Nueva función para parsear la fila de redes sociales
function parseSocialMediaRow(row: string[]): SocialMediaData {
  return {
    Whatsapp: row[0] || "",
    Facebook: row[1] || "",
    Instagram: row[2] || "",
    X: row[3] || "",
    TikTok: row[4] || "",
    Threads: row[5] || "",
    Youtube: row[6] || "", // Asegúrate de que este campo exista en tu hoja de redes sociales
  };
}

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);
  const [socialMedia, setSocialMedia] = useState<SocialMediaData | null>(null); // Nuevo estado para redes sociales

  // Efecto para cargar datos del footer
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

  // Nuevo efecto para cargar datos de redes sociales
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
  const escudoPais = footer?.EscudoPais || "/default-country-shield.png"; // Fallback
  const escudoDepto = footer?.EscudoDepto || "/default-department-shield.png"; // Fallback
  const escudoMunicipio = footer?.EscudoMunicipio || "/default-municipality-shield.png"; // Fallback
  const logoIVC = footer?.LogoIVC || "/default-ivc-logo.png"; // Fallback

  // URLs de redes sociales con fallbacks
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
        {/* Enlaces rápidos */}
        <div>
          <h3 className="font-bold text-lg mb-2 text-[#19295A] dark:text-blue-200">
            Enlaces Rápidos
          </h3>
          <ul className="text-base text-gray-700 dark:text-gray-200 space-y-1">
            <li>
              <a
                href="/terminos"
                className="hover:underline text-blue-700 dark:text-blue-300"
              >
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a
                href="/privacidad"
                className="hover:underline text-blue-700 dark:text-blue-300"
              >
                Política de Privacidad
              </a>
            </li>
            <li>
              <a
                href="/juntadeaccioncomunal"
                className="hover:underline text-blue-700 dark:text-blue-300"
              >
                Sobre la Junta de Acción Comunal
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                className="hover:underline text-blue-700 dark:text-blue-300"
              >
                Contacto
              </a>
            </li>
            <li>
              <a
                href="/pqrs"
                className="hover:underline text-blue-700 dark:text-blue-300"
              >
                PQRS
              </a>
            </li>
          </ul>
        </div>
        {/* Contacto (Centro) */}
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-lg mb-2 text-[#19295A] dark:text-blue-200">
            Contacto
          </h3>
          <div className="flex flex-col items-center gap-1 text-gray-700 dark:text-gray-200">
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-blue-200"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.01-8-5.01V6h16zM4 20V8.489l7.445 4.653a1 1 0 0 0 1.11 0L20 8.489V20H4z" />
              </svg>
              <span>{correo}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-blue-200"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z" />
              </svg>
              <span>{llamadas}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-blue-200"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <span>{direccion}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-blue-200"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <span>{barrio}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-blue-200"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <span>Girardot - Cundinamarca</span> {/* Hardcoded for now, could be dynamic */}
            </div>
            <div className="flex flex-row items-center gap-2 mt-2">
              {/* Escudo del País con enlace */}
              <a href="https://www.presidencia.gov.co/" target="_blank" rel="noopener noreferrer" aria-label="Presidencia de la República de Colombia">
                <Image
                  src={escudoPais || "/default-country-shield.png"}
                  alt="Escudo País"
                  width={28}
                  height={28}
                  className="object-contain transition-transform duration-300 hover:scale-110"
                />
              </a>

              {/* Escudo del Departamento con enlace */}
              <a href="https://www.cundinamarca.gov.co/home/" target="_blank" rel="noopener noreferrer" aria-label="Gobernación de Cundinamarca">
                <Image
                  src={escudoDepto || "/default-department-shield.png"}
                  alt="Escudo Departamento"
                  width={28}
                  height={28}
                  className="object-contain transition-transform duration-300 hover:scale-110"
                />
              </a>

              {/* Escudo del Municipio con enlace */}
              <a href="http://girardot-cundinamarca.gov.co/Paginas/Inicio.aspx" target="_blank" rel="noopener noreferrer" aria-label="Alcaldía de Girardot">
                <Image
                  src={escudoMunicipio || "/default-municipality-shield.png"}
                  alt="Escudo Municipio"
                  width={28}
                  height={28}
                  className="object-contain transition-transform duration-300 hover:scale-110"
                />
              </a>

              {/* Logo IVC con enlace */}
              <a href="http://idaco.gov.co/" target="_blank" rel="noopener noreferrer" aria-label="IDACO">
                <Image
                  src={logoIVC || "/default-ivc-logo.png"}
                  alt="Logo IVC"
                  width={28}
                  height={28}
                  className="object-contain transition-transform duration-300 hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>
        {/* Redes Sociales */}
        <div>
          <h3 className="font-bold text-lg mb-2 text-[#19295A] dark:text-blue-200">
            Redes Sociales
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-base text-gray-700 dark:text-gray-200">
            {/* Columna 1 */}
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                {/* WhatsApp */}
                <svg width="22" height="22" fill="currentColor" className="text-green-400" viewBox="0 0 24 24">
                  <path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.464 3.484 1.346 4.997l-1.41 5.164a1 1 0 0 0 1.225 1.225l5.164-1.41a9.953 9.953 0 0 0 4.997 1.346c5.522 0 9.997-4.475 9.997-9.997s-4.475-9.997-9.997-9.997zm0 18.001a7.96 7.96 0 0 1-4.073-1.146l-.29-.172-3.067.838.822-3.008-.178-.295a7.963 7.963 0 1 1 6.786 3.783zm4.396-5.607c-.24-.12-1.418-.699-1.637-.779-.219-.08-.379-.12-.539.12-.16.24-.619.779-.759.939-.14.16-.279.18-.519.06-.24-.12-1.013-.373-1.93-1.189-.714-.637-1.197-1.426-1.338-1.666-.14-.24-.015-.369.105-.489.108-.107.24-.279.36-.419.12-.14.16-.24.24-.399.08-.16.04-.299-.02-.419-.06-.12-.539-1.299-.739-1.779-.195-.468-.393-.406-.539-.414l-.459-.008c-.16 0-.419.06-.639.299-.22.24-.839.82-.839 2 .001 1.18.859 2.318.979 2.478.12.16 1.689 2.58 4.099 3.516.574.197 1.021.314 1.37.402.575.146 1.099.125 1.51.076.461-.055 1.418-.579 1.618-1.139.2-.56.2-1.04.14-1.139-.06-.1-.22-.16-.46-.28z" />
                </svg>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 dark:text-blue-300"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                {/* Youtube */}
                <svg width="22" height="22" fill="currentColor" className="text-red-500" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.425 3.5 12 3.5 12 3.5s-7.425 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.147 0 12 0 12s0 3.853.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.575 20.5 12 20.5 12 20.5s7.425 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.853 24 12 24 12s0-3.853-.502-5.814zM9.545 15.568V8.432l6.545 3.568-6.545 3.568z" />
                </svg>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 dark:text-blue-300"
                >
                  Youtube
                </a>
              </li>
              <li className="flex items-center gap-2">
                {/* Facebook */}
                <svg width="22" height="22" fill="currentColor" className="text-blue-400" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 dark:text-blue-300"
                >
                  Facebook
                </a>
              </li>
            </ul>
            {/* Columna 2 */}
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                {/* Threads */}
                <svg width="22" height="22" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 40 40">
                  <path d="M20 2C10.1 2 2 10.1 2 20s8.1 18 18 18 18-8.1 18-18S29.9 2 20 2zm0 33c-8.3 0-15-6.7-15-15S11.7 5 20 5s15 6.7 15 15-6.7 15-15 15zm2.7-10.7c1.2-.6 2.1-1.8 2.1-3.3 0-2.2-1.7-3.7-4.3-3.7h-3.2v2.7h3.2c1.1 0 1.6.5 1.6 1.2 0 .7-.5 1.2-1.6 1.2h-1.6v2.7h1.6c1.2 0 1.7.5 1.7 1.2 0 .7-.5 1.2-1.7 1.2h-3.2v2.7h3.2c2.6 0 4.3-1.5 4.3-3.7 0-1.5-.9-2.7-2.1-3.3z" />
                </svg>
                <a
                  href={threadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 dark:text-blue-300"
                >
                  Threads
                </a>
              </li>
              <li className="flex items-center gap-2">
                {/* Instagram */}
                <svg width="22" height="22" fill="currentColor" className="text-pink-400" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.635.401 3.678 1.357 2.721 2.314 2.451 3.45 2.392 4.731 2.333 6.011 2.32 6.42 2.32 12c0 5.58.013 5.989.072 7.269.059 1.281.329 2.417 1.286 3.374.957.957 2.093 1.227 3.374 1.286C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.417-.329 3.374-1.286.957-.957 1.227-2.093 1.286-3.374.059-1.28.072-1.689.072-7.269 0-5.58-.013-5.989-.072-7.269-.059-1.281-.329-2.417-1.286-3.374C19.365.401 18.229.131 16.948.072 15.668.013 15.259 0 12 0z" />
                  <path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.324A4.162 4.162 0 1 1 16.162 12 4.162 4.162 0 0 1 12 16.162zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                </svg>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 dark:text-blue-300"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                {/* TikTok */}
                <svg width="22" height="22" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 40 40">
                  <path d="M29.5 13.2c-1.7 0-3.1-1.4-3.1-3.1V7.1h-3.2v16.2c0 2.1-1.7 3.8-3.8 3.8s-3.8-1.7-3.8-3.8 1.7-3.8 3.8-3.8c.2 0 .4 0 .6.1v-3.3c-.2 0-.4-.1-.6-.1-3.9 0-7.1 3.2-7.1 7.1s3.2 7.1 7.1 7.1 7.1-3.2 7.1-7.1v-6.2c1 .6 2.2.9 3.4.9h1.1v-3.2h-1.1z" />
                </svg>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 dark:text-blue-300"
                >
                  TikTok
                </a>
              </li>
              <li className="flex items-center gap-2">
                {/* X */}
                <svg width="22" height="22" fill="currentColor" className="text-black dark:text-white" viewBox="0 0 1200 1227">
                  <path d="M299 0h209l192 294 201-294h196L771 464l429 763H987L600 729l-374 498H29l414-553L0 0h299Zm104 143H225l350 527 400-527H872L600 525 403 143Zm601 1017-335-529-166 217-312 312h153l242-312 242 312h176Zm-904-41 312-312L97 82H60l340 1037Z" />
                </svg>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-700 dark:text-blue-300"
                >
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-[#19295A] dark:text-blue-200 mt-6">
        © {new Date().getFullYear()} Junta de Acción Comunal del Barrio de Rosa Blanca. Todos los derechos
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
