import Image from "next/image";
import { requisites, siteContacts } from "@/lib/site";

const navigation = [
  { label: "Каталог", href: "#catalog" },
  { label: "Поставщики", href: "#suppliers" },
  { label: "Доставка", href: "#delivery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
  { label: "Реквизиты", href: "/requisites" },
];

const legalLinks = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Пользовательское соглашение", href: "/terms" },
  { label: "Согласие на обработку данных", href: "/personal-data-consent" },
];

export function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 bg-black px-5 py-12 sm:px-8">
      <div className="footer-grid mx-auto max-w-7xl">
        <div>
          <Image src="/images/detaleks-logo.png" alt="ДЕТАЛЕКС автозапчасти под заказ" width={220} height={108} className="footer-logo" />
          <p>Автозапчасти под заказ. Подбор по VIN, проверка совместимости и доставка по России.</p>
        </div>
        <nav aria-label="Навигация в футере">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div>
          <a href={siteContacts.phoneHref} className="footer-strong">{siteContacts.phone}</a>
          <a href={siteContacts.emailHref}>{siteContacts.email}</a>
          <span>{siteContacts.workTime}</span>
          <span>{siteContacts.city}</span>
        </div>
        <div>
          <span>{requisites.ipName}</span>
          <span>ИНН {requisites.inn}</span>
          <span>ОГРНИП {requisites.ogrnip}</span>
          <a href="/requisites" className="footer-strong">Все реквизиты</a>
          {legalLinks.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}