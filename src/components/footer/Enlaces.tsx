export default function Enlaces() {
  return (
    <div>
      <h3 className="font-bold text-lg mb-2 text-[#19295A] dark:text-blue-200">
        Enlaces Institucionales
      </h3>
      <ul className="text-base text-gray-700 dark:text-gray-200 space-y-1">         
        <li>
          <a href="/enlaces/organizaciones-comunales" className="hover:underline text-blue-700 dark:text-blue-300">
            Organizaciones de Accion Comunal
          </a>
        </li>
        <li>
          <a href="/enlaces/registro-organizaciones" className="hover:underline text-blue-700 dark:text-blue-300">
            Registro de Organizaciones
          </a>
        </li>
        <li>
          <a href="/enlaces/servicios-digitales" className="hover:underline text-blue-700 dark:text-blue-300">
            Servicios Digitales
          </a>
        </li>
        <li>
          <a href="/enlaces/soporte-tecnico" className="hover:underline text-blue-700 dark:text-blue-300">
            Soporte Técnico
          </a>
        </li>
        <li>
          <a href="/enlaces/contacto-entidad" className="hover:underline text-blue-700 dark:text-blue-300">
            Contacto Entidad Comunal
          </a>
        </li>
        <li>
          <a href="/enlaces/pqrs" className="hover:underline text-blue-700 dark:text-blue-300">
            PQRS
          </a>
        </li>
      </ul>
    </div>
  );
}
