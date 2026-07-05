const categories = ["Масла", "Фильтры", "Тормоза", "Подвеска", "Аккумуляторы", "Автохимия"];

const products = [
  { name: "Shell Helix Ultra 5W-30 4 л", price: "от 5 290 ₽", tag: "Масло" },
  { name: "Sintec Platinum 7000 5W-40", price: "от 1 750 ₽", tag: "Масло" },
  { name: "Масляный фильтр MANN", price: "от 450 ₽", tag: "Фильтр" },
  { name: "Тормозные колодки TRW", price: "от 2 400 ₽", tag: "Тормоза" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-red-600 text-3xl font-black">Д</div>
            <div className="text-3xl font-black italic tracking-tight">
              ДЕТАЛ<span className="text-red-600">ЕКС</span>
            </div>
          </div>
          <a href="tel:+79823879200" className="hidden rounded-xl bg-red-600 px-5 py-3 font-bold md:block">
            8 (982) 387-92-00
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-br from-black via-red-950/40 to-black px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-red-500/30 bg-white/5 px-5 py-3 text-sm text-zinc-300">
              🔴 Киров · Кировская область · доставка по России
            </div>

            <h1 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Автозапчасти для любых автомобилей
            </h1>

            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-zinc-300">
              Подберем оригинальные запчасти и качественные аналоги по VIN,
              артикулу или названию детали. Быстро, честно, без лишней беготни по магазинам.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
              <p className="mb-3 text-lg font-bold">Введите VIN, артикул или название детали</p>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                  placeholder="Например: WBAX..., масляный фильтр, тормозные колодки"
                  className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-red-500"
                />
                <button className="rounded-2xl bg-red-600 px-8 py-4 font-black hover:bg-red-700">
                  Подобрать
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#vin" className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-black hover:bg-red-700">
                Подбор по VIN
              </a>
              <a href="#catalog" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-lg font-black hover:bg-white/10">
                Открыть каталог
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-8 shadow-2xl">
            <h2 className="text-3xl font-black">Почему выбирают ДЕТАЛЕКС</h2>
            <div className="mt-6 grid gap-4">
              {[
                ["🚗", "Подбор по VIN", "Проверим совместимость перед заказом"],
                ["⚙️", "Оригинал и аналоги", "Предложим несколько вариантов по цене"],
                ["📦", "Доставка", "По Кирову, области и всей России"],
                ["✅", "Проверенные поставщики", "Работаем с надежными каналами поставок"],
              ].map(([icon, title, text]) => (
                <div key={title} className="rounded-2xl bg-white/5 p-5">
                  <div className="text-3xl">{icon}</div>
                  <h3 className="mt-2 text-xl font-black">{title}</h3>
                  <p className="mt-1 text-zinc-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-4xl font-black uppercase">Каталог</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button key={item} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold hover:border-red-500">
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.name} className="rounded-3xl border border-white/10 bg-zinc-950 p-5">
              <div className="grid h-40 place-items-center rounded-2xl bg-gradient-to-br from-zinc-900 to-red-950/40 text-5xl">
                ⚙️
              </div>
              <p className="mt-5 text-sm text-red-500">{product.tag}</p>
              <h3 className="mt-2 min-h-14 text-lg font-black">{product.name}</h3>
              <p className="mt-3 text-2xl font-black">{product.price}</p>
              <button className="mt-5 w-full rounded-2xl bg-red-600 py-3 font-black hover:bg-red-700">
                Запросить наличие
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="vin" className="bg-zinc-950 px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black uppercase">Подбор по VIN</h2>
            <p className="mt-5 text-xl leading-relaxed text-zinc-300">
              Отправьте VIN, марку авто и нужную запчасть. Мы проверим совместимость
              и предложим оригинал или аналоги.
            </p>
          </div>

          <form className="grid gap-4 rounded-3xl border border-white/10 bg-black p-6">
            <input className="rounded-2xl bg-white/5 px-5 py-4 outline-none" placeholder="VIN или авто" />
            <input className="rounded-2xl bg-white/5 px-5 py-4 outline-none" placeholder="Какая запчасть нужна?" />
            <input className="rounded-2xl bg-white/5 px-5 py-4 outline-none" placeholder="Телефон" />
            <button className="rounded-2xl bg-red-600 py-4 font-black">Отправить заявку</button>
          </form>
        </div>
      </section>
    </main>
  );
}