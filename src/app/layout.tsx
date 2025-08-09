import React from 'react'
import '@/styles/globals.css'
import Header from '@/components/header'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Junta de Acción Comunal del Barrio de Rosa Blanca',
  description: 'Sitio oficial de la Junta de Acción Comunal del barrio Rosa Blanca, promoviendo la participación ciudadana y el desarrollo comunitario.',
  icons: {
    icon: '/LogoJac.png', // Path to your favicon
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-[#f5f6fa] text-[#18181b] dark:bg-[#18181b] dark:text-[#f5f6fa] font-sans antialiased transition-colors duration-300">
        <Header />
        <Nav />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}