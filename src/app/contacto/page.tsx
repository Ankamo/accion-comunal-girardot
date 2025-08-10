"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactsPage() {
  const contactData = {
    address: "Diagonal 33 con Carrera 12 A Esquina, Barrio Rosa Blanca, Girardot, Cundinamarca",
    phone: "+57 304 347 0984",
    email: "juntacomunalrosablanca@gmail.com",
  };

  const mapsUrl = "https://maps.app.goo.gl/AUsGC9NXH1oDhmLR6";

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-2">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Contáctanos</h2>
          <p className="text-sm text-gray-400">Estamos aquí para escucharte.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Dirección */}
          <div className="bg-[#1f2024] p-4 rounded-md shadow-sm flex flex-col items-center text-white hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#4CAF50] text-white">
              <MapPin size={20} />
            </div>
            <h3 className="mt-2 text-base font-bold">Dirección</h3>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-300 hover:text-[#4CAF50] text-center"
            >
              {contactData.address}
            </a>
          </div>

          {/* Teléfono */}
          <div className="bg-[#1f2024] p-4 rounded-md shadow-sm flex flex-col items-center text-white hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#4CAF50] text-white">
              <Phone size={20} />
            </div>
            <h3 className="mt-2 text-base font-bold">Whatsapp</h3>
            <a href={`tel:${contactData.phone}`} className="text-xs text-gray-300 hover:text-[#4CAF50]">
              {contactData.phone}
            </a>
          </div>

          {/* Correo */}
          <div className="bg-[#1f2024] p-4 rounded-md shadow-sm flex flex-col items-center text-white hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#4CAF50] text-white">
              <Mail size={20} />
            </div>
            <h3 className="mt-2 text-base font-bold">Correo</h3>
            <a href={`mailto:${contactData.email}`} className="text-xs text-gray-300 hover:text-[#4CAF50] text-center">
              {contactData.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
