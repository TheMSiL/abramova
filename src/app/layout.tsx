import type { Metadata } from "next";

import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL('https://abramova-svicky.cz'), // Замените на ваш домен
  title: {
    default: "Abramova Svíčky | Ručně vyráběné sójové svíčky",
    template: "%s | Abramova Svíčky"
  },
  description: "Ručně vyráběné svíčky z přírodního sójového vosku. Ekologické, veganské a šetrné k životnímu prostředí. Vonné svíčky, designové svíčky a dekorativní svíčky v květináči. Doručení po celé České republice.",
  keywords: ["sójové svíčky", "ručně vyráběné svíčky", "vonné svíčky", "ekologické svíčky", "přírodní vosk", "designové svíčky", "dekorativní svíčky", "dárky", "svíčky online"],
  authors: [{ name: "Natália Abramova" }],
  creator: "Natália Abramova",
  publisher: "Abramova Svíčky",
  icons: {
    icon: "/fav.svg",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://abramova-svicky.cz",
    siteName: "Abramova Svíčky",
    title: "Abramova Svíčky | Ručně vyráběné sójové svíčky",
    description: "Ručně vyráběné svíčky z přírodního sójového vosku. Ekologické, veganské a šetrné k životnímu prostředí.",
    images: [
      {
        url: "/assets/products/glass/1.jpg",
        width: 1200,
        height: 630,
        alt: "Abramova Svíčky - Ručně vyráběné sójové svíčky"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Abramova Svíčky | Ručně vyráběné sójové svíčky",
    description: "Ručně vyráběné svíčky z přírodního sójového vosku",
    images: ["/assets/products/glass/1.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Добавьте после регистрации в Google Search Console
    // google: 'ваш-код-верификации',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className='text-base bg-black text-white'>
        <div className="max-w-[2000px] w-full mx-auto flex flex-col justify-between min-h-screen">
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
