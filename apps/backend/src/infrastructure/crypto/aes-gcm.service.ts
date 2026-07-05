import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import type { IEncryptionService } from "../../domain/services/encryption.service";

const ALGORITHM = "aes-256-gcm";

// Layanan enkripsi AES-256-GCM
export class AesGcmEncryptionService implements IEncryptionService {
  private static getKey(): Buffer {
    const hex = process.env.ENCRYPTION_KEY;
    if (!hex) {
      throw new Error("ENCRYPTION_KEY tidak diset di environment");
    }
    return Buffer.from(hex, "hex");
  }

  // Enkripsi
  encrypt(plaintext: string): string {
    const key = AesGcmEncryptionService.getKey();
    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return [
      iv.toString("base64"),
      tag.toString("base64"),
      encrypted.toString("base64"),
    ].join(":");
  }

  // Dekripsi
  decrypt(ciphertext: string): string {
    const key = AesGcmEncryptionService.getKey();
    const [ivB64, tagB64, dataB64] = ciphertext.split(":");
    const iv = Buffer.from(ivB64, "base64");
    const tag = Buffer.from(tagB64, "base64");
    const data = Buffer.from(dataB64, "base64");
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString(
      "utf8",
    );
  }
}
