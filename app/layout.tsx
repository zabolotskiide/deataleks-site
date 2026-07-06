import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteContacts } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://detaleks.ru"),
  title: {
    default: "ДЕТАЛЕКС - автозапчасти под заказ в Кирове",
    template: "%s | ДЕТАЛЕКС",
  },
  description:
    "ДЕТАЛЕКС подбирает оригинальные автозапчасти и качественные аналоги по VIN, frame или артикулу. Доставка по Кирову, Кировской области и России.",
  openGraph: {
    title: "ДЕТАЛЕКС - автозапчасти под заказ",
    description:
      "Подбор автозапчастей по VIN, проверка совместимости, федеральные поставщики и доставка по России.",
    url: "https://detaleks.ru",
    siteName: siteContacts.name,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/detaleks-logo.png",
        width: 1600,
        height: 900,
        alt: "ДЕТАЛЕКС автозапчасти под заказ",
      },
    ],
  },
  icons: {
    icon: "/images/detaleks-logo.png",
    apple: "/images/detaleks-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
