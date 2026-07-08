import { siteContacts } from "@/lib/site";

const navItems = [
  { label: "Каталог", href: "#catalog" },
  { label: "Поставщики", href: "#suppliers" },
  { label: "Доставка", href: "#delivery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const socialLinks = [
  { label: "TG", href: siteContacts.telegram },
  { label: "MAX", href: siteContacts.max },
  { label: "VK", href: siteContacts.vk },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="header-logo" aria-label="ДЕТАЛЕКС">
          <span className="brand-word">
            ДЕТАЛ<span>ЕКС</span>
          </span>
          <small>автозапчасти под заказ</small>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="header-socials hidden xl:flex" aria-label="Социальные сети">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={siteContacts.phoneHref}
            className="hidden leading-tight text-white/70 transition hover:text-white md:block"
          >
            <span className="block text-sm font-black text-white">{siteContacts.phone}</span>
            <span className="block text-[11px] font-bold text-white/45">{siteContacts.workTime}</span>
          </a>
          <a href="#contacts" className="header-button">
            Подбор по VIN
          </a>
        </div>
      </div>
    </header>
  );
}
