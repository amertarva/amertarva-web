import { Elysia } from "elysia";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const appUrl =
  process.env.APP_URL ||
  process.env.URL ||
  process.env.BASE_URL ||
  `http://localhost:${port}`;

const app = new Elysia().get("/", () => "Hello Elysia").listen(port);

console.log(`🦊 Elysia is running at ${appUrl}`);
