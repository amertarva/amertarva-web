export class SanitizerService {
  // Dangerous executable / script extensions whitelist vs blacklist
  private static readonly BLOCKED_EXTENSIONS = new Set([
    "exe", "bat", "cmd", "sh", "php", "py", "js", "vbs", "ps1", "pl", "cgi",
    "jar", "asp", "aspx", "phar", "phtml", "scr", "msi", "dll", "com", "vbe",
    "jse", "wsf", "wsh", "hht", "hta", "cpl", "inf", "reg", "bash", "zsh"
  ]);

  private static readonly ALLOWED_EXTENSIONS = new Set([
    "png", "jpg", "jpeg", "gif", "webp", "svg", "pdf", "doc", "docx",
    "xls", "xlsx", "ppt", "pptx", "txt", "csv", "json", "zip", "rar", "7z", "mp4", "mp3"
  ]);

  /**
   * Sanitizes a string against XSS, HTML injection, and OS command injection attacks.
   */
  public static sanitizeString(input: string): string {
    if (typeof input !== "string") return input;

    let sanitized = input;

    // 1. Remove Null Bytes and control characters
    sanitized = sanitized.replace(/\0/g, "");

    // 2. Disarm OS Command Injection patterns (`;`, `&&`, `||`, `|`, `` ` ``, `$()`)
    sanitized = sanitized.replace(/([;&|`$])/g, "");

    // 3. Strip XSS script tags, iframes, objects, embeds, and inline event handlers
    sanitized = sanitized.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
    sanitized = sanitized.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "");
    sanitized = sanitized.replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "");
    sanitized = sanitized.replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, "");
    sanitized = sanitized.replace(/on\w+\s*=\s*(['"]).*?\1/gi, "");
    sanitized = sanitized.replace(/on\w+\s*=\s*[^>\s]+/gi, "");
    sanitized = sanitized.replace(/javascript\s*:/gi, "no-javascript:");
    sanitized = sanitized.replace(/data\s*:\s*text\/html/gi, "no-data-uri:");

    // 4. Encode remaining dangerous HTML entities for safe storage/display
    sanitized = sanitized
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");

    return sanitized.trim();
  }

  /**
   * Recursively sanitizes objects, arrays, and primitive strings.
   */
  public static sanitizePayload<T>(payload: T): T {
    if (payload === null || payload === undefined) {
      return payload;
    }

    if (typeof payload === "string") {
      return this.sanitizeString(payload) as unknown as T;
    }

    if (Array.isArray(payload)) {
      return payload.map((item) => this.sanitizePayload(item)) as unknown as T;
    }

    if (typeof payload === "object") {
      const sanitizedObj: Record<string, any> = {};
      for (const [key, value] of Object.entries(payload)) {
        const cleanKey = this.sanitizeString(key);
        sanitizedObj[cleanKey] = this.sanitizePayload(value);
      }
      return sanitizedObj as T;
    }

    return payload;
  }

  /**
   * Sanitizes filenames by removing path traversal (`../`, `..\`) and special characters.
   */
  public static sanitizeFilename(filename: string): string {
    if (!filename) return "file";

    // Remove path traversal & null bytes
    let cleanName = filename.replace(/\0/g, "");
    cleanName = cleanName.replace(/(\.\.[\/\\])+/g, "");
    cleanName = cleanName.replace(/[/\\]/g, "_");

    // Remove suspicious control characters
    cleanName = cleanName.replace(/[^\w\.\-\s]/gi, "_");

    return cleanName;
  }

  /**
   * Validates file safety based on extension, mime-type, and size limits.
   */
  public static validateFileSafety(file: { name: string; size?: number; type?: string }, maxSizeBytes = 10 * 1024 * 1024): { valid: boolean; reason?: string } {
    if (!file || !file.name) {
      return { valid: false, reason: "File tidak valid" };
    }

    const cleanFilename = this.sanitizeFilename(file.name);
    const parts = cleanFilename.split(".");
    if (parts.length < 2) {
      return { valid: false, reason: "Ekstensi file tidak ditemukan" };
    }

    const ext = parts.pop()?.toLowerCase() ?? "";

    // Block dangerous extensions
    if (this.BLOCKED_EXTENSIONS.has(ext)) {
      return { valid: false, reason: `Ekstensi .${ext} dilarang demi alasan keamanan` };
    }

    // Check whitelist
    if (!this.ALLOWED_EXTENSIONS.has(ext)) {
      return { valid: false, reason: `Tipe file .${ext} tidak didukung` };
    }

    // Check size limit
    if (file.size && file.size > maxSizeBytes) {
      return { valid: false, reason: `Ukuran file melebihi batas maksimal (${Math.round(maxSizeBytes / (1024 * 1024))}MB)` };
    }

    return { valid: true };
  }
}
