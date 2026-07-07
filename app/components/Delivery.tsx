const deliverySteps = [
  { title: "Заявка", text: "Вы отправляете VIN, артикул, фото или список деталей." },
  { title: "VIN-подбор", text: "Сверяем применимость и готовим варианты для согласования." },
  { title: "Согласование", text: "Обсуждаем бренд, срок, способ оплаты и получения." },
  { title: "Доставка", text: "Передаем заказ по Кирову или отправляем по России." },
];

export function Delivery() {
  return (
    <section id="delivery" className="section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="section-heading reveal">
          <p className="eyebrow">Доставка</p>
          <h2>Путь заказа выглядит прозрачно</h2>
        </div>
        <div className="delivery-timeline reveal">
          {deliverySteps.map((step, index) => (
            <article key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}