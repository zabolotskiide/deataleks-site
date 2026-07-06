import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { paymentMethods, requisites, siteContacts } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const params = await searchParams;
  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  const values = {
    phone: settings?.phone || siteContacts.phone,
    email: settings?.email || siteContacts.email,
    workTime: settings?.workTime || siteContacts.workTime,
    vk: settings?.vk || siteContacts.vk,
    telegram: settings?.telegram || siteContacts.telegram,
    max: settings?.max || siteContacts.max,
    region: settings?.region || siteContacts.city,
    paymentMethods: settings?.paymentMethods || paymentMethods.join("\n"),
    logo: settings?.logo || "/images/detaleks-logo.png",
    heroTitle: settings?.heroTitle || "Автозапчасти под заказ",
    seoTitle: settings?.seoTitle || "ДЕТАЛЕКС - автозапчасти под заказ в Кирове",
    seoDescription: settings?.seoDescription || "Подбор автозапчастей по VIN, frame или артикулу. Доставка по Кирову и России.",
    ipName: settings?.ipName || requisites.ipName,
    inn: settings?.inn || requisites.inn,
    ogrnip: settings?.ogrnip || requisites.ogrnip,
    legalDetails: settings?.legalDetails || `${requisites.ipName}\nИНН ${requisites.inn}\nОГРНИП ${requisites.ogrnip}\n${requisites.legalAddress}`,
  };

  return (
    <main className="admin-page">
      <AdminNav />
      <section className="admin-hero compact"><p className="eyebrow">Настройки</p><h1>Настройки сайта</h1></section>
      <form className="admin-panel admin-settings-form" action="/api/admin/settings" method="post">
        {params.saved ? <p className="admin-success">Настройки сохранены</p> : null}
        <div className="admin-form-grid">
          <label>Телефон<input name="phone" defaultValue={values.phone} /></label>
          <label>Email<input name="email" defaultValue={values.email} /></label>
          <label>График<input name="workTime" defaultValue={values.workTime} /></label>
          <label>Регион<input name="region" defaultValue={values.region} /></label>
          <label>VK<input name="vk" defaultValue={values.vk} /></label>
          <label>Telegram<input name="telegram" defaultValue={values.telegram} /></label>
          <label>MAX<input name="max" defaultValue={values.max} /></label>
          <label>Логотип<input name="logo" defaultValue={values.logo} /></label>
          <label>Текст главного экрана<input name="heroTitle" defaultValue={values.heroTitle} /></label>
          <label>SEO title<input name="seoTitle" defaultValue={values.seoTitle} /></label>
          <label className="wide">SEO description<textarea name="seoDescription" defaultValue={values.seoDescription} rows={3} /></label>
          <label>Название ИП<input name="ipName" defaultValue={values.ipName} /></label>
          <label>ИНН<input name="inn" defaultValue={values.inn} /></label>
          <label>ОГРНИП<input name="ogrnip" defaultValue={values.ogrnip} /></label>
          <label className="wide">Способы оплаты<textarea name="paymentMethods" defaultValue={values.paymentMethods} rows={4} /></label>
          <label className="wide">Юридические реквизиты<textarea name="legalDetails" defaultValue={values.legalDetails} rows={6} /></label>
        </div>
        <button type="submit">Сохранить настройки</button>
      </form>
    </main>
  );
}

function AdminNav() {
  return (
    <nav className="admin-nav">
      <Link href="/admin">Dashboard</Link><Link href="/admin/leads">Заявки</Link><Link href="/admin/settings">Настройки</Link>
      <form action="/api/admin/logout" method="post"><button type="submit">Выйти</button></form>
    </nav>
  );
}