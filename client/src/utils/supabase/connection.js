import { createClient } from "@supabase/supabase-js";

// Ottieni questi valori dalla tua dashboard di Supabase
const supabaseUrl = "https://lcifhlixvidmtkylidkx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjaWZobGl4dmlkbXRreWxpZGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4NjY4NTQsImV4cCI6MjAzMTQ0Mjg1NH0.p-5nQtZWvy_zJtULbF-8WQyl2wOWzSFayr1gimRGni4"; // Usa la chiave anonima per operazioni dal lato client

const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (img) => {
  console.log(img);
  const { data, error } = await supabase.storage
    .from("Pokemon")
    .upload(`Images/${img.name}`, img);

  if (error) {
    console.error("Errore durante l'upload:", error.message);
  } else {
    console.log("File caricato con successo:", data);
  }
};
