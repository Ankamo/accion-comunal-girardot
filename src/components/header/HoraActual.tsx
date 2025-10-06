import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function HoraActual() {
  const [hora, setHora] = useState("");

  useEffect(() => {
    const updateHora = () => {
      const now = new Date();
      setHora(
        now.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateHora();
    const interval = setInterval(updateHora, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="flex items-center gap-1">
      <Clock size={14} /> {hora}
    </span>
  );
}
