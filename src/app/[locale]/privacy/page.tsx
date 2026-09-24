import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/constants";

interface PrivacySection {
  title: string;
  text?: string[];
  list?: string[];
  note?: string[];
}

const LINK_CLASSNAME = "text-brand-red underline-offset-2 hover:underline";

// Swaps {email} / {phone} placeholders in the policy text for contact links
function withContacts(text: string) {
  return text.split(/(\{email\}|\{phone\})/).map((part, i) => {
    if (part === "{email}") {
      return (
        <a key={i} href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASSNAME}>
          {CONTACT_EMAIL}
        </a>
      );
    }
    if (part === "{phone}") {
      return (
        <a key={i} href={`tel:${CONTACT_PHONE_HREF}`} className={`whitespace-nowrap ${LINK_CLASSNAME}`}>
          {CONTACT_PHONE_DISPLAY}
        </a>
      );
    }
    return part;
  });
}

function Paragraphs({ items }: { items?: string[] }) {
  return items?.map((text) => (
    <p key={text} className="mt-3">
      {withContacts(text)}
    </p>
  ));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "/privacy", "privacy");
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <>
      <Header variant="solid" />
      <main className="flex flex-1 flex-col">
        <article className="mx-auto w-full max-w-[900px] px-5 pt-8 pb-16 tablet:px-10 tablet:pt-14 desktop:pt-20 desktop:pb-24">
          <h1 className="font-heading text-[30px] font-semibold uppercase leading-none text-brand-dark tablet:text-[48px] desktop:text-[56px]">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm font-light text-brand-dark/60 tablet:text-base">{t("updated")}</p>
          <p className="mt-6 text-[16px] font-light leading-snug text-brand-dark tablet:text-[18px]">{t("intro")}</p>

          {sections.map((section) => (
            <section
              key={section.title}
              className="mt-8 text-[16px] font-light leading-snug text-brand-dark tablet:mt-10 tablet:text-[18px]"
            >
              <h2 className="font-heading text-[20px] font-semibold uppercase leading-tight tablet:text-[24px]">
                {section.title}
              </h2>
              <Paragraphs items={section.text} />
              {section.list && (
                <ul className="mt-3 flex flex-col gap-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" aria-hidden />
                      <span>{withContacts(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Paragraphs items={section.note} />
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
