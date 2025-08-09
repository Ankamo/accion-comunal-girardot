import type { Metadata } from "next";
import "../styles/globals.css"; // Ruta corregida para globals.css

export const metadata: Metadata = {
  title: "Cordicom - Comunicación y Desarrollo Digital",
  description: "Entidad dedicada a impulsar la comunicación innovadora y el desarrollo de soluciones digitales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}