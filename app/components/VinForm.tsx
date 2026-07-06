import { LeadForm } from "./LeadForm";
import { siteContacts } from "@/lib/site";

const advantages = [
  {
    title: "Подбор по VIN, frame и артикулу",
    text: "Принимаем заявку в удобном формате и уточняем применимость перед заказом.",
    icon: "scan",
  },
  {
    title: "Проверка совместимости",
    text: "Сверяем деталь с автомобилем, чтобы снизить риск ошибки при заказе.",
    icon: "check",
  },
  {
    title: "Оригиналы и аналоги",
    text: "Предлагаем варианты под разные задачи, бюджет и сроки после обработки заявки.",
    icon: "layers",
  },
  {
    title: "Доставка по России",
    text: "Работаем по Кирову, Кировской области и отправляем заказы по России.",
    icon: "route",
  },
  {
    title: "Федеральные поставщики",
    text: "Используем федеральные каналы поставки без показа неподтвержденных остатков на сайте.",
    icon: "network",
  },
  {
    title: "Удобная оплата",
    text: "Наличные, CloudKassir и оплата по расчетному счету.",
    icon: "wallet",
  },
];

const paymentDetails = [
  {
    title: "Наличная оплата",
    text: "Оплата при получении после согласования заказа.",
    icon: "cash",
  },
  {
    title: "CloudKassir",
    text: "Онлайн-оплата банковской картой через платежный сервис.",
    icon: "card",
  },
  {
    title: "Расчетный счет",
    text: "Безналичная оплата по реквизитам ИП.",
    icon: "invoice",
  },
];

const deliverySteps = [
  {
    title: "Заявка",
    text: "Вы отправляете VIN, артикул, фото или список деталей.",
  },
  {
    title: "VIN-подбор",
    text: "Сверяем применимость и готовим варианты для согласования.",
  },
  {
    title: "Согласование",
    text: "Обсуждаем бренд, срок, способ оплаты и получения.",
  },
  {
    title: "Доставка",
    text: "Передаем заказ по Кирову или отправляем по России.",
  },
];

const reviews = [
  {
    name: "Никита Бусыгин",
    date: "27 июня 2026, отредактирован",
    text: "Заказывал запчасти, продавец предложил большой ассортимент, помог с выбором фирмы. Заказ доставили в срок!",
  },
  {
    name: "Кирилл",
    date: "25 июня 2026",
    text: "Все супер. Запы прилетели сходу, по вину. Все как и надо, обращайтесь без сомнения.",
  },
  {
    name: "Николай Петров",
    date: "27 июня 2026",
    text: "Искренне рекомендую этот магазин автозапчастей. Покупаю здесь уже не первый раз, и каждый раз остаюсь доволен. Продавец отлично знает свой товар.",
  },
  {
    name: "Иван Мартынец",
    date: "28 июня 2026",
    text: "Оформил заказ. Подобрали по vin коду весь перечень запчастей, предложили хорошие аналоги по адекватным ценам, привезли быстро.",
  },
  {
    name: "Александр Пирогов",
    date: "25 июня 2026",
    text: "Быстро подобрали нужные запчасти по VIN-коду. Все подошло без проблем. Спасибо за оперативную работу и адекватные цены.",
  },
  {
    name: "Максим Ардашев",
    date: "25 июня 2026",
    text: "Заказывал запчасти через ДЕТАЛЕКС. Помогли с подбором, предложили несколько вариантов по цене. Заказ получил в срок, рекомендую.",
  },
  {
    name: "Александр Андреевич",
    date: "25 июня 2026",
    text: "Вежливый и компетентный персонал. Доступные цены и оперативная работа. Спасибо!",
  },
];

const faqs = [
  {
    question: "Можно ли заказать деталь только по VIN?",
    answer: "Да. Пришлите VIN, frame, артикул или список деталей. Мы проверим применимость и предложим подходящие варианты.",
  },
  {
    question: "Показывает ли сайт цены и остатки?",
    answer: "Нет. До подключения реальных API поставщиков сайт принимает заявки и не показывает неподтвержденные цены, наличие или остатки.",
  },
  {
    question: "Есть доставка по России?",
    answer: "Да. ДЕТАЛЕКС работает с доставкой по Кирову, Кировской области и России.",
  },
  {
    question: "Как оплатить заказ?",
    answer: "Доступна наличная оплата, онлайн-оплата через CloudKassir и оплата по расчетному счету.",
  },
  {
    question: "Как оставить заявку?",
    answer: "Позвоните по телефону 8 (982) 387-92-00 или отправьте форму с VIN, телефоном, описанием деталей и файлом при необходимости.",
  },
];

function UiIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    scan: "M7 3H4a1 1 0 0 0-1 1v3 M17 3h3a1 1 0 0 1 1 1v3 M7 21H4a1 1 0 0 1-1-1v-3 M17 21h3a1 1 0 0 0 1-1v-3 M8 12h8",
    layers: "m12 3 8 4-8 4-8-4 8-4Z M4 12l8 4 8-4 M4 17l8 4 8-4",
    route: "M5 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M8 15h3a4 4 0 0 0 4-4V9",
    check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M8.5 12.2l2.3 2.3 4.8-5",
    network: "M5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M8 9h8 M7 12l3 4 M17 12l-3 4",
    wallet: "M4 7h14a2 2 0 0 1 2 2v9H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z M16 12h4 M5 7l10-4 2 4",
    cash: "M4 7h16v10H4V7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M7 10v4 M17 10v4",
    card: "M3 7h18v10H3V7Z M3 10h18 M7 14h4",
    invoice: "M7 3h10v18H7V3Z M10 8h4 M10 12h4 M10 16h3",
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export function VinForm() {
  return (
    <>
      <section id="advantages" className="section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">Доверие</p>
            <h2>Почему выбирают ДЕТАЛЕКС</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage) => (
              <article key={advantage.title} className="advantage-card reveal">
                <span className="card-icon"><UiIcon type={advantage.icon} /></span>
                <h3>{advantage.title}</h3>
                <p>{advantage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section id="reviews" className="section reviews-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="section-heading reveal">
            <p className="eyebrow">Отзывы</p>
            <h2>Реальные отзывы клиентов из 2ГИС</h2>
          </div>
          <div className="reviews-track reveal" aria-label="Отзывы клиентов из 2ГИС">
            {reviews.map((review) => (
              <article key={`${review.name}-${review.date}`} className="review-card">
                <div className="review-meta">
                  <span className="stars" aria-label="5 звезд">★★★★★</span>
                  <span className="gis-badge">2ГИС</span>
                </div>
                <p>«{review.text}»</p>
                <div className="review-author">
                  <span className="avatar">{initials(review.name)}</span>
                  <span>
                    <strong>{review.name}</strong>
                    <small>{review.date}</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section id="contacts" className="section contacts-section">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="contact-info reveal">
            <p className="eyebrow">Контакты</p>
            <h2>Отправьте VIN или список деталей</h2>
            <p>
              ДЕТАЛЕКС принимает заявки на автозапчасти под заказ, проверяет совместимость и организует доставку по Кирову,
              Кировской области и России.
            </p>
            <div className="contact-stack">
              <a href={siteContacts.phoneHref} className="contact-line">{siteContacts.phone}</a>
              <a href={siteContacts.emailHref} className="contact-line">{siteContacts.email}</a>
              <span className="contact-line">{siteContacts.workTime}</span>
              <span className="contact-line">{siteContacts.city}</span>
              <span className="contact-line">{siteContacts.delivery}</span>
            </div>
            <div className="social-row">
              <a href={siteContacts.telegram} target="_blank" rel="noreferrer" className="social-button">Telegram</a>
              <a href={siteContacts.max} target="_blank" rel="noreferrer" className="social-button">MAX</a>
              <a href={siteContacts.vk} target="_blank" rel="noreferrer" className="social-button">VK</a>
            </div>
            <div className="map-panel" aria-label="Зона работы ДЕТАЛЕКС">
              <strong>Киров и Кировская область</strong>
              <span>Подбор, согласование и доставка заказов по России.</span>
            </div>
          </div>
          <LeadForm variant="contact" source="Contacts form" />
        </div>
      </section>
    </>
  );
}
