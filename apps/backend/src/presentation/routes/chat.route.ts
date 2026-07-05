import { Elysia, t } from "elysia";
import { ChatbotUseCase } from "../../application/use-cases/chatbot/ChatbotUseCase";

// In-Memory Rate Limiter Sederhana
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 15; // Maksimal 15 pertanyaan
const WINDOW_MS = 60 * 60 * 1000; // Per 1 jam

export const chatRoute = new Elysia({ prefix: "/api" }).post(
  "/chat",
  async ({ body, set, request }) => {
    // Mengambil IP dari headers (jika di belakang proxy) atau fallback ke unknown
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("cf-connecting-ip") || 
               "unknown-client";

    const now = Date.now();
    let record = rateLimitMap.get(ip);

    if (!record || now > record.resetAt) {
      record = { count: 0, resetAt: now + WINDOW_MS };
      rateLimitMap.set(ip, record);
    }

    record.count += 1;

    // Tolak request jika melebihi batas
    if (record.count > MAX_REQUESTS) {
      set.status = 429;
      return {
        success: false,
        error: "Batas interaksi Anda tercapai. Silakan coba lagi dalam beberapa waktu atau jadwalkan demo dengan tim kami."
      };
    }

    try {
      const chatbotUseCase = new ChatbotUseCase();
      const reply = await chatbotUseCase.getChatReply(body.messages);
      
      return {
        success: true,
        data: reply,
      };
    } catch (error: any) {
      set.status = 500;
      return {
        success: false,
        error: error.message || "Internal Server Error",
      };
    }
  },
  {
    body: t.Object({
      messages: t.Array(
        t.Object({
          role: t.String(),
          content: t.String(),
        })
      ),
    }),
  }
);
