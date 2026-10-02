import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { authRoute } from "./routes/auth.route";
import { schoolsRoute } from "./routes/schools.route";
import { chatRoute } from "./routes/chat.route";
import { sanitizerPlugin } from "./middleware/sanitizer.middleware";

// Memecah string origin yang dipisahkan oleh koma menjadi array
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : [];

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const appUrl =
  process.env.APP_URL ||
  process.env.URL ||
  process.env.BASE_URL ||
  `http://localhost:${port}`;

export const app = new Elysia()
  .use(cors({ origin: allowedOrigins.length > 0 ? allowedOrigins : true }))
  .use(swagger())
  .use(sanitizerPlugin)
  .onError(({ code, error, set }) => {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error
          ? String((error as any).message)
          : String(error);

    if (code === "NOT_FOUND") {
      set.status = 404;
      return { status: false, code: "NOT_FOUND", message: "Resource tidak ditemukan" };
    }

    console.error(`[Elysia Error ${code}]:`, error);

    if (code === "VALIDATION") {
      set.status = 400;
      return { status: false, code: "VALIDATION_ERROR", message: errorMessage };
    }
    set.status = 500;
    return { status: false, code: "INTERNAL_SERVER_ERROR", message: errorMessage || "Internal Server Error" };
  })
  .use(authRoute)
  .use(schoolsRoute)
  .use(chatRoute)
  .get("/", () => ({
    status: "ok",
    service: "amertarva-backend",
    timestamp: new Date().toISOString(),
  }))
  .get("/health", () => ({
    status: "healthy",
    service: "amertarva-backend",
    timestamp: new Date().toISOString(),
  }))
  .get("/api/health", () => ({
    status: "healthy",
    service: "amertarva-backend",
    timestamp: new Date().toISOString(),
  }));

// Hanya jalankan server listener jika berjalan secara lokal/non-serverless
if (
  process.env.NODE_ENV !== "production" &&
  !process.env.VERCEL &&
  !process.env.VERCEL_ENV &&
  !process.env.AWS_LAMBDA_FUNCTION_NAME &&
  process.env.NODE_ENV !== "test"
) {
  app.listen(port, () => {
    console.log(`🦊 Elysia is running at ${appUrl}`);
    console.log(`📖 Swagger UI is available at ${appUrl}/swagger`);
  });
}

export default app;