"use client";
// Elimina Nav, Header y Footer de aquí, ya están en layout.tsx

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa] dark:bg-[#18181b] transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Contenido removido */}
      </main>
    </div>
  );
}
