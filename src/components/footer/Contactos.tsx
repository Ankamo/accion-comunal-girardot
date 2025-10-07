import Image from "next/image";

type ContactosProps = {
  correo: string;
  llamadas: string;
  direccion: string;
  barrio: string;
  escudoPais: string;
  escudoDepto: string;
  escudoMunicipio: string;
  logoIVC: string;
};

export default function Contactos({
  correo,
  llamadas,
  direccion,
  barrio,
  escudoPais,
  escudoDepto,
  escudoMunicipio,
  logoIVC,
}: ContactosProps) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-bold text-lg mb-2 text-[#19295A] dark:text-blue-200">
        Contacto
      </h3>
      <div className="flex flex-col items-center gap-1 text-gray-700 dark:text-gray-200">
        <div className="flex items-center gap-2">
          {/* Correo */}
          <svg width="20" height="20" fill="currentColor" className="text-blue-200" viewBox="0 0 24 24">
            <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.01-8-5.01V6h16zM4 20V8.489l7.445 4.653a1 1 0 0 0 1.11 0L20 8.489V20H4z" />
          </svg>
          <span>{correo}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Teléfono */}
          <svg width="20" height="20" fill="currentColor" className="text-blue-200" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z" />
          </svg>
          <span>{llamadas}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Dirección */}
          <svg width="20" height="20" fill="currentColor" className="text-blue-200" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
          </svg>
          <span>{direccion}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Barrio */}
          <svg width="20" height="20" fill="currentColor" className="text-blue-200" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
          </svg>
          <span>{barrio}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Ciudad/Depto hardcoded */}
          <svg width="20" height="20" fill="currentColor" className="text-blue-200" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
          </svg>
          <span>Girardot - Cundinamarca</span>
        </div>
        <div className="flex flex-row items-center gap-2 mt-2">
          {/* Escudo del País */}
          <a href="https://www.presidencia.gov.co/" target="_blank" rel="noopener noreferrer" aria-label="Presidencia de la República de Colombia">
            <Image src={escudoPais} alt="Escudo País" width={28} height={28} className="object-contain transition-transform duration-300 hover:scale-110" />
          </a>
          {/* Escudo del Departamento */}
          <a href="https://www.cundinamarca.gov.co/home/" target="_blank" rel="noopener noreferrer" aria-label="Gobernación de Cundinamarca">
            <Image src={escudoDepto} alt="Escudo Departamento" width={28} height={28} className="object-contain transition-transform duration-300 hover:scale-110" />
          </a>
          {/* Escudo del Municipio */}
          <a href="http://girardot-cundinamarca.gov.co/Paginas/Inicio.aspx" target="_blank" rel="noopener noreferrer" aria-label="Alcaldía de Girardot">
            <Image src={escudoMunicipio} alt="Escudo Municipio" width={28} height={28} className="object-contain transition-transform duration-300 hover:scale-110" />
          </a>
          {/* Logo IVC */}
          <a href="http://idaco.gov.co/" target="_blank" rel="noopener noreferrer" aria-label="IDACO">
            <Image src={logoIVC} alt="Logo IVC" width={28} height={28} className="object-contain transition-transform duration-300 hover:scale-110" />
          </a>
        </div>
      </div>
    </div>
  );
}
