import { vehicles, bookings } from "../data/mockData";
import type { Vehicle, BookingRequest, BookingResult, Booking } from "../types";

const MOCK_USER_ID = "user_luca_bianchi";

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  // Simulate network latency
  await delay(300);
  return vehicles.filter((v) => v.status === "available");
}

export async function createBooking(req: BookingRequest): Promise<BookingResult> {
  await delay(800);

  const vehicle = vehicles.find((v) => v.id === req.vehicle_id);
  if (!vehicle) return { success: false, error: "Veicolo non trovato." };

  // Check vehicle is still available
  if (vehicle.status !== "available") {
    return {
      success: false,
      error: "Veicolo non più disponibile. Potrebbe essere stato prenotato da un altro utente.",
    };
  }

  // Validate 24h window
  const availableFrom = new Date(vehicle.available_from);
  const windowEnd = new Date(availableFrom.getTime() + 24 * 3600_000);
  const startDate = new Date(req.start_date);

  if (startDate < availableFrom || startDate > windowEnd) {
    return {
      success: false,
      error: `La data richiesta non rientra nella finestra di prenotazione consentita (entro 24h da ${formatDate(availableFrom)}).`,
    };
  }

  // Simulate payment charge
  console.log(`[PAYMENT] Addebito simulato per utente ${MOCK_USER_ID}: veicolo ${vehicle.make} ${vehicle.model} @ €${vehicle.rate_per_hour}/h`);

  // Update vehicle status
  vehicle.status = "booked";

  // Record booking
  const booking: Booking = {
    id: `bk_${Date.now()}`,
    vehicle_id: req.vehicle_id,
    vehicle_type: req.vehicle_type,
    start_date: req.start_date,
    user_id: MOCK_USER_ID,
    created_at: new Date().toISOString(),
  };
  bookings.push(booking);

  return { success: true, booking };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDate(date: Date) {
  return date.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
