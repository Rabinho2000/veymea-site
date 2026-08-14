/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BREVO_SENDER_EMAIL: string;
  VEYMEA_NOTIFY_EMAIL: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

const quizResults: Record<string, string> = {
  vibe: "Vibe",
  warm: "Warm",
  fresh: "Fresh",
  slow: "Slow",
};

async function brevoRequest(env: Env, path: string, body: unknown) {
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo ${path} failed (${response.status}): ${detail}`);
  }
}

async function syncInterestWithBrevo(env: Env, email: string, result: string) {
  const listId = Number(env.BREVO_LIST_ID);
  const resultName = quizResults[result];
  if (!env.BREVO_API_KEY || !Number.isInteger(listId) || !env.BREVO_SENDER_EMAIL || !env.VEYMEA_NOTIFY_EMAIL) {
    throw new Error("Brevo environment is incomplete.");
  }

  await brevoRequest(env, "/contacts", {
    email,
    listIds: [listId],
    attributes: { QUIZ_RESULT: resultName },
    updateEnabled: true,
  });

  await Promise.all([
    brevoRequest(env, "/smtp/email", {
      sender: { name: "Veymea", email: env.BREVO_SENDER_EMAIL },
      to: [{ email }],
      subject: `O vosso match Veymea: ${resultName}`,
      htmlContent: `
        <div style="background:#1d0b14;padding:42px 20px;font-family:Arial,sans-serif;color:#f8ece8">
          <div style="max-width:560px;margin:auto;background:#321322;border:1px solid #744354;padding:38px">
            <p style="margin:0 0 22px;color:#d99aa3;letter-spacing:3px;text-transform:uppercase;font-size:11px">Veymea</p>
            <h1 style="margin:0 0 18px;font-family:Georgia,serif;font-weight:400;font-size:34px">O vosso match é ${resultName}.</h1>
            <p style="line-height:1.7;color:#ead6d2">Obrigada por fazerem parte dos primeiros passos da Veymea. Guardámos o vosso resultado e avisaremos quando houver novidades preparadas para vocês.</p>
            <p style="margin:30px 0 0;color:#c98c98;font-size:12px">Intimacy. Discovery. Connection.</p>
          </div>
        </div>`,
    }),
    brevoRequest(env, "/smtp/email", {
      sender: { name: "Veymea Website", email: env.BREVO_SENDER_EMAIL },
      to: [{ email: env.VEYMEA_NOTIFY_EMAIL }],
      subject: `Novo contacto Veymea — ${resultName}`,
      htmlContent: `<p>Novo contacto através do quiz da Veymea.</p><p><strong>Email:</strong> ${email}</p><p><strong>Resultado:</strong> ${resultName}</p>`,
    }),
  ]);
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

        await syncInterestWithBrevo(env, email, result);
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
