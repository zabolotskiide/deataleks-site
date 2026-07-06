import type { Metadata } from "next";
import { Header } from "../components/Header";
import { requisites, siteContacts } from "@/lib/site";

export const metadata: Metadata = { title: "Политика конфиденциальности" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white"><Header />
      <section className="section legal-page"><div className="mx-auto max-w-4xl px-5 pt-20 sm:px-8">
        <p className="eyebrow">Документы</p><h1>Политика конфиденциальности</h1>
        <p>ДЕТАЛЕКС обрабатывает персональные данные, которые пользователь передает через формы сайта: имя, телефон, VIN/frame/артикул, комментарий и прикрепленные файлы.</p>
        <p>Данные используются только для обработки заявки, связи с клиентом, подбора автозапчастей и исполнения заказа. Данные не публикуются и не передаются третьим лицам, кроме случаев, необходимых для выполнения заказа или предусмотренных законом.</p>
        <p>Оператор: {requisites.ipName}, ИНН {requisites.inn}, ОГРНИП {requisites.ogrnip}. Контакты: {siteContacts.phone}, {siteContacts.email}.</p>
      </div></section>
    </main>
  );
}