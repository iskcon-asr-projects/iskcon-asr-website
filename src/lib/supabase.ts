import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Reverted to Supabase storage
export const uploadImage = async (file: File, bucket: string = "events") => {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) {
    console.error(`Upload error in ${bucket}:`, error);
    return null;
  }

  // This returns the public URL of the uploaded image
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
};