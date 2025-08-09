import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CORDEPEC - Emprendimiento y Desarrollo Comunitario",
  description: "Corporación de Emprendimiento y Desarrollo Comunitario en Girardot. Fomentamos el liderazgo y el desarrollo sostenible.",
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