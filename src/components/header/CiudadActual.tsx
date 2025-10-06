import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export default function CiudadActual() {
  const [ciudad, setCiudad] = useState("...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
            );
            const data = await res.json();
            setCiudad(data.address?.city || data.address?.town || data.address?.village || "Ubicación");
          } catch {
            setCiudad("Ubicación desconocida");
          }
        },
        () => setCiudad("Permiso denegado")
      );
    }
  }, []);

  return (
    <span className="flex items-center gap-1">
      <MapPin size={14} /> {ciudad}
    </span>
  );
}
