export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return input;

  let clean = input.replace(/\0/g, '');

  // Strip script/iframe tags and inline event handlers
  clean = clean.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  clean = clean.replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '');
  clean = clean.replace(/on\w+\s*=\s*(['"]).*?\1/gi, '');
  clean = clean.replace(/on\w+\s*=\s*[^>\s]+/gi, '');
  clean = clean.replace(/javascript\s*:/gi, 'no-javascript:');

  // Strip command injection metacharacters
  clean = clean.replace(/([;&|`$])/g, '');

  return clean.trim();
}

export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    return sanitizeInput(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const cleanObj: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      cleanObj[sanitizeInput(k)] = sanitizeObject(v);
    }
    return cleanObj as T;
  }

  return obj;
}

export function validateFile(file: File, maxSizeBytes = 10 * 1024 * 1024): { valid: boolean; error?: string } {
  if (!file) return { valid: false, error: 'File tidak valid' };

  const blockedExts = ['exe', 'bat', 'cmd', 'sh', 'php', 'py', 'js', 'vbs', 'ps1', 'phar', 'dll'];
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (blockedExts.includes(ext)) {
    return { valid: false, error: `Ekstensi .${ext} dilarang demi keamanan` };
  }

  if (file.size > maxSizeBytes) {
    return { valid: false, error: `Ukuran file maksimal ${Math.round(maxSizeBytes / (1024 * 1024))}MB` };
  }

  return { valid: true };
}
