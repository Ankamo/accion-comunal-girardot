// components/ContactForm.tsx
"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    residenceAddress: '',
    email: '',
    messageType: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // La propiedad 'files' solo existe en 'HTMLInputElement', por lo que comprobamos el tipo antes de acceder
    if (type === 'file' && (e.target as HTMLInputElement).files) {
      // Limita la selección a un máximo de 5 archivos y nos aseguramos de que los tipos coincidan
      const filesArray = Array.from((e.target as HTMLInputElement).files as FileList);
      setSelectedFiles(filesArray.slice(0, 5));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    // Preparamos los datos del formulario
    const formElement = e.target as HTMLFormElement;
    const data = new FormData(formElement);

    // Reemplaza esta URL con la URL de tu Google Form.
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1uBRJXZkd_8vQCohDEmJtlo_4cnriJmcSI4XMUcJXU9A/formResponse";

    // AVISO IMPORTANTE:
    // El método 'no-cors' no es compatible con el envío de archivos a Google Forms.
    // Aunque el campo de archivo está aquí, esta llamada a fetch no enviará el archivo.
    // Para subir archivos, necesitarías una solución de backend.
    if (selectedFiles.length > 0) {
      console.warn('La carga de archivos a través de este método no es compatible. Se requiere un backend.');
    }

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      setStatus('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
      setFormData({ name: '', residenceAddress: '', email: '', messageType: '' }); // Limpia el formulario
      setSelectedFiles([]); // Limpia los archivos seleccionados
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus('Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-lg mx-auto">
      <div>
        <label htmlFor="name" className="sr-only">Nombre Completo</label>
        <input
          id="name"
          // Reemplaza con el ID de entrada de tu campo "Nombre Completo" en el Google Form
          name="entry.1003617866"
          type="text"
          required
          className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-gray-50 dark:bg-gray-800"
          placeholder="Nombre Completo"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="residenceAddress" className="sr-only">Dirección de Residencia</label>
        <input
          id="residenceAddress"
          // Reemplaza con el ID de entrada de tu campo "Dirección de Residencia" en el Google Form
          name="entry.1623615862"
          type="text"
          required
          className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-gray-50 dark:bg-gray-800"
          placeholder="Dirección de Residencia"
          value={formData.residenceAddress}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Correo Electrónico</label>
        <input
          id="email"
          // Reemplaza con el ID de entrada de tu campo "Correo Electrónico" en el Google Form
          name="entry.2117185795"
          type="email"
          autoComplete="email"
          required
          className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-gray-50 dark:bg-gray-800"
          placeholder="Tu Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="messageType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Mensaje</label>
        <div className="mt-2 space-y-2">
          {["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación", "Solicitud"].map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={`messageType-${option}`}
                name="entry.1234567892" // Reemplaza con el ID de entrada de tu campo "Tipo de Mensaje" en el Google Form
                type="radio"
                required
                value={option}
                checked={formData.messageType === option}
                onChange={handleChange}
                className="focus:ring-[#4CAF50] h-4 w-4 text-[#4CAF50] border-gray-300"
              />
              <label htmlFor={`messageType-${option}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Enviar Fotos
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4v4m-4 4h.01"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-[#4CAF50] hover:text-[#45a049] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#4CAF50] dark:bg-gray-800"
              >
                <span>Subir hasta 5 archivos</span>
                <input
                  id="file-upload"
                  name="entry.1234567893" // Reemplaza con el ID de entrada de tu campo de archivo en el Google Form
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
              <p className="pl-1">o arrastrar y soltar</p>
            </div>
            {selectedFiles.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-sm text-gray-500">
                    {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            )}
            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB por archivo</p>
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-[#4CAF50] hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </div>
      {status && (
        <p className="mt-4 text-center text-sm font-medium text-[#4CAF50]">
          {status}
        </p>
      )}
    </form>
  );
}
