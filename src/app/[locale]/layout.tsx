import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import "tailwindcss/tailwind.css";
import "../global.css";
import ResponsiveShell from "../components/responsive-shell";
import { getSiteData, type Locale } from "../_services/api";
import { getMenuConfig } from "../components/menu-config";

const TIME_ZONES: Record<Locale, string> = {
  es: "Europe/Madrid",
  de: "Europe/Berlin",
  en: "America/New_York",
};

export const metadata: Metadata = {
  icons: { icon: "/images/logo.png" },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const [messages, desktopData, menu] = await Promise.all([
    getMessages(),
    getSiteData(locale),
    getMenuConfig(locale),
  ]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          messages={messages}
          timeZone={TIME_ZONES[locale]}
        >
          <ResponsiveShell
            locale={locale}
            desktopData={desktopData}
            menuLinks={menu.menuLinks}
            languages={menu.languages}
          >
            {children}
          </ResponsiveShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
