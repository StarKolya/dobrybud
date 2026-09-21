import nodemailer from "nodemailer";
import { MAX_UPLOAD_FILES, MAX_UPLOAD_SIZE_BYTES, MAX_UPLOAD_TOTAL_BYTES } from "@/lib/constants";

export const runtime = "nodejs";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const field = (formData: FormData, key: string, max: number) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
};

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) return Response.json({ error: "Invalid request" }, { status: 400 });

  const name = field(formData, "name", 100);
  const phone = field(formData, "phone", 30);
  const area = field(formData, "area", 20);
  const source = field(formData, "source", 100);

  if (!name || !/^\+\d{6,15}$/.test(phone.replace(/[\s()-]/g, ""))) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }

  const files = formData.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);
  if (files.length > MAX_UPLOAD_FILES) {
    return Response.json({ error: "Too many files" }, { status: 400 });
  }
  if (
    files.some((f) => f.size > MAX_UPLOAD_SIZE_BYTES) ||
    files.reduce((sum, f) => sum + f.size, 0) > MAX_UPLOAD_TOTAL_BYTES
  ) {
    return Response.json({ error: "File too large" }, { status: 413 });
  }

  const rows: [string, string][] = [
    ["Ім'я", name],
    ["Телефон", phone],
    ["Квадратура", area ? `${area} м²` : "не вказано"],
    ["Джерело", source || "не вказано"],
    ["Файли", files.length ? files.map((f) => f.name).join(", ") : "не додано"],
  ];

  const text = [
    "Нова заявка від клієнта з сайту Dobry Bud.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    files.length ? "Файли клієнта додано до листа." : "",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#2c2c2c;max-width:560px">
      <h2 style="margin:0 0 8px">Нова заявка з сайту 🎉</h2>
      <p style="margin:0 0 16px">Ось новий клієнт. Будь ласка, зв'яжіться з ним якнайшвидше.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#f6f6f6;font-weight:bold;width:140px">${label}</td>
          <td style="padding:8px 12px;border:1px solid #e5e5e5">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join("")}
      </table>
      ${files.length ? `<p style="margin:16px 0 0">📎 Файли клієнта (${files.length}) додано до цього листа.</p>` : ""}
    </div>`;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Dobry Bud — сайт" <${process.env.LEAD_MAIL_FROM}>`,
      to: process.env.LEAD_MAIL_TO,
      subject: `Нова заявка: ${name}, ${phone}`,
      text,
      html,
      attachments: await Promise.all(
        files.map(async (f) => ({
          filename: f.name,
          content: Buffer.from(await f.arrayBuffer()),
          contentType: f.type || undefined,
        })),
      ),
    });
  } catch (error) {
    console.error("Lead email failed", error);
    return Response.json({ error: "Send failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
