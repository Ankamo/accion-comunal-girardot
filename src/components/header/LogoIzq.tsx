import Image from "next/image";
import Link from "next/link";

type LogoIzqProps = {
  src?: string;
};

export default function LogoIzq({ src }: LogoIzqProps) {
  return (
    <Link href="/" aria-label="Inicio">
      <Image
        src={src || "/LogoJac.png"}
        alt="Logo Izquierdo"
        width={70}
        height={70}
        className="object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
      />
    </Link>
  );
}
