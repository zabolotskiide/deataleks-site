import type { Metadata } from "next";
import { Header } from "../components/Header";
import { requisites, siteContacts } from "@/lib/site";

export const metadata: Metadata = { title: "Согласие на обработку персональных данных" };

export default function PersonalDataConsentPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white"><Header />
      <section className="section legal-page"><div className="mx-auto max-w-4xl px-5 pt-20 sm:px-8">
        <p className="eyebrow">Документы</p><h1>Согласие на обработку персональных данных</h1>
        <p>Отправляя форму на сайте, пользователь дает согласие {requisites.ipName} на обработку персональных данных для связи, уточнения заявки и подбора автозапчастей.</p>
        <p>Согласие распространяется на имя, телефон, VIN/frame/артикул, комментарии и прикрепленные файлы. Пользователь может отозвать согласие, направив обращение на {siteContacts.email}.</p>
        <p>ИНН {requisites.inn}, ОГРНИП {requisites.ogrnip}. Телефон: {siteContacts.phone}.</p>
      </div></section>
    </main>
  );
}