import crypto from "node:crypto";

type CapiEventName =
  | "ViewContent"
  | "Lead"
  | "CompleteRegistration"
  | "StartTrial";

type CapiUserData = {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
};

type CapiPayload = {
  event_name: CapiEventName;
  event_id: string;
  event_time: number;
  event_source_url: string;
  user_data: CapiUserData;
  custom_data?: Record<string, unknown>;
};

function normalize(v: string, kind: "email" | "phone" | "name"): string {
  const s = v.trim().toLowerCase();
  if (kind === "phone") return s.replace(/[^\d]/g, "");
  return s;
}

function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function buildUserData(u: CapiUserData): Record<string, string> {
  const out: Record<string, string> = {};

  if (u.email) {
    const v = normalize(u.email, "email");
    if (v.includes("@")) out.em = sha256(v);
  }

  if (u.phone) {
    const p = normalize(u.phone, "phone");
    // Drop short / missing-country-code numbers rather than send a hash Meta
    // can never match. Forms here don't enforce country code; better to omit.
    if (p.length >= 8) out.ph = sha256(p);
  }

  if (u.first_name) out.fn = sha256(normalize(u.first_name, "name"));
  if (u.last_name) out.ln = sha256(normalize(u.last_name, "name"));

  if (u.client_ip_address) out.client_ip_address = u.client_ip_address;
  if (u.client_user_agent) out.client_user_agent = u.client_user_agent;
  if (u.fbp) out.fbp = u.fbp;
  if (u.fbc) out.fbc = u.fbc;

  return out;
}

export async function sendCapiEvent(p: CapiPayload): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) {
    console.warn("[meta-capi] NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN missing — skipping");
    return;
  }

  const event: Record<string, unknown> = {
    event_name: p.event_name,
    event_time: p.event_time,
    event_id: p.event_id,
    event_source_url: p.event_source_url,
    action_source: "website",
    user_data: buildUserData(p.user_data),
  };
  if (p.custom_data && Object.keys(p.custom_data).length > 0) {
    event.custom_data = p.custom_data;
  }

  const body: Record<string, unknown> = { data: [event] };
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) body.test_event_code = testCode;

  const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[meta-capi] upstream", res.status, text);
    }
  } catch (err) {
    console.error("[meta-capi] fetch failed", err);
  }
}
