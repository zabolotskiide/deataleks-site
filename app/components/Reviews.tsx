const reviews = [
  { name: "Никита Бусыгин", date: "27 июня 2026, отредактирован", text: "Заказывал запчасти, продавец предложил большой ассортимент, помог с выбором фирмы. Заказ доставили в срок!" },
  { name: "Кирилл", date: "25 июня 2026", text: "Все супер. Запы прилетели сходу, по вину. Все как и надо, обращайтесь без сомнения." },
  { name: "Николай Петров", date: "27 июня 2026", text: "Искренне рекомендую этот магазин автозапчастей. Покупаю здесь уже не первый раз, и каждый раз остаюсь доволен. Продавец отлично знает свой товар." },
  { name: "Иван Мартынец", date: "28 июня 2026", text: "Оформил заказ. Подобрали по vin коду весь перечень запчастей, предложили хорошие аналоги по адекватным ценам, привезли быстро." },
  { name: "Александр Пирогов", date: "25 июня 2026", text: "Быстро подобрали нужные запчасти по VIN-коду. Все подошло без проблем. Спасибо за оперативную работу и адекватные цены." },
  { name: "Максим Ардашев", date: "25 июня 2026", text: "Заказывал запчасти через ДЕТАЛЕКС. Помогли с подбором, предложили несколько вариантов по цене. Заказ получил в срок, рекомендую." },
  { name: "Александр Андреевич", date: "25 июня 2026", text: "Вежливый и компетентный персонал. Доступные цены и оперативная работа. Спасибо!" },
];

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export function Reviews() {
  return (
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
  );
}