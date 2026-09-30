import { NextResponse } from "next/server";

type RsvpInput = {
  name?: unknown;
  attendance?: unknown;
  guests?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let input: RsvpInput;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const attendance = input.attendance;
  const guests = attendance === "decline" ? 0 : Number(input.guests ?? 1);
  const message = typeof input.message === "string" ? input.message.trim() : "";

  const validAttendance =
    attendance === "accept" || attendance === "decline";

  if (
    !name ||
    name.length > 100 ||
    !validAttendance ||
    !Number.isInteger(guests) ||
    guests < 0 ||
    guests > 4 ||
    message.length > 500
  ) {
    return NextResponse.json({ error: "Invalid response" }, { status: 400 });
  }

  /*
    The original deployed project persists RSVP responses to Cloudflare D1.
    The public portfolio repository intentionally omits deployment-specific
    database bindings and private environment configuration.
  */

  return NextResponse.json({
    ok: true,
    demo: true,
    message: "Validated successfully. Configure the D1 binding for persistence.",
  });
}
