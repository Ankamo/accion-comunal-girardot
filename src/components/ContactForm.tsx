// components/ContactForm.tsx
"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    // Preparamos los datos del formulario
    const formElement = e.target as HTMLFormElement;
    const data = new FormData(formElement);

    // TODO: Reemplaza esta URL con la URL de tu Google Form.
    // Para obtener la URL, ve a tu Google Form, haz clic en "Enviar" y luego en la pestaña "< >".
    // Copia la URL de "action" y asegúrate de que termine en "/formResponse".
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1uBRJXZkd_8vQCohDEmJtlo_4cnriJmcSI4XMUcJXU9A/formResponse";

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      setStatus('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
      setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
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
        <label htmlFor="name" className="sr-only">Nombre</label>
        <input
          id="name"
          // TODO: Reemplaza "entry.1234567890" con el ID de entrada de tu campo "Nombre"
          // Puedes encontrar este ID en el HTML de tu Google Form o usando la URL prellenada
          name="entry.1234567890"
          type="text"
          required
          className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-gray-50 dark:bg-gray-800"
          placeholder="Tu Nombre"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Correo electrónico</label>
        <input
          id="email"
          // TODO: Reemplaza "entry.1234567891" con el ID de entrada de tu campo "Correo"
          name="entry.1234567891"
          type="email"
          autoComplete="email"
          required
          className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-gray-50 dark:bg-gray-800"
          placeholder="Tu Correo electrónico"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Mensaje</label>
        <textarea
          id="message"
          // TODO: Reemplaza "entry.1234567892" con el ID de entrada de tu campo "Mensaje"
          name="entry.1234567892"
          rows={5}
          required
          className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-gray-50 dark:bg-gray-800"
          placeholder="Tu Mensaje"
          value={formData.message}
          onChange={handleChange}
        />
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
