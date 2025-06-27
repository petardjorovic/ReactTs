import supabase from "./supabase";

export type CabinType = {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

export async function getCabins(): Promise<CabinType[]> {
  const { data, error } = await supabase
    .from<"cabins", CabinType>("cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
