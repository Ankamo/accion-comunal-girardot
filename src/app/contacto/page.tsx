"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactsPage() {
  // Aquí puedes agregar la lógica para obtener la información de contacto de Google Sheets,
  // de manera similar a como lo hiciste en el Footer.
  // Por ahora, usamos datos de ejemplo.
  const contactData = {
    address: "Diagonal 33 con Carrera 12 A Esquina, Barrio Rosa Blanca, Girardot, Cundinamarca",
    phone: "+57 304 347 0984",
    email: "juntacomunalrosablanca@gmail.com",
    workingHours: "Lunes a Viernes: 8:00 AM - 5:00 PM",
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#23232a] text-gray-900 dark:text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Contáctanos
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Estamos aquí para escucharte. Envíanos un mensaje o contáctanos directamente.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta de Información de Contacto */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#4CAF50] text-white mx-auto">
              <MapPin size={24} />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dirección</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {contactData.address}
              </p>
            </div>
          </div>

          {/* Tarjeta de Teléfono */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#4CAF50] text-white mx-auto">
              <Phone size={24} />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Whatsapp</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                <a href={`tel:${contactData.phone}`} className="hover:text-[#4CAF50]">{contactData.phone}</a>
              </p>
            </div>
          </div>

          {/* Tarjeta de Correo Electrónico */}
          <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#4CAF50] text-white mx-auto">
              <Mail size={24} />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Correo</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                <a href={`mailto:${contactData.email}`} className="hover:text-[#4CAF50]">{contactData.email}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}