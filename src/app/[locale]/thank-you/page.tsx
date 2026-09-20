import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";
import { LeadEvent } from "@/components/analytics/LeadEvent";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Дякуємо за заявку! — Dobrybud",
  description:
    "Заявку прийнято, наш менеджер зв'яжеться з вами найближчим часом.",
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thankYou");

  return (
    <>
      <Header variant="solid" />
      <main className="flex flex-1 flex-col">
        <section className="relative flex flex-col overflow-hidden bg-brand-gray desktop:h-175 desktop:px-[max(70px,calc((100%-1300px)/2))]">
          <div className="relative flex flex-1 flex-col desktop:flex-row">
            <LeadEvent />
            <div className="relative z-10 flex flex-col items-center px-5 pt-8 text-center desktop:w-1/2 desktop:items-start desktop:px-0 desktop:pt-30 desktop:text-left">
              <h1 className="whitespace-nowrap font-heading text-[30px] font-semibold uppercase leading-none text-brand-dark tablet:text-[56px] desktop:text-[60px]">
                {t("title")}
              </h1>
              <p className="mt-2 whitespace-pre-line text-[17px] font-light leading-tight tablet:mt-5 tablet:text-[25px]">
                {t("description")}
              </p>
              <Link href={ROUTES.home} className="mt-6 desktop:mt-10">
                <Button className="px-10.75 py-2.75 text-[18px] font-medium tablet:px-13 tablet:py-3.5 tablet:text-[20px]">
                  {t("backHome")}
                </Button>
              </Link>
            </div>
            <div className="relative mt-8 aspect-square w-full overflow-hidden desktop:absolute desktop:top-[132px] desktop:-right-55 desktop:mt-0 desktop:aspect-auto desktop:size-[873px] desktop:overflow-visible">
              <div className="absolute top-0 left-1/2 aspect-square w-[200%] -translate-x-1/2 desktop:inset-0 desktop:left-0 desktop:w-full desktop:translate-x-0">
                <Image
                  src="/images/popups/3d-house-4.png"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 873px, 200vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
