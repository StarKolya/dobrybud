export async function submitLead(form: HTMLFormElement, extra: { files?: File[]; source: string }) {
  const formData = new FormData(form);
  formData.set("source", extra.source);
  for (const file of extra.files ?? []) formData.append("files", file);

  try {
    const res = await fetch("/api/lead", { method: "POST", body: formData });
    return res.ok;
  } catch {
    return false;
  }
}
