import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "[Supabase Client Warning] SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diset di Environment Variables!",
  );
}

// Klien Supabase main registry
export const supabase = createClient(supabaseUrl, supabaseKey);

