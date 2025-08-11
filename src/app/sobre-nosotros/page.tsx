// El componente se renderiza del lado del cliente para permitir la interactividad si se necesita.
"use client";

import React from "react";
import Image from "next/image"; // Importamos Image para la galería

export default function AboutUsPage() {
  return (
    // Contenedor principal para el fondo oscuro y el texto claro
    <div className="w-full min-h-screen text-gray-200 font-sans">
      {/* Barra de navegación sticky para un acceso rápido a las secciones */}
      <nav className="sticky top-0 bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center py-4 px-4 text-sm font-semibold">
          <a href="#quienes-somos" className="mx-2 my-1 text-gray-200 hover:text-gray-400 transition duration-300 transform hover:scale-105">
            Quiénes somos
          </a>
          <a href="#identidad-corporativa" className="mx-2 my-1 text-gray-200 hover:text-gray-400 transition duration-300 transform hover:scale-105">
            Identidad Corporativa
          </a>
          <a href="#historia" className="mx-2 my-1 text-gray-200 hover:text-gray-400 transition duration-300 transform hover:scale-105">
            Historia
          </a>
          <a href="#equipo-de-dignatarios" className="mx-2 my-1 text-gray-200 hover:text-gray-400 transition duration-300 transform hover:scale-105">
            Equipo de Dignatarios
          </a>
          <a href="#proyectos" className="mx-2 my-1 text-gray-200 hover:text-gray-400 transition duration-300 transform hover:scale-105">
            Proyectos
          </a>
          <a href="#galeria" className="mx-2 my-1 text-gray-200 hover:text-gray-400 transition duration-300 transform hover:scale-105">
            Galería
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Título principal de la página. */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
          Sobre nosotros
        </h1>

        {/* Sección "Quiénes somos" */}
        <section id="quienes-somos" className="mb-10 pt-24 -mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-gray-500 pb-2 text-gray-200">
            Quiénes somos
          </h2>
          <p className="text-base text-gray-200 leading-relaxed">
            La JAC Rosa Blanca es una organización comunitaria comprometida con el desarrollo y bienestar de nuestro barrio. Trabajamos de manera activa para fortalecer los lazos vecinales, promover la participación ciudadana y gestionar proyectos que mejoren la calidad de vida de todos nuestros habitantes.
          </p>
        </section>

        {/* Sección "Identidad Corporativa" */}
        <section id="identidad-corporativa" className="mb-10 pt-24 -mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-gray-500 pb-2 text-gray-200">
            Identidad Corporativa
          </h2>
          {/* Subsección "Misión" */}
          <div className="mb-8 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">
              Misión
            </h3>
            <p className="text-base text-gray-200 leading-relaxed">
              Nuestra misión es representar y defender los intereses de la comunidad de Rosa Blanca, fomentando la convivencia pacífica, la solidaridad y el desarrollo sostenible a través de la gestión de iniciativas y la participación activa de los vecinos en la toma de decisiones.
            </p>
          </div>
          {/* Subsección "Visión" */}
          <div className="mb-8 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">
              Visión
            </h3>
            <p className="text-base text-gray-200 leading-relaxed">
              Nos visualizamos como una comunidad modelo, organizada y autogestionada, donde cada vecino se sienta parte activa del progreso del barrio. Buscamos ser un referente de liderazgo comunitario, innovación social y compromiso cívico en nuestra localidad.
            </p>
          </div>
          {/* Subsección "Principios y Valores" */}
          <div className="mb-8 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">
              Principios y Valores
            </h3>
            <ul className="list-disc list-inside text-base text-gray-200 leading-relaxed">
              <li>Solidaridad</li>
              <li>Transparencia</li>
              <li>Participación</li>
              <li>Compromiso</li>
              <li>Respeto</li>
            </ul>
          </div>
          {/* Subsección "Objetivos" */}
          <div className="mb-8 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">
              Objetivos
            </h3>
            <ul className="list-disc list-inside text-base text-gray-200 leading-relaxed">
              <li>Mejorar la seguridad del barrio.</li>
              <li>Promover la cultura y el deporte.</li>
              <li>Gestionar proyectos de infraestructura.</li>
              <li>Fomentar la participación de los jóvenes.</li>
            </ul>
          </div>
          {/* Subsección "Símbolos" */}
          <div className="p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">
              Símbolos
            </h3>
            <div className="space-y-6 text-base text-gray-200 leading-relaxed">
              <p>
                **Escudo:**
                <br />
                [Descripción del escudo de la JAC]
              </p>
              <p>
                **Bandera:**
                <br />
                [Descripción de la bandera de la JAC]
              </p>
              <p>
                **Himno:**
                <br />
                [Letra del himno de la JAC]
              </p>
            </div>
          </div>
        </section>

        {/* Sección "Historia" */}
        <section id="historia" className="mb-10 pt-24 -mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-gray-500 pb-2 text-gray-200">
            Historia
          </h2>
          <p className="text-base text-gray-200 leading-relaxed">
            Fundada en el año [Año], la JAC Rosa Blanca ha sido testigo y protagonista de la evolución de nuestro barrio. Desde sus inicios, ha liderado importantes luchas por el mejoramiento de la infraestructura, la seguridad y los espacios públicos, consolidándose como un pilar fundamental para el desarrollo social y cultural de la comunidad.
          </p>
        </section>
        
        {/* Sección "Equipo de Dignatarios" */}
        <section id="equipo-de-dignatarios" className="mb-10 pt-24 -mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-gray-500 pb-2 text-gray-200">
            Equipo de Dignatarios
          </h2>
          
          {/* Contenedor principal del organigrama */}
          <div className="flex flex-col items-center py-8 px-4 text-center">

            {/* Nivel 1: Asamblea General de Afiliados */}
            <div className="relative w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-800 rounded-lg shadow-lg mb-6">
                <h3 className="font-bold text-xl text-gray-200">Asamblea General de Afiliados</h3>
                {/* Línea de conexión vertical */}
                <div className="absolute left-1/2 bottom-0 w-px h-6 bg-gray-500 transform -translate-x-1/2 translate-y-full"></div>
            </div>
            
            {/* Nivel 2: Junta Directiva */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-800 rounded-lg shadow-lg mb-6 relative">
                <h3 className="font-bold text-xl text-gray-200">Junta Directiva</h3>
                {/* Línea de conexión vertical */}
                <div className="absolute left-1/2 bottom-0 w-px h-6 bg-gray-500 transform -translate-x-1/2 translate-y-full"></div>
                {/* Línea de conexión horizontal para los tres nodos de abajo */}
                <div className="absolute left-0 right-0 bottom-0 w-full h-px bg-gray-500 transform translate-y-6"></div>
            </div>

            {/* Nivel 3: Fiscal, Presidencia, Comité de Convivencia */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full relative pt-12 space-y-6 md:space-y-0 md:space-x-8">
                {/* Línea vertical para Fiscal */}
                <div className="absolute left-[calc(1/6*100%)] top-0 w-px h-6 bg-gray-500"></div>
                {/* Línea vertical para Presidencia */}
                <div className="absolute left-1/2 top-0 w-px h-6 bg-gray-500 transform -translate-x-1/2"></div>
                {/* Línea vertical para Comité */}
                <div className="absolute left-[calc(5/6*100%)] top-0 w-px h-6 bg-gray-500"></div>
                
                {/* Fiscal */}
                <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h4 className="font-semibold text-lg text-gray-200">Fiscal</h4>
                </div>

                {/* Presidencia */}
                <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg relative">
                    <h4 className="font-semibold text-lg text-gray-200">Presidencia</h4>
                     {/* Línea de conexión vertical */}
                    <div className="absolute left-1/2 bottom-0 w-px h-6 bg-gray-500 transform -translate-x-1/2 translate-y-full"></div>
                </div>

                {/* Comité de Convivencia y Conciliación */}
                <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg relative">
                    <h4 className="font-semibold text-lg text-gray-200">Comité de Convivencia y Conciliación</h4>
                    {/* Línea de conexión vertical a Delegados */}
                    <div className="absolute left-1/2 bottom-0 w-px h-12 bg-gray-500 transform -translate-x-1/2 translate-y-full"></div>
                </div>
            </div>

            {/* Nivel 4: Vicepresidencia, Secretaría, Tesorería y Delegados */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full relative pt-12 space-y-6 md:space-y-0 md:space-x-8">
                {/* Línea horizontal que conecta Vicepresidencia, Secretaría y Tesorería */}
                <div className="hidden md:block absolute top-0 w-1/2 h-px bg-gray-500 left-1/2 transform -translate-x-1/2"></div>
                {/* Línea vertical desde Presidencia */}
                <div className="absolute left-1/2 top-0 w-px h-6 bg-gray-500 transform -translate-x-1/2"></div>
                
                {/* Vicepresidencia */}
                <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg relative">
                    <h4 className="font-semibold text-lg text-gray-200">Vicepresidencia</h4>
                    {/* Línea de conexión vertical a Coordinadores */}
                    <div className="absolute left-1/2 bottom-0 w-px h-6 bg-gray-500 transform -translate-x-1/2 translate-y-full"></div>
                </div>
                
                {/* Secretaría */}
                <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h4 className="font-semibold text-lg text-gray-200">Secretaría</h4>
                </div>
                
                {/* Tesorería */}
                <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h4 className="font-semibold text-lg text-gray-200">Tesorería</h4>
                </div>
                
                {/* Delegados */}
                <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg relative md:mt-16">
                    <h4 className="font-semibold text-lg text-gray-200">Delegados</h4>
                    {/* Línea vertical desde Comité */}
                    <div className="absolute left-1/2 top-0 w-px h-6 bg-gray-500 transform -translate-x-1/2 -translate-y-full"></div>
                </div>
            </div>
            
            {/* Nivel 5: Coordinadores de Comités */}
            <div className="w-full md:w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg mt-12 relative">
                 <h4 className="font-semibold text-lg text-gray-200">Coordinadores de Comités</h4>
                 {/* Línea de conexión vertical */}
                 <div className="absolute left-1/2 bottom-0 w-px h-6 bg-gray-500 transform -translate-x-1/2 translate-y-full"></div>
                 {/* Línea de conexión horizontal para los comités */}
                 <div className="absolute left-0 right-0 bottom-0 w-full h-px bg-gray-500 transform translate-y-6"></div>
            </div>

            {/* Nivel 6: Comités */}
            <div className="flex flex-wrap justify-center w-full gap-4 mt-8 relative pt-6">
                {/* Líneas verticales para cada comité */}
                <div className="absolute left-[calc(1/10*100%)] top-0 w-px h-6 bg-gray-500"></div>
                <div className="absolute left-[calc(3/10*100%)] top-0 w-px h-6 bg-gray-500"></div>
                <div className="absolute left-[calc(5/10*100%)] top-0 w-px h-6 bg-gray-500"></div>
                <div className="absolute left-[calc(7/10*100%)] top-0 w-px h-6 bg-gray-500"></div>
                <div className="absolute left-[calc(9/10*100%)] top-0 w-px h-6 bg-gray-500"></div>

                <div className="w-full md:w-1/5 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h5 className="font-semibold text-base text-gray-200">Obras Públicas</h5>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h5 className="font-semibold text-base text-gray-200">Deportes</h5>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h5 className="font-semibold text-base text-gray-200">Salud</h5>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h5 className="font-semibold text-base text-gray-200">Medio Ambiente</h5>
                </div>
                <div className="w-full md:w-1/5 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h5 className="font-semibold text-base text-gray-200">Capacitación y Educación</h5>
                </div>
            </div>
          </div>
        </section>

        {/* Sección "Proyectos" */}
        <section id="proyectos" className="mb-10 pt-24 -mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-gray-500 pb-2 text-gray-200">
            Proyectos
          </h2>
          <ul className="list-disc list-inside text-base text-gray-200 leading-relaxed">
            <li>Primera fase del salón comunal</li>
            <li>Dotaciones tecnológicas</li>
            <li>Pavimentación de la calle 32 entre carreras 12 y av Ciudad de las Acacias y la carrera 10 entre calles 32 y 33</li>
          </ul>
        </section>

        {/* Sección "Galería de Fotos" */}
        <section id="galeria" className="mb-10 pt-24 -mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 border-b-2 border-gray-500 pb-2 text-gray-200">
            Galería de Fotos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Image
              src="https://placehold.co/400x300/F3F4F6/000000?text=Evento+de+la+JAC+1"
              alt="Evento de la JAC 1"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="https://placehold.co/400x300/F3F4F6/000000?text=Proyecto+de+la+JAC+2"
              alt="Proyecto de la JAC 2"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <Image
              src="https://placehold.co/400x300/F3F4F6/000000?text=Miembros+de+la+JAC+3"
              alt="Miembros de la JAC 3"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>
        
        {/* Sección "Llamada a la Acción" */}
        <section className="text-center pt-24 -mt-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">
            ¡Únete a nuestra comunidad!
          </h2>
          <p className="text-base text-gray-200 mb-6">
            Participa en nuestros proyectos, eventos y ayúdanos a construir un mejor barrio para todos.
          </p>
          <a
            href="/afiliate"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
          >
            Afíliate o Contacta
          </a>
        </section>
      </div>
    </div>
  );
}

