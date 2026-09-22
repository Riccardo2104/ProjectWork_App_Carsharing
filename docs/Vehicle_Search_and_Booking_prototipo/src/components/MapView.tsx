import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Vehicle } from "../types";

// Marker color matrix
const MARKER_COLORS: Record<string, Record<string, string>> = {
  car: { fleet: "#3B82F6", private: "#A855F7" },
  bike: { fleet: "#10B981", private: "#F59E0B" },
};

function createVehicleIcon(vehicle: Vehicle): L.DivIcon {
  const color = MARKER_COLORS[vehicle.type][vehicle.owner_type];
  const isExpired = isWindowExpired(vehicle.available_from);

  const svg =
    vehicle.type === "car"
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5v3H3v-9l2-5h14l2 5v9h-2v-3z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="m12 17 5-5-5-5-2 4H5"/></svg>`;

  const html = `
    <div style="
      width: 36px; height: 36px;
      background: ${color};
      border-radius: 50% 50% 50% 4px;
      transform: rotate(-45deg);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      border: 2px solid rgba(255,255,255,0.3);
      opacity: ${isExpired ? "0.55" : "1"};
    ">
      <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
        ${svg}
      </div>
    </div>`;

  return L.divIcon({
    html,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });
}

function isWindowExpired(availableFrom: string): boolean {
  const from = new Date(availableFrom);
  const windowEnd = new Date(from.getTime() + 24 * 3600_000);
  return windowEnd < new Date();
}

function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

interface Props {
  vehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  selectedId?: string;
}

export default function MapView({ vehicles, onSelectVehicle, selectedId }: Props) {
  return (
    <MapContainer
      center={[45.4654, 9.1895]}
      zoom={14}
      style={{ width: "100%", height: "100%" }}
      zoomControl={true}
    >
      <InvalidateSize />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      {vehicles.map((vehicle) => {
        const expired = isWindowExpired(vehicle.available_from);
        return (
          <Marker
            key={vehicle.id}
            position={[vehicle.location.lat, vehicle.location.lng]}
            icon={createVehicleIcon(vehicle)}
            eventHandlers={{
              click: () => onSelectVehicle(vehicle),
            }}
          >
            <Popup className="ecar-popup">
              <div style={{ fontFamily: "Inter, sans-serif", minWidth: 160 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#1a2535" }}>
                  {vehicle.make} {vehicle.model}
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
                  {vehicle.type === "car" ? "Auto" : "Bici"} ·{" "}
                  {vehicle.owner_type === "fleet" ? "Flotta" : "Privato"}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0ea5e9" }}>
                  €{vehicle.rate_per_hour}/h
                </div>
                {expired && (
                  <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>
                    ⚠ Finestra di prenotazione scaduta
                  </div>
                )}
                <button
                  onClick={() => onSelectVehicle(vehicle)}
                  style={{
                    marginTop: 8,
                    width: "100%",
                    padding: "6px 0",
                    background: "#0ea5e9",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Dettagli →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
