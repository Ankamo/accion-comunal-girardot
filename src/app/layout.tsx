import React from 'react'
import '@/styles/globals.css'
import Header from '@/components/header'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Head from 'next/head'

export const metadata = {
  title: 'Junta de Acción Comunal del Barrio de Rosa Blanca',
  description: 'Sitio oficial de la Junta de Acción Comunal del barrio Rosa Blanca, promoviendo la participación ciudadana y el desarrollo comunitario.',
  icons: {
    icon: '/LogoJac.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Actividades de la JAC Barrio Rosa Blanca" />
        <meta
          property="og:description"
          content="Consulta las actividades y eventos realizados por la Junta de Acción Comunal del Barrio Rosa Blanca en el periodo 2022-2026."
        />
        <meta
          property="og:image"
          content="https://jacbarriorosablancagirardot.vercel.app/assets/img/logoOac.png"
        />
        <meta property="og:url" content="https://jacbarriorosablancagirardot.vercel.app/actividades" />
        <meta property="og:type" content="website" />

        {/* Twitter Card (opcional, para que también se vea bonito en Twitter/X) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Actividades de la JAC Barrio Rosa Blanca" />
        <meta
          name="twitter:description"
          content="Consulta las actividades y eventos realizados por la Junta de Acción Comunal del Barrio Rosa Blanca en el periodo 2022-2026."
        />
        <meta
          name="twitter:image"
          content="https://jacbarriorosablancagirardot.vercel.app/assets/img/logoOac.png"
        />
      </Head>
      <body className="min-h-screen bg-[#f5f6fa] text-[#18181b] dark:bg-[#18181b] dark:text-[#f5f6fa] font-sans antialiased transition-colors duration-300">
        <Header />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
