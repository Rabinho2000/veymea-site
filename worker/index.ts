/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/interest" && request.method === "POST") {
      try {
        const payload = await request.json() as { email?: string; result?: string };
        const email = payload.email?.trim().toLowerCase();
        const result = payload.result?.trim().toLowerCase();
        const validResults = new Set(["vibe", "warm", "fresh", "slow"]);
        if (!email || !/^\S+@\S+\.\S+$/.test(email) || !result || !validResults.has(result)) {
          return Response.json({ error: "Dados inválidos." }, { status: 400 });
        }

        await env.DB.prepare(`
          CREATE TABLE IF NOT EXISTS interests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            quiz_result TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
          )
        `).run();
        await env.DB.prepare(`
          INSERT INTO interests (email, quiz_result)
          VALUES (?, ?)
          ON CONFLICT(email) DO UPDATE SET quiz_result = excluded.quiz_result
        `).bind(email, result).run();
        return Response.json({ ok: true });
      } catch (error) {
        console.error("Failed to save interest", error);
        return Response.json({ error: "Não foi possível guardar." }, { status: 500 });
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
