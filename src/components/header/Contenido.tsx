type ContenidoProps = {
  nombreOac: string;
  lema?: string;
  numeroNit?: string;
  numeroPersoneria?: string;
  numeroRuc?: string;
  ciudad?: string;
  departamento?: string;
};

export default function Contenido({
  nombreOac,
  lema,
  numeroNit,
  numeroPersoneria,
  numeroRuc,
  ciudad,
  departamento,
}: ContenidoProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{nombreOac}</h1>
      <p className="italic text-sm md:text-base text-gray-700 dark:text-gray-300">{lema || "Trabajando por la comunidad"}</p>
      <div className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
        <div>{numeroNit && `NIT: ${numeroNit}`}</div>
        <div>{numeroPersoneria && `Personería Jurídica ${numeroPersoneria}`}</div>
        <div>{numeroRuc && `RUC: ${numeroRuc}`}</div>
        <div>{ciudad}, {departamento}</div>
      </div>
    </div>
  );
}
