import { LeadForm } from "./LeadForm";

const featureCards = [
  { title: "Подбор по VIN", text: "Точность подбора", icon: "shield" },
  { title: "Оригиналы и аналоги", text: "Варианты по цене и срокам", icon: "disc" },
  { title: "Доставка по Кирову и России", text: "Удобный способ получения", icon: "truck" },
  { title: "Проверка совместимости", text: "Сверка перед заказом", icon: "scan" },
];

function FeatureIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    shield: "M12 3 5 6v5c0 5 3.4 8.5 7 10 3.6-1.5 7-5 7-10V6l-7-3Z M9 12l2 2 4-5",
    disc: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M12 3v5 M12 16v5 M3 12h5 M16 12h5",
    truck: "M3 6h11v9H3V6Z M14 9h4l3 3v3h-7V9Z M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    scan: "M7 3H4a1 1 0 0 0-1 1v3 M17 3h3a1 1 0 0 1 1 1v3 M7 21H4a1 1 0 0 1-1-1v-3 M17 21h3a1 1 0 0 0 1-1v-3 M8 12h8 M12 8v8",
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
      <path
        d={paths[type]}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero relative min-h-screen overflow-hidden pt-24 lg:pt-28">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-smoke smoke-a" aria-hidden="true" />
      <div className="hero-smoke smoke-b" aria-hidden="true" />
      <div className="hero-sparks" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[660px] max-w-[1440px] items-center gap-8 px-5 py-10 sm:px-8 lg:min-h-[680px] lg:grid-cols-[0.95fr_0.58fr] xl:px-10">
        <div className="reveal max-w-3xl">
          <p className="eyebrow hero-kicker">Подбор запчастей по VIN</p>
          <h1 className="mt-5 text-balance text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl">
            Автозапчасти
            <br />
            <span className="text-red-600">под заказ</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/76 sm:text-lg">
            Подберём оригинальные запчасти и качественные аналоги по VIN, frame или артикулу. Проверим совместимость и предложим варианты по цене и срокам.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contacts" className="premium-button">
              Подбор по VIN
            </a>
            <a href="#catalog" className="ghost-button">
              Открыть каталог
            </a>
          </div>
        </div>

        <LeadForm variant="hero" source="Hero VIN" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-3 px-5 pb-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 xl:px-10">
        {featureCards.map((feature) => (
          <article key={feature.title} className="stat-card reveal">
            <span className="card-icon"><FeatureIcon type={feature.icon} /></span>
            <span>
              <strong>{feature.title}</strong>
              <small>{feature.text}</small>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
