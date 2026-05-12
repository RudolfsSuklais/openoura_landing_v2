"use server";

import { z } from "zod";
import { Resend } from "resend";
import { headers } from "next/headers";

const demoRequestSchema = z.object({
  name: z
    .string()
    .min(2, "Lūdzu, ievadi pilnu vārdu")
    .max(100, "Pārāk garš"),
  company: z
    .string()
    .min(1, "Obligāts lauks")
    .max(200, "Pārāk garš"),
  email: z.email("Nederīgs e-pasts"),
  phone: z
    .string()
    .max(30, "Pārāk garš")
    .regex(/^[\d+\-\s()]*$/, "Atļauti cipari, +, -, atstarpes")
    .or(z.literal(""))
    .optional(),
  employees: z.enum(["1-5", "6-15", "16-30", "30+"], {
    error: "Izvēlies opciju",
  }),
});

export type DemoRequestErrorType = "validation" | "rate_limit" | "server_error";

export type DemoRequestResult =
  | { success: true }
  | { success: false; errorType: "validation"; errors: Record<string, string> }
  | { success: false; errorType: "rate_limit" | "server_error"; error: string };

const EMPLOYEE_LABELS: Record<string, string> = {
  "1-5": "1–5 darbinieki",
  "6-15": "6–15 darbinieki",
  "16-30": "16–30 darbinieki",
  "30+": "Vairāk kā 30 darbinieki",
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

function withinRateLimit(ip: string): boolean {
  const now = Date.now();
  const stamps = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (stamps.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, stamps);
    return false;
  }
  stamps.push(now);
  recentRequests.set(ip, stamps);
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ConfirmationInput = {
  firstName: string;
  company: string;
};

function buildConfirmationHtml({ firstName, company }: ConfirmationInput) {
  const safeName = escapeHtml(firstName);
  const safeCompany = escapeHtml(company);
  return `<!DOCTYPE html>
<html lang="lv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Paldies, ${safeName}!</title>
</head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0A0A0A;line-height:1.5;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="background:#FFFFFF;border-radius:16px;padding:40px;border:1px solid rgba(10,10,10,0.06);box-shadow:0 1px 2px rgba(10,10,10,0.04);">
      <div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:30px;color:#0A0A0A;letter-spacing:-0.02em;margin-bottom:32px;line-height:1;">
        OpenOura
      </div>

      <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:500;color:#0A0A0A;margin:0 0 20px;line-height:1.25;letter-spacing:-0.01em;">
        Sveiks, ${safeName}!
      </h1>

      <p style="font-size:16px;color:#4B4B4B;margin:0 0 16px;">
        Paldies, ka pieprasīji demo. Esmu saņēmis tavu pieprasījumu un sazināšos personīgi tuvāko 24 stundu laikā.
      </p>

      <p style="font-size:16px;color:#4B4B4B;margin:0 0 32px;">
        Demo aizņems ~25 minūtes. Parādīšu, kā OpenOura strādā ar tādiem uzņēmumiem kā ${safeCompany}, un atbildēšu uz visiem jautājumiem.
      </p>

      <div style="border-top:1px solid rgba(10,10,10,0.08);padding-top:24px;">
        <div style="font-size:15px;color:#4B4B4B;margin-bottom:10px;">Uz drīzu sazināšanos,</div>
        <div style="font-size:16px;font-weight:600;color:#0A0A0A;margin-bottom:2px;">Rudolfs Šuklais</div>
        <div style="font-size:13px;color:#6B6B6B;margin-bottom:18px;">OpenOura dibinātājs</div>
        <div style="font-size:14px;color:#0A0A0A;margin-bottom:6px;">
          📞 <a href="tel:+37120510502" style="color:#0A0A0A;text-decoration:none;">+371 20 510 502</a>
        </div>
        <div style="font-size:14px;color:#0A0A0A;">
          💬 <a href="https://wa.me/37120510502" style="color:#0A0A0A;text-decoration:none;">WhatsApp</a>
        </div>
      </div>
    </div>

    <div style="text-align:center;font-size:12px;color:#6B6B6B;margin-top:24px;line-height:1.6;">
      © 2026 OpenOura · Liepāja, Latvija<br />
      Šis ir automātisks paziņojums.
    </div>
  </div>
</body>
</html>`;
}

function buildConfirmationText({ firstName, company }: ConfirmationInput) {
  return `Sveiks, ${firstName}!

Paldies, ka pieprasīji demo. Esmu saņēmis tavu pieprasījumu un sazināšos personīgi tuvāko 24 stundu laikā.

Demo aizņems ~25 minūtes. Parādīšu, kā OpenOura strādā ar tādiem uzņēmumiem kā ${company}, un atbildēšu uz visiem jautājumiem.

Uz drīzu sazināšanos,
Rudolfs Šuklais
OpenOura dibinātājs
+371 20 510 502
WhatsApp: https://wa.me/37120510502

—
© 2026 OpenOura · Liepāja, Latvija
Šis ir automātisks paziņojums.
`;
}

export async function demoRequestAction(
  formData: FormData,
): Promise<DemoRequestResult> {
  if (formData.get("website")) {
    return { success: true };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "anonymous";

  if (!withinRateLimit(ip)) {
    return {
      success: false,
      errorType: "rate_limit",
      error: "Pārāk daudz pieprasījumu. Mēģini vēlāk vai raksti uz rudolfs@openoura.com.",
    };
  }

  const raw = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    employees: String(formData.get("employees") ?? ""),
  };

  const parsed = demoRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { success: false, errorType: "validation", errors };
  }

  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      success: false,
      errorType: "server_error",
      error: "Pakalpojums uz brīdi nav pieejams. Raksti tieši: rudolfs@openoura.com",
    };
  }

  const notificationFrom =
    process.env.RESEND_FROM_EMAIL ||
    "OpenOura <noreply@landing.openoura.com>";
  const confirmationFrom =
    process.env.RESEND_CONFIRMATION_FROM_EMAIL ||
    "Rudolfs · OpenOura <rudolfs@landing.openoura.com>";
  const toEmail = process.env.CONTACT_EMAIL || "rudolfs@openoura.com";
  const replyToEmail = process.env.REPLY_TO_EMAIL || "rudolfs@openoura.com";

  const timestamp = new Intl.DateTimeFormat("lv-LV", {
    timeZone: "Europe/Riga",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  const notificationBody = `Jauns demo pieprasījums no openoura.com:

Vārds:      ${data.name}
Uzņēmums:   ${data.company}
E-pasts:    ${data.email}
Telefons:   ${data.phone ? data.phone : "—"}
Darbinieki: ${EMPLOYEE_LABELS[data.employees]}

Saņemts:    ${timestamp}

—
Atbildi uz šo e-pastu, lai sazinātos ar klientu.
`;

  const resend = new Resend(apiKey);

  // 1) Internal notification — critical. Failure → user-facing error.
  try {
    const result = await resend.emails.send({
      from: notificationFrom,
      to: toEmail,
      replyTo: data.email,
      subject: `Demo pieprasījums: ${data.company}`,
      text: notificationBody,
    });

    if (result.error) {
      console.error("Resend notification error:", result.error);
      return {
        success: false,
        errorType: "server_error",
        error: "Kļūda nosūtot e-pastu. Raksti tieši: rudolfs@openoura.com",
      };
    }
  } catch (err) {
    console.error("Resend notification exception:", err);
    return {
      success: false,
      errorType: "server_error",
      error: "Kļūda nosūtot e-pastu. Raksti tieši: rudolfs@openoura.com",
    };
  }

  // 2) Client confirmation — non-critical. Log failures but don't fail the form.
  const firstName = data.name.split(/\s+/)[0] || data.name;
  try {
    const confirmation = await resend.emails.send({
      from: confirmationFrom,
      to: data.email,
      replyTo: replyToEmail,
      subject: `Paldies, ${firstName}! Sazināsimies tuvāko 24h laikā`,
      html: buildConfirmationHtml({ firstName, company: data.company }),
      text: buildConfirmationText({ firstName, company: data.company }),
    });

    if (confirmation.error) {
      console.error("Resend confirmation error:", confirmation.error);
    }
  } catch (err) {
    console.error("Resend confirmation exception:", err);
  }

  return { success: true };
}
