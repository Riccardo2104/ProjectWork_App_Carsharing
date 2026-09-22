export interface Vehicle {
  id: string;
  type: "car" | "bike";
  owner_type: "fleet" | "private";
  status: "available" | "booked";
  location: { lat: number; lng: number };
  available_from: string;
  make: string;
  model: string;
  rate_per_hour: number;
}

export interface Booking {
  id: string;
  vehicle_id: string;
  vehicle_type: "car" | "bike";
  start_date: string;
  user_id: string;
  created_at: string;
}

export interface BookingRequest {
  vehicle_id: string;
  start_date: string;
  vehicle_type: "car" | "bike";
}

export interface BookingResult {
  success: boolean;
  booking?: Booking;
  error?: string;
}
