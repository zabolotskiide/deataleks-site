const products = [
  { title: "Масла", description: "Моторные и трансмиссионные масла под допуски автомобиля.", icon: "oil" },
  { title: "Фильтры", description: "Масляные, воздушные, салонные и топливные фильтры.", icon: "filter" },
  { title: "Тормоза", description: "Колодки, диски, суппорты и расходники тормозной системы.", icon: "brake" },
  { title: "Подвеска", description: "Амортизаторы, рычаги, стойки, тяги и сайлентблоки.", icon: "suspension" },
  { title: "Двигатель", description: "Прокладки, ремни, ролики, опоры и детали обслуживания.", icon: "engine" },
  { title: "КПП", description: "Детали трансмиссии, сцепления и приводных узлов.", icon: "gearbox" },
  { title: "Электрика", description: "Датчики, свечи, генераторы, стартеры и электронные компоненты.", icon: "bolt" },
  { title: "Аккумуляторы", description: "АКБ под параметры конкретного автомобиля.", icon: "battery" },
  { title: "Автохимия", description: "Уход, очистка, масла, присадки и технические жидкости.", icon: "chemistry" },
  { title: "Кузовные детали", description: "Крепеж, элементы кузова и детали внешней отделки.", icon: "body" },
  { title: "Оптика", description: "Фары, фонари, лампы и элементы освещения автомобиля.", icon: "light" },
  { title: "Грузовые запчасти", description: "Запчасти для грузовых автомобилей и коммерческого транспорта.", icon: "truck" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M5 12h13m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ProductIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    oil: "M8 4h8v3l-2 3v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-8L7 7V4Z M9 7h6 M15 13l4 2-2 3-3-2",
    filter: "M5 6h14 M7 10h10 M9 14h6 M11 18h2 M4 4h16l-6 8v6l-4 2v-8L4 4Z",
    brake: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M12 3v4 M12 17v4 M3 12h4 M17 12h4",
    suspension: "M6 4v16 M18 4v16 M6 8h12 M6 16h12 M10 8v8 M14 8v8",
    engine: "M7 8h10v8H7V8Z M4 11h3 M17 11h3 M10 5h4 M12 5v3 M5 15h2 M17 15h2 M9 18h6 M3 9v8 M21 9v8",
    gearbox: "M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M12 7v4l-6 4 M12 11l6 4",
    bolt: "M13 2 4 14h7l-1 8 10-13h-7l1-7Z",
    battery: "M5 7h14v11H5V7Z M9 5h6 M8 12h3 M13 12h3 M14 10v4",
    chemistry: "M10 3h4 M11 3v5l-5 9a3 3 0 0 0 2.6 4.5h6.8A3 3 0 0 0 18 17l-5-9V3 M8 16h8",
    body: "M3 14l2-5h14l2 5v5h-3a2 2 0 1 1-4 0H10a2 2 0 1 1-4 0H3v-5Z M6 9l2-3h8l2 3 M7 14h10",
    light: "M4 12c2-4 5-6 9-6 3 0 6 2 7 6-1 4-4 6-7 6-4 0-7-2-9-6Z M13 9a3 3 0 1 1 0 6 M3 5l3 2 M3 19l3-2",
    truck: "M3 7h11v9H3V7Z M14 10h4l3 3v3h-7v-6Z M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" />
    </svg>
  );
}

export function Catalog() {
  return (
    <section id="catalog" className="section catalog-section">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 xl:px-10">
          <div className="section-heading reveal catalog-heading-row">
            <div>
              <p className="eyebrow">Каталог</p>
              <h2>Каталог товаров</h2>
            </div>
            <a href="#contacts" className="section-link">
              Перейти к подбору <ArrowIcon />
            </a>
          </div>
          <div className="catalog-grid grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {products.map((product) => (
              <article key={product.title} className="product-card reveal">
                <div className="product-visual">
                  <ProductIcon type={product.icon} />
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <a href={`/?category=${encodeURIComponent(product.title)}#contacts`} aria-label={`Запросить ${product.title}`} className="card-link">
                  Подобрать
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
    </section>
  );
}
