import { useState, useEffect } from "react";
import type { Vehicle } from "./types";
import { getAvailableVehicles } from "./api";
import MapView from "./components/MapView";
import VehiclePanel from "./components/VehiclePanel";
import Legend from "./components/Legend";
import { MapPin, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

interface Toast {
  id: number;
  type: "success" | "error";
  message: string;
}

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAvailableVehicles().then((data) => {
      if (!cancelled) {
        setVehicles(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [refreshKey]);

  const addToast = (type: Toast["type"], message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleBookingSuccess = (vehicleId: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    addToast("success", "Prenotazione confermata! Il veicolo è stato rimosso dalla mappa.");
    setSelectedVehicle(null);
  };

  const handleSelectVehicle = (v: Vehicle) => {
    setSelectedVehicle(v);
  };

  const handleRefresh = () => {
    setSelectedVehicle(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="app-root">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-brand">
          <div className="topbar-logo">
            <MapPin size={18} strokeWidth={2.5} />
          </div>
          <span className="topbar-name">ecar</span>
          <span className="topbar-tagline">Car & Bike Sharing</span>
        </div>

        <div className="topbar-center">
          <span className="topbar-feature-badge">FEAT-02 · Ricerca e Prenotazione</span>
        </div>

        <div className="topbar-right">
          <button className="refresh-btn" onClick={handleRefresh} title="Aggiorna mappa">
            <RefreshCw size={15} />
          </button>
          <div className="user-chip">
            <div className="user-chip-avatar">LB</div>
            <span>Luca Bianchi</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="main-layout">
        {/* Map area */}
        <div className="map-area">
          {loading ? (
            <div className="map-loading">
              <div className="loading-spinner" />
              <span>Caricamento veicoli…</span>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="empty-overlay">
              <AlertCircle size={40} strokeWidth={1.5} />
              <h3>Nessun veicolo disponibile in questa zona</h3>
              <p>Prova ad aggiornare o controlla più tardi.</p>
              <button className="empty-refresh-btn" onClick={handleRefresh}>
                <RefreshCw size={14} />
                Aggiorna
              </button>
            </div>
          ) : (
            <MapView
              vehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
              selectedId={selectedVehicle?.id}
            />
          )}

          {/* Stats overlay */}
          {!loading && vehicles.length > 0 && (
            <div className="stats-overlay">
              <span className="stat-chip">
                <span className="stat-dot stat-dot--blue" />
                {vehicles.filter((v) => v.type === "car").length} auto
              </span>
              <span className="stat-chip">
                <span className="stat-dot stat-dot--green" />
                {vehicles.filter((v) => v.type === "bike").length} bici
              </span>
            </div>
          )}

          <Legend />
        </div>

        {/* Sidebar */}
        <div className={`sidebar ${selectedVehicle ? "sidebar--open" : ""}`}>
          {selectedVehicle ? (
            <VehiclePanel
              vehicle={selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
              onBookingSuccess={handleBookingSuccess}
            />
          ) : (
            <div className="sidebar-empty">
              <MapPin size={36} strokeWidth={1} />
              <h3>Seleziona un veicolo</h3>
              <p>Clicca su un marker sulla mappa per vedere i dettagli e prenotare.</p>

              <div className="sidebar-tip-list">
                <div className="sidebar-tip">
                  <span className="tip-dot" style={{ background: "#3B82F6" }} />
                  Auto di flotta
                </div>
                <div className="sidebar-tip">
                  <span className="tip-dot" style={{ background: "#A855F7" }} />
                  Auto privata
                </div>
                <div className="sidebar-tip">
                  <span className="tip-dot" style={{ background: "#10B981" }} />
                  Bici di flotta
                </div>
                <div className="sidebar-tip">
                  <span className="tip-dot" style={{ background: "#F59E0B" }} />
                  Bici privata
                </div>
              </div>

              <div className="sidebar-rule-box">
                <AlertCircle size={14} />
                <span>Puoi prenotare solo entro 24h dal primo giorno di disponibilità del veicolo.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast stack */}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`}>
            {t.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
