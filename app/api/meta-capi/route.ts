import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { headers, cookies } from "next/headers";
import { sendCapiEvent } from "@/lib/meta-capi";

const schema = z.object({
  event_name: z.enum([
    "ViewContent",
    "Lead",
    "CompleteRegistration",
    "StartTrial",
  ]),
  event_id: z.string().min(8).max(128),
  event_source_url: z.url(),
  custom_data: z.record(z.string(), z.unknown()).optional(),
  user_data: z
    .object({
      email: z.string().max(320).optional(),
      phone: z.string().max(40).optional(),
      first_name: z.string().max(100).optional(),
      last_name: z.string().max(100).optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const p = parsed.data;

  const h = await headers();
  const c = await cookies();

  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    undefined;
  const ua = h.get("user-agent") ?? undefined;
  const fbp = c.get("_fbp")?.value;
  const fbc = c.get("_fbc")?.value;

  await sendCapiEvent({
    event_name: p.event_name,
    event_id: p.event_id,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: p.event_source_url,
    custom_data: p.custom_data,
    user_data: {
      email: p.user_data?.email,
      phone: p.user_data?.phone,
      first_name: p.user_data?.first_name,
      last_name: p.user_data?.last_name,
      client_ip_address: ip,
      client_user_agent: ua,
      fbp,
      fbc,
    },
  });

  return NextResponse.json({ ok: true });
}
