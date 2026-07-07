import { UiIcon } from "./UiIcon";

const benefits = [
  { title: "Подбор по VIN, frame и артикулу", text: "Принимаем заявку в удобном формате и уточняем применимость перед заказом.", icon: "scan" },
  { title: "Проверка совместимости", text: "Сверяем деталь с автомобилем, чтобы снизить риск ошибки при заказе.", icon: "check" },
  { title: "Оригиналы и аналоги", text: "Предлагаем варианты под разные задачи, бюджет и сроки после обработки заявки.", icon: "layers" },
  { title: "Доставка по России", text: "Работаем по Кирову, Кировской области и отправляем заказы по России.", icon: "route" },
  { title: "Федеральные поставщики", text: "Используем федеральные каналы поставки без показа неподтвержденных остатков на сайте.", icon: "network" },
  { title: "Удобная оплата", text: "Наличные, CloudKassir и оплата по расчетному счету.", icon: "wallet" },
];

export function Benefits() {
  return (
    <section id="advantages" className="section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="section-heading reveal">
          <p className="eyebrow">Доверие</p>
          <h2>Почему выбирают ДЕТАЛЕКС</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="advantage-card reveal">
              <span className="card-icon"><UiIcon type={benefit.icon} /></span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}