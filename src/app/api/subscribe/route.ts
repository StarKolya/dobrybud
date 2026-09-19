import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const EMAILS_FILE = path.join(process.cwd(), "data", "emails.txt");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  await mkdir(path.dirname(EMAILS_FILE), { recursive: true });
  await appendFile(EMAILS_FILE, `${email}\n`, "utf8");

  return Response.json({ ok: true });
}
