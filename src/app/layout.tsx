import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";
import YandexMetrika from "@/components/YandexMetrika";
import StructuredData from "@/components/StructuredData";
import ChunkErrorRecovery from "@/components/ChunkErrorRecovery";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vt-reserve.ru";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#DC2626",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Навигационные системы в Москве — ВТ-Резерв",
    template: "%s | ВТ-Резерв",
  },
  description: "Проектирование и производство навигационных систем, информационных указателей, стел и элементов городской инфраструктуры в Москве. ООО ВТ-Резерв — 15+ лет опыта, 50+ реализованных объектов по всей России.",
  keywords: ["навигация", "указатели", "городская среда", "таблички", "вывески", "Москва", "информационные стенды", "навигационные системы", "городская инфраструктура"],
  authors: [{ name: "ВТ-Резерв", url: siteUrl }],
  creator: "ВТ-Резерв",
  publisher: "ООО ВТ-Резерв",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "ВТ-Резерв",
    title: "Навигационные системы в Москве — ВТ-Резерв",
    description: "Проектирование и производство навигационных систем, информационных указателей, стел для медучреждений, ЖК, парков и ТЦ. 15+ лет опыта, 50+ объектов.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ВТ-Резерв — Навигация для города",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Навигационные системы в Москве — ВТ-Резерв",
    description: "Производство навигационных систем, указателей и стел для любых объектов. 15+ лет опыта, 50+ проектов по России.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "yandex": "all",
  },
  verification: {
    yandex: "0e4d6d545a2b1cbb",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'ВТ-Резерв',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="mailru-domain" content="dECEDbN4saRDcV5N" />
        <meta name="geo.region" content="RU-MOW" />
        <meta name="geo.placename" content="Москва" />
        <meta name="geo.position" content="55.800;37.390" />
        <meta name="ICBM" content="55.800, 37.390" />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <YandexMetrika />
        <ChunkErrorRecovery />
        {process.env.NODE_ENV === "development" && <Agentation />}
        {children}
      </body>
    </html>
  );
}
