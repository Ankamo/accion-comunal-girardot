"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactsPage() {
  const contactData = {
    address: "Diagonal 33 con Carrera 12 A Esquina, Barrio Rosa Blanca, Girardot, Cundinamarca",
    phone: "+57 304 347 0984",
    email: "juntacomunalrosablanca@gmail.com",
    mapsUrl: "https://maps.app.goo.gl/AUsGC9NXH1oDhmLR6",
  };

  return (
    <div className="w-full min-h-screen text-gray-900 dark:text-gray-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Contáctanos
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Estamos aquí para escucharte.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dirección */}
          <a
            href={contactData.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1e1e24] dark:bg-[#1e1e24] p-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 block text-center"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#4CAF50] text-white mx-auto">
              <MapPin size={24} />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white">Dirección</h3>
              <p className="mt-2 text-gray-300">{contactData.address}</p>
            </div>
          </a>

          {/* Teléfono */}
          {/* Teléfono / Whatsapp */}
          <a
            href="https://wa.me/573043470984"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1e1e24] dark:bg-[#1e1e24] p-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 block text-center"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#4CAF50] text-white mx-auto">
              <Phone size={24} />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white">Whatsapp</h3>
              <p className="mt-2 text-gray-300">{contactData.phone}</p>
            </div>
          </a>


          {/* Correo */}
          <a
            href={`mailto:${contactData.email}`}
            className="bg-[#1e1e24] dark:bg-[#1e1e24] p-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 block text-center"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#4CAF50] text-white mx-auto">
              <Mail size={24} />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white">Correo</h3>
              <p className="mt-2 text-gray-300">{contactData.email}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
