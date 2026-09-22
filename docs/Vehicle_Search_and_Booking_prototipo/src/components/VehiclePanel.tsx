import { useState, useEffect } from "react";
import type { Vehicle } from "../types";
import { createBooking } from "../api";
import {
  X,
  Car,
  Bike,
  Building2,
  User,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface Props {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookingSuccess: (vehicleId: string) => void;
}

const OWNER_LABEL: Record<string, string> = { fleet: "Flotta aziendale", private: "Privato" };
const TYPE_LABEL: Record<string, string> = { car: "Automobile", bike: "Bicicletta" };

const MARKER_COLORS: Record<string, Record<string, string>> = {
  car: { fleet: "#3B82F6", private: "#A855F7" },
  bike: { fleet: "#10B981", private: "#F59E0B" },
};

function formatWindowDate(iso: string) {
  return new Date(iso).toLocaleString("it-IT", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toLocalInputValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

function getBookingWindow(vehicle: Vehicle) {
  const from = new Date(vehicle.available_from);
  const to = new Date(from.getTime() + 24 * 3600_000);
  return { from, to };
}

export default function VehiclePanel({ vehicle, onClose, onBookingSuccess }: Props) {
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicle) return;
    setResult(null);
    setDateError(null);

    const { from, to } = getBookingWindow(vehicle);
    const now = new Date();

    // Pre-fill with a sensible default
    if (now >= from && now <= to) {
      setStartDate(toLocalInputValue(now));
    } else if (now < from) {
      setStartDate(toLocalInputValue(from));
    } else {
      setStartDate(toLocalInputValue(from)); // expired — show from date
    }
  }, [vehicle]);

  if (!vehicle) return null;

  const { from: windowFrom, to: windowTo } = getBookingWindow(vehicle);
  const now = new Date();
  const isExpired = windowTo < now;
  const accentColor = MARKER_COLORS[vehicle.type][vehicle.owner_type];

  const validateDate = (value: string) => {
    if (!value) {
      setDateError("Seleziona una data di inizio.");
      return false;
    }
    const selected = new Date(value);
    if (selected < windowFrom || selected > windowTo) {
      setDateError(
        `Data fuori dalla finestra consentita: ${formatWindowDate(windowFrom.toISOString())} → ${formatWindowDate(windowTo.toISOString())}.`
      );
      return false;
    }
    setDateError(null);
    return true;
  };

  const handleDateChange = (value: string) => {
    setStartDate(value);
    if (value) validateDate(value);
    else setDateError(null);
  };

  const handleBook = async () => {
    if (!validateDate(startDate)) return;
    setLoading(true);
    setResult(null);

    const res = await createBooking({
      vehicle_id: vehicle.id,
      start_date: new Date(startDate).toISOString(),
      vehicle_type: vehicle.type,
    });

    setLoading(false);
    if (res.success) {
      setResult({ success: true, message: "Prenotazione confermata! Il veicolo è stato riservato." });
      setTimeout(() => {
        onBookingSuccess(vehicle.id);
        onClose();
      }, 2200);
    } else {
      setResult({ success: false, message: res.error ?? "Errore sconosciuto." });
    }
  };

  const canBook = !isExpired && !dateError && startDate && !loading && !result?.success;

  return (
    <div className="vehicle-panel">
      {/* Header */}
      <div className="panel-header" style={{ borderBottom: `2px solid ${accentColor}22` }}>
        <div className="panel-badge" style={{ background: `${accentColor}20`, color: accentColor }}>
          {vehicle.type === "car" ? (
            <Car size={14} strokeWidth={2.5} />
          ) : (
            <Bike size={14} strokeWidth={2.5} />
          )}
          {TYPE_LABEL[vehicle.type]}
        </div>
        <button className="panel-close" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="panel-body">
        {/* Vehicle title */}
        <div className="panel-title-row">
          <div
            className="panel-vehicle-icon"
            style={{ background: `${accentColor}18`, color: accentColor }}
          >
            {vehicle.type === "car" ? <Car size={28} /> : <Bike size={28} />}
          </div>
          <div>
            <h2 className="panel-vehicle-name">
              {vehicle.make} {vehicle.model}
            </h2>
            <div className="panel-vehicle-sub">
              {vehicle.owner_type === "fleet" ? (
                <Building2 size={13} />
              ) : (
                <User size={13} />
              )}
              {OWNER_LABEL[vehicle.owner_type]}
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="panel-info-grid">
          <div className="panel-info-cell">
            <span className="info-label">Tariffa</span>
            <span className="info-value" style={{ color: accentColor }}>
              €{vehicle.rate_per_hour}/h
            </span>
          </div>
          <div className="panel-info-cell">
            <span className="info-label">Tipo</span>
            <span className="info-value">{TYPE_LABEL[vehicle.type]}</span>
          </div>
          <div className="panel-info-cell">
            <span className="info-label">Proprietà</span>
            <span className="info-value">{OWNER_LABEL[vehicle.owner_type]}</span>
          </div>
          <div className="panel-info-cell">
            <span className="info-label">Stato</span>
            <span className="info-value status-available">Disponibile</span>
          </div>
        </div>

        {/* Booking window */}
        <div className={`booking-window ${isExpired ? "expired" : "active"}`}>
          <div className="bw-label">
            <Clock size={14} />
            Finestra di prenotazione
          </div>
          <div className="bw-range">
            <span>{formatWindowDate(windowFrom.toISOString())}</span>
            <span className="bw-arrow">→</span>
            <span>{formatWindowDate(windowTo.toISOString())}</span>
          </div>
          {isExpired && (
            <div className="bw-expired-msg">
              <AlertTriangle size={13} />
              La finestra di prenotazione è scaduta. Questo veicolo non può più essere prenotato.
            </div>
          )}
        </div>

        {/* Date picker */}
        {!isExpired && (
          <div className="form-group">
            <label className="form-label">
              <Clock size={14} />
              Data e ora di inizio
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={toLocalInputValue(windowFrom)}
              max={toLocalInputValue(windowTo)}
              className={`date-input ${dateError ? "date-input--error" : ""}`}
            />
            {dateError && (
              <div className="field-error">
                <AlertTriangle size={12} />
                {dateError}
              </div>
            )}
          </div>
        )}

        {/* Result message */}
        {result && (
          <div className={`result-msg ${result.success ? "result-msg--ok" : "result-msg--err"}`}>
            {result.success ? (
              <CheckCircle size={16} />
            ) : (
              <AlertTriangle size={16} />
            )}
            {result.message}
          </div>
        )}

        {/* Simulated user info */}
        <div className="user-info-row">
          <div className="user-avatar">LB</div>
          <div>
            <div className="user-name">Luca Bianchi</div>
            <div className="user-meta">
              <CreditCard size={11} />
              Visa •••• 4821 · registrata
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          className={`book-btn ${canBook ? "book-btn--active" : "book-btn--disabled"}`}
          style={canBook ? { background: accentColor } : {}}
          onClick={handleBook}
          disabled={!canBook}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="spin" />
              Prenotazione in corso…
            </>
          ) : isExpired ? (
            <>
              <AlertTriangle size={16} />
              Finestra scaduta — non prenotabile
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              Conferma prenotazione
            </>
          )}
        </button>
      </div>
    </div>
  );
}
