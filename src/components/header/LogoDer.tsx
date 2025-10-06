import Image from "next/image";

type LogoDerProps = {
  src?: string;
};

export default function LogoDer({ src }: LogoDerProps) {
  return (
    <a
      href="https://confederacionnacionaldeaccioncomunal.org/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Confederación Nacional de Acción Comunal"
    >
      <Image
        src={src || "/LogoComunal.png"}
        alt="Logo Derecho"
        width={85}
        height={85}
        className="object-contain cursor-pointer transition-transform duration-300 hover:scale-110"
      />
    </a>
  );
}
