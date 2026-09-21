import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, CONTACT_TELEGRAM_URL, CONTACT_VIBER_URL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, ROUTES } from "@/lib/constants";
import { NewsletterForm } from "./NewsletterForm";

const SOCIALS = [
  { name: "Telegram", href: CONTACT_TELEGRAM_URL, icon: "/icons/socials/black/telegram.svg" },
  { name: "Viber", href: CONTACT_VIBER_URL, icon: "/icons/socials/black/viber.svg" },
];

function SocialIcons() {
  return (
    <div className="flex items-center gap-3 tablet:flex-col tablet:gap-0.5">
      {SOCIALS.map((social) => (
        <Link key={social.name} href={social.href} className="transition-opacity hover:opacity-60">
          <Image src={social.icon} alt={social.name} width={50} height={50} className="h-[50px] w-[50px]" />
        </Link>
      ))}
    </div>
  );
}

const CONTACT_LINK_CLASSNAME =
  "flex items-center gap-2 font-sans text-[16px] tablet:text-base desktop:text-[20px] font-normal leading-none tracking-[-0.01em] text-[#2C2C2C] transition-colors hover:text-brand-red";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const menuLinks = [
    { href: ROUTES.prices, label: nav("prices") },
    { href: ROUTES.projects, label: nav("projects") },
    { href: ROUTES.about, label: nav("about") },
  ];

  return (
    <footer className="mt-auto bg-white px-6 pt-10 pb-5 tablet:pb-2.5 desktop:px-16 desktop:pt-14">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-8 tablet:hidden">
          <Image src="/images/logos/red.svg" alt="Dobrybud" width={107} height={48} className="h-auto w-[100px]" />
        </div>

        <div className="flex flex-col gap-8 tablet:flex-row tablet:items-start tablet:justify-between">
          <div className="order-2 flex gap-10 tablet:order-1 desktop:gap-16">
            <div className="w-40 desktop:w-48">
              <p className="mb-3 desktop:mb-7 font-sans text-[18px] tablet:text-base desktop:text-[20px] font-normal uppercase leading-none tracking-[-0.01em] text-[#2C2C2C]">
                {t("menuTitle")}
              </p>
              <nav className="flex flex-col gap-2 desktop:gap-3">
                {menuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-sans text-[16px] tablet:text-base desktop:text-[20px] font-normal leading-none tracking-[-0.01em] text-[#2C2C2C] transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={ROUTES.home}
                  className="font-sans text-[16px] tablet:text-base desktop:text-[20px] font-normal leading-none tracking-[-0.01em] text-[#2C2C2C] transition-colors hover:text-brand-red"
                >
                  {t("privacyPolicy")}
                </Link>
              </nav>
            </div>

            <div>
              <p className="mb-3 desktop:mb-7 font-sans text-[18px] tablet:text-base desktop:text-[20px] font-normal uppercase leading-none tracking-[-0.01em] text-[#2C2C2C]">
                {t("contactsTitle")}
              </p>
              <div className="flex flex-col gap-2 desktop:gap-3">
                <Link href={`tel:${CONTACT_PHONE_HREF}`} className={CONTACT_LINK_CLASSNAME}>
                  <Image src="/icons/phone-red.svg" alt="" width={20} height={20} />
                  {CONTACT_PHONE_DISPLAY}
                </Link>
                <Link href={`mailto:${CONTACT_EMAIL}`} className={CONTACT_LINK_CLASSNAME}>
                  <Image src="/icons/mail-red.svg" alt="" width={20} height={20} />
                  {CONTACT_EMAIL}
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 flex flex-col gap-3 tablet:order-2 tablet:max-w-sm">
            <p className="flex items-start gap-2 font-sans text-[20px] tablet:text-base desktop:text-[20px] font-normal leading-none tracking-[-0.01em] text-[#2C2C2C]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red tablet:hidden" aria-hidden />
              <span>
                {t("newsletterTitle")}
                <br />
                {t("newsletterText")}
              </span>
            </p>
            <NewsletterForm />
          </div>

          <div className="order-3">
            <SocialIcons />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1300px] desktop:mt-14">
        <Image
          src="/images/footer-text.svg"
          alt="Dobrybud"
          width={1299}
          height={287}
          className="block h-auto w-full"
        />
        <span className="absolute bottom-0.5 left-0 z-10 tablet:bottom-2 font-sans text-[12px] tablet:text-base desktop:text-[20px] font-normal leading-none tracking-[-0.01em] text-[#2C2C2C]">
          © {new Date().getFullYear()}. {t("rights")}
        </span>
      </div>
    </footer>
  );
}
