import type { Metadata } from "next";

import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Abramova Svičky",
  description: "Svíčky od Abramovy, to jsou ručně vyráběné svíčky z přírodních vosků, které přinášejí teplo a atmosféru do vašeho domova. Naše svíčky jsou pečlivě vytvořeny s láskou a péčí, aby vám poskytly nejen krásný vzhled, ale i příjemnou vůni. Vyberte si z naší široké nabídky různých vůní a designů, které dokonale doplní váš interiér a vytvoří útulnou atmosféru pro každou příležitost.",
  icons: {
    icon: "/fav.svg",
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
