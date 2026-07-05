const suppliers = [
  "EMEX",
  "PartKom",
  "Autodoc",
  "ROSSKO",
  "ARMTEK",
  "Форум Авто",
  "АвтоПитер",
  "ТракМоторс",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-red-950/30 to-black px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-red-500/30 bg-white/5 px-5 py-3 text-sm text-zinc-300">
            🔴 Киров • Кировская область • доставка по России
          </div>

          <h1 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl xl:text-7xl">
            Подберём запчасти
            <br />
            для вашего авто
            <br />
            <span className="text-red-600">за 10 минут</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Оригинальные запчасти и качественные аналоги по VIN, артикулу или
            названию детали. Работаем с крупнейшими поставщиками России.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
            <p className="mb-3 text-lg font-bold">
              Введите VIN, артикул или название детали
            </p>

            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <input
                placeholder="Например: Opel Astra H, фильтр, тормозные колодки"
                className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none focus:border-red-500"
              />

              <button className="rounded-2xl bg-red-600 px-8 py-4 font-black hover:bg-red-700">
                Подобрать
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-black text-red-500">10 мин</div>
              <div className="text-sm text-zinc-400">среднее время подбора</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-black text-red-500">1 000 000+</div>
              <div className="text-sm text-zinc-400">позиций у поставщиков</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-black text-red-500">Гарантия</div>
              <div className="text-sm text-zinc-400">оригинал и аналоги</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-black text-red-500">Россия</div>
              <div className="text-sm text-zinc-400">доставка по стране</div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-zinc-950/90 p-7 shadow-2xl">
          <h2 className="text-3xl font-black uppercase">
            Проверенные поставщики
          </h2>

          <p className="mt-3 text-zinc-400">
            Подбираем детали через крупные склады и федеральные площадки.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {suppliers.map((name) => (
              <div
                key={name}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-black uppercase tracking-wide hover:border-red-500"
              >
                {name}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-red-600 p-5">
            <div className="text-2xl font-black">Грузовые запчасти</div>
            <p className="mt-2 text-red-100">
              Отдельное направление — запчасти для грузовых через ТракМоторс.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}