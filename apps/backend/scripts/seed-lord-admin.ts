import { supabase } from "../src/infrastructure/database/supabase/client";

// Seed lord admin
const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] ?? "Lord Admin";

if (!email || !password) {
  console.error(
    "Usage: bun run scripts/seed-lord-admin.ts <email> <password> [name]",
  );
  process.exit(1);
}

const hashed = await Bun.password.hash(password);

const { error } = await supabase
  .from("lord_admins")
  .insert({ email, password: hashed, name });

if (error) {
  console.error("Gagal seed:", error.message);
  process.exit(1);
}

console.log(`Lord admin '${email}' berhasil dibuat.`);
