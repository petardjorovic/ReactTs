import type { Database } from "../types/supabase";
import supabase from "./supabaseClient";

export type Settings = Database["public"]["Tables"]["settings"]["Row"];

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

export type NewSettingProp = {
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestPerBooking?: number;
  breakfastPrice?: number;
};

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(
  newSetting: NewSettingProp
): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
