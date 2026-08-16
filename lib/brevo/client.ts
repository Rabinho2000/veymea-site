import { profiles } from "../../content/quiz/profiles";
import type { QuizType } from "../quiz/types";

const CONSENT_VERSION = "2026-01-01";

export type BrevoConfig = {
  apiKey: string;
  listId: number;
  senderEmail: string;
  notifyEmail: string;
  doiTemplateId?: string;
  resultTemplateId?: string;
};

export type BrevoLead = {
  email: string;
  quizType: QuizType;
  primaryProfile: string;
  secondaryProfile: string | null;
  marketingConsent: boolean;
};

export function getBrevoConfig(
  env: Record<string, string | undefined>,
): BrevoConfig | null {
  const apiKey = env.BREVO_API_KEY;
  const listId = Number(env.BREVO_LIST_ID);
  const senderEmail = env.BREVO_SENDER_EMAIL;
  const notifyEmail = env.VEYMEA_NOTIFY_EMAIL;

  if (!apiKey || !Number.isInteger(listId) || !senderEmail || !notifyEmail) {
    return null;
  }

  return {
    apiKey,
    listId,
    senderEmail,
    notifyEmail,
    doiTemplateId: env.BREVO_DOI_TEMPLATE_ID,
    resultTemplateId: env.BREVO_RESULT_TEMPLATE_ID,
  };
}

async function brevoRequest(
  config: BrevoConfig,
  path: string,
  body: unknown,
): Promise<void> {
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": config.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo ${path} failed (${response.status}): ${detail}`);
  }
}

function profileName(id: string): string {
  return profiles[id as keyof typeof profiles]?.name ?? id;
}

export async function syncLeadWithBrevo(
  config: BrevoConfig,
  lead: BrevoLead,
): Promise<void> {
  const primaryName = profileName(lead.primaryProfile);
  const secondaryName = lead.secondaryProfile
    ? profileName(lead.secondaryProfile)
    : "";

  const attributes: Record<string, string> = {
    QUIZ_TYPE: lead.quizType,
    QUIZ_RESULT: primaryName,
    CONSENT_VERSION: CONSENT_VERSION,
  };
  if (secondaryName) {
    attributes.QUIZ_SECONDARY = secondaryName;
  }

  if (lead.marketingConsent) {
    await brevoRequest(config, "/contacts", {
      email: lead.email,
      listIds: [config.listId],
      attributes,
      updateEnabled: true,
    });
  }

  await Promise.all([
    brevoRequest(config, "/smtp/email", {
      sender: { name: "Veymea", email: config.senderEmail },
      to: [{ email: lead.email }],
      subject: `O vosso match Veymea: ${primaryName}`,
      htmlContent: resultEmailHtml(primaryName, secondaryName, lead.quizType),
    }),
    brevoRequest(config, "/smtp/email", {
      sender: { name: "Veymea Website", email: config.senderEmail },
      to: [{ email: config.notifyEmail }],
      subject: `Novo contacto Veymea — ${primaryName}${secondaryName ? " / " + secondaryName : ""}`,
      htmlContent: notifyEmailHtml(lead, primaryName, secondaryName),
    }),
  ]);
}

function resultEmailHtml(
  primary: string,
  secondary: string,
  quizType: string,
): string {
  const subjectLine = quizType === "couple" ? "O vosso match" : "O teu match";
  return `
    <div style="background:#1d0b14;padding:42px 20px;font-family:Arial,sans-serif;color:#f8ece8">
      <div style="max-width:560px;margin:auto;background:#321322;border:1px solid #744354;padding:38px">
        <p style="margin:0 0 22px;color:#d99aa3;letter-spacing:3px;text-transform:uppercase;font-size:11px">Veymea</p>
        <h1 style="margin:0 0 18px;font-family:Georgia,serif;font-weight:400;font-size:34px">${subjectLine} é ${primary}.</h1>
        ${secondary ? `<p style="margin:0 0 18px;color:#ead6d2;font-size:15px">O vosso perfil secundário é ${secondary}.</p>` : ""}
        <p style="line-height:1.7;color:#ead6d2">Obrigada por fazerem parte dos primeiros passos da Veymea. Guardámos o vosso resultado e avisaremos quando houver novidades preparadas para vocês.</p>
        <p style="margin:30px 0 0;color:#c98c98;font-size:12px">Intimacy. Discovery. Connection.</p>
      </div>
    </div>`;
}

function notifyEmailHtml(
  lead: BrevoLead,
  primary: string,
  secondary: string,
): string {
  return `<p>Novo contacto através do quiz da Veymea.</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Resultado:</strong> ${primary}${secondary ? " / " + secondary : ""}</p>
    <p><strong>Tipo de quiz:</strong> ${lead.quizType}</p>
    <p><strong>Consentimento marketing:</strong> ${lead.marketingConsent ? "sim" : "não"}</p>`;
}

export { CONSENT_VERSION };
