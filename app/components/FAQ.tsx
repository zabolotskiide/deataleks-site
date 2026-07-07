const faqs = [
  { question: "Можно ли заказать деталь только по VIN?", answer: "Да. Пришлите VIN, frame, артикул или список деталей. Мы проверим применимость и предложим подходящие варианты." },
  { question: "Показывает ли сайт цены и остатки?", answer: "Нет. До подключения реальных API поставщиков сайт принимает заявки и не показывает неподтвержденные цены, наличие или остатки." },
  { question: "Есть доставка по России?", answer: "Да. ДЕТАЛЕКС работает с доставкой по Кирову, Кировской области и России." },
  { question: "Как оплатить заказ?", answer: "Доступна наличная оплата, онлайн-оплата через CloudKassir и оплата по расчетному счету." },
  { question: "Как оставить заявку?", answer: "Позвоните по телефону 8 (982) 387-92-00 или отправьте форму с VIN, телефоном, описанием деталей и файлом при необходимости." },
];

export function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="section-heading reveal">
          <p className="eyebrow">FAQ</p>
          <h2>Ответы на частые вопросы</h2>
        </div>
        <div className="faq-list reveal">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}