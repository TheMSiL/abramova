import Category from "@/components/Category";
import Hero from "@/components/Hero";
import Why from "@/components/Why";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hlavní stránka | Abramova Svíčky",
  description: "Ručně vyráběné sójové svíčky s láskou a péčí. Vonné svíčky, designové svíčky a dekorativní svíčky v květináči. Ekologické a veganské. Objevte kolekci Abramova Svíčky.",
  openGraph: {
    title: "Abramova Svíčky | Ručně vyráběné sójové svíčky",
    description: "Ručně vyráběné sójové svíčky s láskou a péčí. Ekologické a veganské.",
    images: ["/assets/products/glass/1.jpg"]
  }
};

export default function Home() {
  return (
    <>
      <Hero />
      <Why />
      <Category />

      {/* JSON-LD структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Abramova Svíčky",
            "description": "Ručně vyráběné sójové svíčky z přírodního vosku",
            "url": "https://abramova-svicky.cz",
            "logo": "https://abramova-svicky.cz/assets/logo.svg",
            "image": "https://abramova-svicky.cz/assets/products/glass/1.jpg",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CZ"
            }
          })
        }}
      />
    </>
  );
}