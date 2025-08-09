import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        {/* Aquí puedes usar el logo de CORDEPEC. Por ahora, es un placeholder. */}
        <Image
          className="dark:invert"
          src="/logo-cordepec.svg" 
          alt="Logo de CORDEPEC"
          width={180}
          height={180}
          priority
        />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Corporación de Emprendimiento CORDEPEC
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Somos una organización dedicada a fomentar el emprendimiento, el liderazgo y el desarrollo comunitario en Girardot y sus alrededores.
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
