export async function submitLead(form: HTMLFormElement, extra: { file?: File | null; source: string }) {
  const formData = new FormData(form);
  formData.set("source", extra.source);
  if (extra.file) formData.set("file", extra.file);

  try {
    const res = await fetch("/api/lead", { method: "POST", body: formData });
    return res.ok;
  } catch {
    return false;
  }
}
