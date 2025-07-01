import type { CabinFormValues } from "../features/cabins/CreateCabinForm";
import type { Database } from "../types/supabase";
import supabase from "./supabaseClient";

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

export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data ?? [];
}

type EditCabinFormValues = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

export async function editCabin(
  newCabin: EditCabinFormValues,
  id: number
): Promise<Cabin> {
  const hasImagePath = typeof newCabin.image === "string";
  const imageFile = !hasImagePath ? newCabin.image[0] : null;
  const imageName =
    imageFile instanceof File
      ? `${Math.random()}-${imageFile?.name}`.replaceAll("/", "")
      : null;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL as string
      }/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. update cabin

  const { data, error } = await supabase
    .from("cabins")
    .update({
      name: newCabin.name,
      maxCapacity: newCabin.maxCapacity,
      regularPrice: newCabin.regularPrice,
      discount: newCabin.discount,
      description: newCabin.description,
      image: imagePath as string,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  // 2. upload image (if new)
  if (!hasImagePath && imageFile) {
    console.log(imageName, imageFile);

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName!, imageFile);

    // 3. Delete cabin IF there was an error uploading image
    if (storageError) {
      console.error(storageError);
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Cabin image upload failed. Cabin was rolled back.");
    }
  }

  return data;
}

export async function createCabin(newCabin: CabinFormValues): Promise<Cabin> {
  const imageFile = newCabin.image[0];
  const imageName =
    imageFile instanceof File
      ? `${Math.random()}-${imageFile.name}`.replaceAll("/", "")
      : null;
  const imagePath =
    typeof newCabin.image === "string"
      ? newCabin.image
      : `${
          import.meta.env.VITE_SUPABASE_URL as string
        }/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create cabin
  const { data: insertData, error: insertError } = await supabase
    .from("cabins")
    .insert([
      {
        name: newCabin.name,
        maxCapacity: newCabin.maxCapacity,
        regularPrice: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: imagePath,
      },
    ])
    .select()
    .single();

  if (insertError) {
    console.error(insertError);
    throw new Error("Cabin could not be created");
  }

  if (!imageName) return insertData;

  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile);

  // 3. Delete cabin IF there was an error uploading image
  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", insertData.id);
    throw new Error(
      "Cabin image could not be created and the cabin was not created"
    );
  }

  return insertData;
}

export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
