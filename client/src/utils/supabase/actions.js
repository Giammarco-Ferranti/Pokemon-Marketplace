import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export async function deleteImage(changePrefix) {
  const { data, error } = await supabase.storage
    .from("Pokemon")
    .remove(changePrefix);
  return data;
}
export async function uploadImage(img) {
  const { data, error } = await supabase.storage
    .from("Pokemon")
    .upload(`Images/${img.name}`, img);

  return data;
}
