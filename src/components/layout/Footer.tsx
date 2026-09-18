import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1.03 1.03 0 0 0-1.06.24l-1.57 1.97a15.05 15.05 0 0 1-6.59-6.59l1.95-1.66c.29-.29.39-.71.25-1.08a11.36 11.36 0 0 1-.56-3.53c0-.55-.45-1-1-1H4.19c-.55 0-1 .45-1 1C3.19 13.06 10.94 20.81 20.01 20.81c.55 0 1-.45 1-1v-3.43c0-.55-.45-1-1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="https://instagram.com/dobrybud"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark transition-colors hover:bg-brand-red"
      >
        <Image src="/icons/socials/white/instagram.svg" alt="Instagram" width={18} height={18} />
      </Link>
      <Link
        href="viber://chat?number=%2B48999999999"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark transition-colors hover:bg-brand-red"
      >
        <Image src="/icons/socials/white/viber.svg" alt="Viber" width={18} height={18} />
      </Link>
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const menuLinks = [
    { href: ROUTES.prices, label: nav("prices") },
    { href: ROUTES.projects, label: nav("projects") },
    { href: ROUTES.about, label: nav("about") },
  ];

  return (
    <footer className="bg-white px-6 pt-10 pb-8 desktop:px-16 desktop:pb-10 desktop:pt-14">
      <div className="mb-8 tablet:hidden">
        <Image src="/images/logos/red.svg" alt="Dobrybud" width={107} height={48} className="h-8 w-auto" />
      </div>

      <div className="flex flex-col gap-8 tablet:flex-row tablet:items-start tablet:justify-between">
        <div className="flex gap-10 desktop:gap-16">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-brand-dark/40">
              {t("menuTitle")}
            </p>
            <nav className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-brand-dark transition-colors hover:text-brand-red"
                >
                  {link.label}
                </Link>
              ))}

              <Link href={ROUTES.home} className="text-sm text-brand-dark transition-colors hover:text-brand-red max-w-20">
                {t("privacyPolicy")}
              </Link>
            </nav>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-brand-dark/40">
              {t("contactsTitle")}
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={`tel:${CONTACT_PHONE_HREF}`}
                className="flex items-center gap-2 text-sm text-brand-dark transition-colors hover:text-brand-red"
              >
                <PhoneIcon />
                {CONTACT_PHONE_DISPLAY}
              </Link>
              <Link
                href={`tel:${CONTACT_PHONE_HREF}`}
                className="flex items-center gap-2 text-sm text-brand-dark transition-colors hover:text-brand-red"
              >
                <PhoneIcon />
                {CONTACT_PHONE_DISPLAY}
              </Link>
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-sm text-brand-dark transition-colors hover:text-brand-red"
              >
                <MailIcon />
                {CONTACT_EMAIL}
              </Link>
            </div>
          </div>
        </div>

        <div className="tablet:hidden">
          <SocialIcons />
        </div>

        <div className="flex flex-col gap-4 tablet:max-w-sm tablet:flex-row-reverse tablet:items-start">
          <SocialIcons />
          <div className="flex flex-col gap-4">
            <p className="flex items-start gap-2 text-sm leading-6 text-brand-dark">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red tablet:hidden" aria-hidden />
              {t("tagline")}
            </p>
            <Button className="w-full tablet:w-auto">{t("cta")}</Button>
          </div>
        </div>
      </div>

      <div className="my-10 desktop:my-14">
        <Image
          src="/images/footer-text.svg"
          alt="Dobrybud"
          width={1299}
          height={287}
          className="h-auto w-full"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-brand-dark/50">
        <span className="order-2 tablet:order-1">
          © {new Date().getFullYear()}. {t("rights")}
        </span>
        
      </div>
    </footer>
  );
}
