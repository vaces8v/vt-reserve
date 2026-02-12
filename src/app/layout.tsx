import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";

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
    default: "ВТ-Резерв — Навигация и инфраструктура для города будущего",
    template: "%s | ВТ-Резерв",
  },
  description: "ООО ВТ-Резерв — проектирование и производство навигационных систем, информационных указателей и элементов городской инфраструктуры в Москве и по всей России. 15+ лет опыта, 500+ проектов.",
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
    title: "ВТ-Резерв — Навигация и инфраструктура для города будущего",
    description: "Проектирование и производство навигационных систем, информационных указателей и элементов городской инфраструктуры. 15+ лет опыта.",
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
    title: "ВТ-Резерв — Навигация и инфраструктура для города будущего",
    description: "Проектирование и производство навигационных систем. 15+ лет опыта, 500+ проектов.",
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
  verification: {
    yandex: "verification_token",
  },
  alternates: {
    canonical: siteUrl,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {process.env.NODE_ENV === "development" && <Agentation />}
        {children}
      </body>
    </html>
  );
}
