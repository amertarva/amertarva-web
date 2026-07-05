import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { authRoute } from "./routes/auth.route";
import { schoolsRoute } from "./routes/schools.route";
import { chatRoute } from "./routes/chat.route";

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

const app = new Elysia()
  .use(cors({ origin: allowedOrigins }))
  .use(swagger())
  .use(authRoute)
  .use(schoolsRoute)
  .use(chatRoute)
  .get("/", () => ({ status: "ok", service: "amertarva-backend" }))
  .listen(port);

console.log(`🦊 Elysia is running at ${appUrl}`);
console.log(`📖 Swagger UI is available at ${appUrl}/swagger`);
