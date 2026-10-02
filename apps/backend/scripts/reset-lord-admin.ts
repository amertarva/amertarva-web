import { supabase } from "../src/infrastructure/database/supabase/client";

// Script untuk reset atau update password Lord Admin
const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log("\nCara Penggunaan:");
  console.log("  bun run scripts/reset-lord-admin.ts <email> <password_baru>\n");
  console.log("Contoh:");
  console.log("  bun run scripts/reset-lord-admin.ts admin@amertarva.com password123\n");
  process.exit(1);
}

const hashedPassword = await Bun.password.hash(newPassword, {
  algorithm: "bcrypt",
  cost: 10,
});

// Cek apakah admin dengan email ini sudah ada
const { data: existingAdmin } = await supabase
  .from("lord_admins")
  .select("id, email, name")
  .eq("email", email)
  .maybeSingle();

if (existingAdmin) {
  // Update password yang sudah ada
  const { error } = await supabase
    .from("lord_admins")
    .update({ password: hashedPassword })
    .eq("email", email);

  if (error) {
    console.error("❌ Gagal mereset password:", error.message);
    process.exit(1);
  }

  console.log("\n=======================================================");
  console.log("✅ BERHASIL MERESET PASSWORD LORD ADMIN!");
  console.log(`👤 Nama: ${existingAdmin.name || "Administrator"}`);
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password Baru: ${newPassword}`);
  console.log("=======================================================\n");
} else {
  // Buat akun baru jika belum ada
  const { error } = await supabase
    .from("lord_admins")
    .insert({
      email,
      password: hashedPassword,
      name: "Lord Admin",
    });

  if (error) {
    console.error("❌ Gagal membuat akun admin:", error.message);
    process.exit(1);
  }

  console.log("\n=======================================================");
  console.log("✅ BERHASIL MEMBUAT AKUN LORD ADMIN BARU!");
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${newPassword}`);
  console.log("=======================================================\n");
}
