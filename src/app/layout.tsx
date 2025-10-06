import React from 'react'
import '@/styles/globals.css'
import Header from '@/components/header'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
//import Permisos from '@/components/permisos'   // 👈 nuevo

export const metadata = {
  title: 'Junta de Acción Comunal del Barrio de Rosa Blanca',
  description:
    'Sitio oficial de la Junta de Acción Comunal del barrio Rosa Blanca, promoviendo la participación ciudadana y el desarrollo comunitario.',
  icons: {
    icon: '/LogoJac.png',
  },
  openGraph: {
    title: 'Actividades de la JAC Barrio Rosa Blanca',
    description:
      'Consulta las actividades y eventos realizados por la Junta de Acción Comunal del Barrio Rosa Blanca en el periodo 2022-2026.',
    url: 'https://jacbarriorosablancagirardot.vercel.app/actividades',
    type: 'website',
    images: [
      {
        url: 'https://jacbarriorosablancagirardot.vercel.app/assets/img/logoOac.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Actividades de la JAC Barrio Rosa Blanca',
    description:
      'Consulta las actividades y eventos realizados por la Junta de Acción Comunal del Barrio Rosa Blanca en el periodo 2022-2026.',
    images: [
      'https://jacbarriorosablancagirardot.vercel.app/assets/img/logoOac.png',
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-[#f5f6fa] text-[#18181b] dark:bg-[#18181b] dark:text-[#f5f6fa] font-sans antialiased transition-colors duration-300">
        {/* 👇 El modal de permisos debe ir dentro del body */}
        {/* <Permisos /> */}
        <Header />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
