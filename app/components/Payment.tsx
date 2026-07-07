import { UiIcon } from "./UiIcon";

const paymentDetails = [
  { title: "Наличная оплата", text: "Оплата при получении после согласования заказа.", icon: "cash" },
  { title: "CloudKassir", text: "Онлайн-оплата банковской картой через платежный сервис.", icon: "card" },
  { title: "Расчетный счет", text: "Безналичная оплата по реквизитам ИП.", icon: "invoice" },
];

export function Payment() {
  return (
    <section id="payment" className="section">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="section-heading reveal">
          <p className="eyebrow">Оплата</p>
          <h2>Удобные способы оплаты заказа</h2>
        </div>
        <div className="payment-grid reveal">
          {paymentDetails.map((method) => (
            <article key={method.title} className="payment-card">
              <span className="card-icon"><UiIcon type={method.icon} /></span>
              <strong>{method.title}</strong>
              <small>{method.text}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}