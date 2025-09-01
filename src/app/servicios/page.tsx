"use client";
import Link from "next/link";

export default function ServiciosTramitesPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Servicios y Trámites
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta de Certificados de afiliación */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2 text-white">
            Certificados de afiliación
          </h2>
          <p className="text-gray-300 text-center mb-4">
            Solicita y descarga tu certificado de afiliación aquí.
          </p>
          <Link
            href="/servicios/certificados"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
          >
            Ir a certificados
          </Link>
        </div>
        {/* Tarjeta de Asistente Virtual */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2 text-white">
            Asistente Virtual
          </h2>
          <p className="text-gray-300 text-center mb-4">
            Habla con nuestro asistente virtual para resolver tus dudas.
          </p>
          <Link
            href="/servicios/chat"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
          >
            Ir al Asistente
          </Link>
        </div>
        {/* Tarjeta de Préstamos */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2 text-white">
            Préstamo de Inventario y Salón
          </h2>
          <p className="text-gray-300 text-center mb-4">
            Solicita el préstamo de sillas, mesas y el salón comunal.
          </p>
          <Link
            href="/servicios/prestamos"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform hover:scale-105"
          >
            Solicitar Préstamo
          </Link>
        </div>
        {/* Puedes agregar más tarjetas aquí */}
      </div>
    </div>
  );
}
