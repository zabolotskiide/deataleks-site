import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AdminLeadEditor } from "@/app/components/admin/AdminLeadEditor";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { leadStatusLabel } from "@/lib/lead-status";
import { prisma } from "@/lib/prisma";

function money(value: number | null | undefined) {
  return typeof value === "number" ? new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value) : "-";
}

export default async function AdminLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { notes: { orderBy: { createdAt: "desc" } }, calculations: { orderBy: { createdAt: "desc" } }, supplierQuotes: { orderBy: { createdAt: "desc" } } },
  });
  if (!lead) notFound();
  const lastCalculation = lead.calculations[0];

  return (
    <main className="admin-page">
      <AdminNav />
      <section className="admin-hero compact"><p className="eyebrow">Заявка {lead.id.slice(0, 8)}</p><h1>{lead.name || lead.phone || "Новая заявка"}</h1></section>
      <section className="admin-detail-grid">
        <article className="admin-panel">
          <h2>Данные клиента</h2>
          <dl className="admin-dl">
            <div><dt>Дата</dt><dd>{lead.createdAt.toLocaleString("ru-RU")}</dd></div>
            <div><dt>Имя</dt><dd>{lead.name || "-"}</dd></div>
            <div><dt>Телефон</dt><dd>{lead.phone || "-"}</dd></div>
            <div><dt>VIN / Frame / Артикул</dt><dd>{lead.vin || "-"}</dd></div>
            <div><dt>Что нужно подобрать</dt><dd>{lead.partName || lead.comment || "-"}</dd></div>
            <div><dt>Источник</dt><dd>{lead.source || "-"}</dd></div>
            <div><dt>Статус</dt><dd>{leadStatusLabel(lead.status)}</dd></div>
            <div><dt>Файл</dt><dd>{lead.filePath ? <a href={lead.filePath} target="_blank">{lead.fileName || "Открыть файл"}</a> : "-"}</dd></div>
          </dl>
        </article>
        <article className="admin-panel">
          <h2>Последний расчет</h2>
          <dl className="admin-dl"><div><dt>Итоговая цена</dt><dd>{money(lead.finalPrice)}</dd></div><div><dt>Прибыль</dt><dd>{money(lead.profit)}</dd></div><div><dt>Себестоимость</dt><dd>{money(lastCalculation?.costPrice)}</dd></div><div><dt>Маржинальность</dt><dd>{lastCalculation ? `${lastCalculation.marginPercent.toFixed(1)}%` : "-"}</dd></div></dl>
        </article>
      </section>
      <section className="admin-panel">
        <h2>Результаты API поставщиков</h2>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Поставщик</th><th>Артикул</th><th>Бренд</th><th>Название</th><th>Закупка</th><th>Наценка</th><th>Цена клиента</th><th>Срок</th><th>Кол-во</th><th>Склад</th></tr></thead><tbody>
          {lead.supplierQuotes.map((quote) => <tr key={quote.id}><td>{quote.supplier}</td><td>{quote.article || "-"}</td><td>{quote.brand || "-"}</td><td>{quote.name || "-"}</td><td>{money(quote.purchasePrice)}</td><td>{money(quote.markup)}</td><td>{money(quote.clientPrice)}</td><td>{quote.deliveryTerm || "-"}</td><td>{quote.quantity || "-"}</td><td>{quote.warehouse || "-"}</td></tr>)}
          {lead.supplierQuotes.length === 0 ? <tr><td colSpan={10}>Нет результатов. TODO: подключить реальные методы API поставщиков после предоставления документации.</td></tr> : null}
        </tbody></table></div>
      </section>
      <AdminLeadEditor lead={{ id: lead.id, status: lead.status, managerComment: lead.managerComment }} />
      <section className="admin-detail-grid"><article className="admin-panel"><h2>История заметок</h2><div className="admin-history">{lead.notes.map((note) => <p key={note.id}><span>{note.createdAt.toLocaleString("ru-RU")}</span>{note.text}</p>)}{lead.notes.length === 0 ? <p>Заметок пока нет.</p> : null}</div></article><article className="admin-panel"><h2>История расчетов</h2><div className="admin-history">{lead.calculations.map((calculation) => <p key={calculation.id}><span>{calculation.createdAt.toLocaleString("ru-RU")}</span>Цена {money(calculation.finalPrice)}, прибыль {money(calculation.profit)}</p>)}{lead.calculations.length === 0 ? <p>Расчетов пока нет.</p> : null}</div></article></section>
    </main>
  );
}

function AdminNav() {
  return <nav className="admin-nav"><Link href="/admin">Dashboard</Link><Link href="/admin/leads">Заявки</Link><Link href="/admin/settings">Настройки</Link><form action="/api/admin/logout" method="post"><button type="submit">Выйти</button></form></nav>;
}