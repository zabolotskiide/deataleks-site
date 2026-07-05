export function Hero() {
  return (
    <section className="bg-gradient-to-br from-black via-red-950/40 to-black px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-red-500/30 bg-white/5 px-5 py-3 text-sm text-zinc-300">
            🚗 Киров • Доставка по России
          </div>

          <h1 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
            Автозапчасти
            <br />
            для любых автомобилей
          </h1>

          <p className="mt-8 max-w-xl text-xl text-zinc-300">
            Подбор по VIN, оригинальные запчасти и качественные аналоги.
            Работаем с проверенными поставщиками по всей России.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-red-600 px-8 py-4 font-bold hover:bg-red-700 transition">
              Подбор по VIN
            </button>

            <button className="rounded-2xl border border-white/10 px-8 py-4 font-bold hover:border-red-500 transition">
              Каталог
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
          <h2 className="text-3xl font-black">
            Почему выбирают ДЕТАЛЕКС
          </h2>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-white/5 p-5">
              🚗 Подбор по VIN
            </div>

            <div className="rounded-2xl bg-white/5 p-5">
              📦 Более миллиона запчастей
            </div>

            <div className="rounded-2xl bg-white/5 p-5">
              ⚙️ Оригинал и качественные аналоги
            </div>

            <div className="rounded-2xl bg-white/5 p-5">
              🚚 Быстрая доставка
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}