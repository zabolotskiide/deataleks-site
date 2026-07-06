import type { Metadata } from "next";
import { Header } from "../components/Header";
import { requisites, siteContacts } from "@/lib/site";

export const metadata: Metadata = { title: "Пользовательское соглашение" };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white"><Header />
      <section className="section legal-page"><div className="mx-auto max-w-4xl px-5 pt-20 sm:px-8">
        <p className="eyebrow">Документы</p><h1>Пользовательское соглашение</h1>
        <p>Сайт ДЕТАЛЕКС является системой приема заявок на подбор автозапчастей под заказ. Информация в каталоге носит справочный характер и не является публичной офертой.</p>
        <p>На сайте не отображаются подтвержденные цены, остатки или сроки поставщиков. Итоговые условия заказа согласуются индивидуально после обработки заявки.</p>
        <p>Владелец сайта: {requisites.ipName}, ИНН {requisites.inn}, ОГРНИП {requisites.ogrnip}. Регион работы: {siteContacts.city}, доставка по России.</p>
      </div></section>
    </main>
  );
}