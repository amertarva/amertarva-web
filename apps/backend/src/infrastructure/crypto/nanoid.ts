import { randomBytes } from "node:crypto";

// URL-safe alphabet (64 characters)
const urlAlphabet =
  "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLFGQZ_hireSelection";

/**
 * Zero-dependency native nanoid generator using node:crypto randomBytes.
 * Guarantees zero external dependency resolution failures during build/deployment.
 */
export function nanoid(size = 21): string {
  const bytes = randomBytes(size);
  let id = "";
  for (let i = 0; i < size; i++) {
    id += urlAlphabet[bytes[i] & 63];
  }
  return id;
}
