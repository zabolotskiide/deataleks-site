import { Benefits } from "./components/Benefits";
import { Catalog } from "./components/Catalog";
import { Contacts } from "./components/Contacts";
import { Delivery } from "./components/Delivery";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Payment } from "./components/Payment";
import { Reviews } from "./components/Reviews";
import { Suppliers } from "./components/Suppliers";
import { siteContacts } from "@/lib/site";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: "ДЕТАЛЕКС",
  telephone: siteContacts.phone,
  email: siteContacts.email,
  areaServed: ["Киров", "Кировская область", "Россия"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Киров",
    addressRegion: "Кировская область",
    addressCountry: "RU",
  },
  openingHours: "Mo-Su 09:00-20:00",
  url: "https://detaleks43.ru",
  sameAs: [siteContacts.vk, siteContacts.telegram, siteContacts.max],
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Header />
      <Hero />
      <Suppliers />
      <Catalog />
      <Benefits />
      <Delivery />
      <Reviews />
      <Payment />
      <FAQ />
      <Contacts />
      <Footer />
    </main>
  );
}
