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

  // TODO: Switch From to noreply@openoura.com after Resend domain verification.
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "OpenOura <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_EMAIL || "rudolfs@openoura.com";

  const timestamp = new Intl.DateTimeFormat("lv-LV", {
    timeZone: "Europe/Riga",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  const body = `Jauns demo pieprasījums no openoura.com:

Vārds:      ${data.name}
Uzņēmums:   ${data.company}
E-pasts:    ${data.email}
Telefons:   ${data.phone ? data.phone : "—"}
Darbinieki: ${EMPLOYEE_LABELS[data.employees]}

Saņemts:    ${timestamp}

—
Atbildi uz šo e-pastu, lai sazinātos ar klientu.
`;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `Demo pieprasījums: ${data.company}`,
      text: body,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return {
        success: false,
        errorType: "server_error",
        error: "Kļūda nosūtot e-pastu. Raksti tieši: rudolfs@openoura.com",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Resend exception:", err);
    return {
      success: false,
      errorType: "server_error",
      error: "Kļūda nosūtot e-pastu. Raksti tieši: rudolfs@openoura.com",
    };
  }
}
