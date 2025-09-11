"use client";

import React, { useState } from "react";

export default function Permisos() {
  const [mostrarModal, setMostrarModal] = useState(true);

  async function solicitarPermisos() {
    try {
      // 📍 Ubicación
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log("Ubicación:", pos.coords.latitude, pos.coords.longitude);
          },
          (err) => console.error("Error en ubicación:", err)
        );
      }

      // 📷🎤 Cámara y micrófono
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Acceso a cámara/micrófono:", stream);

    } catch (err) {
      console.error("Error en permisos:", err);
    } finally {
      setMostrarModal(false);
    }
  }

  return (
    <div>
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-md text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
              Permisos necesarios
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Esta aplicación solicita acceso a:
            </p>
            <ul className="text-left text-sm text-gray-700 dark:text-gray-200 mb-4 list-disc pl-6">
              <li>📍 Ubicación (para mostrar tu ciudad)</li>
              <li>📷 Cámara (para escanear QR o tomar foto)</li>
              <li>🎤 Micrófono (para grabación o videollamadas)</li>
            </ul>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={solicitarPermisos}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
