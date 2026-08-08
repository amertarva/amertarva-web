import { Elysia } from "elysia";
import { SanitizerService } from "../../infrastructure/security/SanitizerService";

export const sanitizerPlugin = new Elysia({ name: "sanitizerPlugin" })
  .onTransform(({ body, query }) => {
    if (body && typeof body === "object") {
      SanitizerService.sanitizePayload(body);
    }
    if (query && typeof query === "object") {
      SanitizerService.sanitizePayload(query);
    }
  });
