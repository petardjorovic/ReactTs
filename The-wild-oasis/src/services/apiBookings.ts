import type { Database } from "../types/supabase";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import type { Cabin } from "./apiCabins";
import supabase from "./supabaseClient";

export type BookingBase = Database["public"]["Tables"]["bookings"]["Row"];

type Guest = Database["public"]["Tables"]["guests"]["Row"];

type CabinInfo = {
  name: string | null;
};

type GuestInfo = {
  fullName: string | null;
  email: string | null;
};

export type BookingWithRelations = BookingBase & {
  cabins: CabinInfo | null;
  guests: GuestInfo | null;
};

export type SingleBookingWithRealtions = BookingBase & {
  cabins: Cabin | null;
  guests: Guest | null;
};

type GetBookingsProps = {
  filter?: {
    field: string;
    value: string | number;
    method?: string;
  } | null;
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
};

export async function getBookings({
  filter,
  sortBy,
  page,
}: GetBookingsProps): Promise<{
  data: BookingWithRelations[];
  count: number | null;
}> {
  const query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  // FILTER
  if (filter) {
    if (!filter.method || filter.method === "eq")
      query.eq(filter.field, filter.value);
    if (filter.method === "gte") query.gte(filter.field, filter.value);
  }

  // SORT
  if (sortBy)
    query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  // PAGINATION
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  if (page) query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data: data ?? [], count };
}

export async function getBooking(
  id: number
): Promise<SingleBookingWithRealtions> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

type UpdateObject = {
  status?: string;
  isPaid?: boolean;
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
};

export async function updateBooking(
  id: number,
  obj: UpdateObject
): Promise<BookingBase> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
