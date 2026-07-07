import { siteContacts } from "@/lib/site";
import { LeadForm } from "./LeadForm";

export function Contacts() {
  return (
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
  );
}