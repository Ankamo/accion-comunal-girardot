import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        {/* Aquí puedes usar el logo de Cordicom. Por ahora, es un placeholder. */}
        <Image
          className="dark:invert"
          src="/logo-cordicom.svg"
          alt="Logo de Cordicom"
          width={180}
          height={180}
          priority
        />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Cordicom - Comunicación y Desarrollo Digital
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Somos una entidad dedicada a impulsar la comunicación innovadora y el desarrollo de soluciones digitales para el bienestar de la comunidad.
        </p>

        <a
          href="#"
          className="mt-6 rounded-full bg-blue-600 text-white px-8 py-3 text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Contáctanos
        </a>
      </main>
    </div>
  );
}