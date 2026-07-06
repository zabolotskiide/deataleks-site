import type { Metadata } from "next";
import { Header } from "../components/Header";
import { paymentMethods, requisites, siteContacts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Реквизиты",
  description: "Реквизиты ИП Заболотский Дмитрий Евгеньевич для оплаты заказов ДЕТАЛЕКС.",
};

const rows = [
  ["ИП", requisites.ipName],
  ["ИНН", requisites.inn],
  ["ОГРНИП", requisites.ogrnip],
  ["ОКПО", requisites.okpo],
  ["Расчетный счет", requisites.bankAccount],
  ["Банк", requisites.bank],
  ["БИК", requisites.bik],
  ["Корр. счет", requisites.correspondentAccount],
  ["Юридический адрес", requisites.legalAddress],
  ["Телефон", siteContacts.phone],
  ["Email", siteContacts.email],
];

export default function RequisitesPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Header />
      <section className="section requisites-page">
        <div className="mx-auto max-w-5xl px-5 pt-20 sm:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">Реквизиты</p>
            <h1>Карточка индивидуального предпринимателя</h1>
          </div>
          <div className="requisites-card reveal">
            {rows.map(([label, value]) => (
              <div key={label} className="requisites-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="payment-grid reveal requisites-payment">
            {paymentMethods.map((method) => (
              <article key={method} className="payment-card">
                {method}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
