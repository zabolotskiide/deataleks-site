import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { leadStatusLabel } from "@/lib/lead-status";
import { prisma } from "@/lib/prisma";

function money(value: number | null) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value || 0);
}

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [total, newCount, inWorkCount, closedCount, leads, profit] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.lead.count({ where: { status: "in_progress" } }),
    prisma.lead.count({ where: { status: "closed" } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.lead.aggregate({ _sum: { profit: true } }),
  ]);

  return (
    <main className="admin-page">
      <AdminNav />
      <section className="admin-hero">
        <p className="eyebrow">Dashboard</p>
        <h1>Админ-панель ДЕТАЛЕКС</h1>
      </section>
      <section className="admin-stats">
        <article><span>Все заявки</span><strong>{total}</strong></article>
        <article><span>Новые</span><strong>{newCount}</strong></article>
        <article><span>В работе</span><strong>{inWorkCount}</strong></article>
        <article><span>Закрытые</span><strong>{closedCount}</strong></article>
        <article><span>Потенциальная прибыль</span><strong>{money(profit._sum.profit || 0)}</strong></article>
      </section>
      <section className="admin-panel">
        <div className="admin-section-title"><h2>Последние заявки</h2><Link href="/admin/leads">Все заявки</Link></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Дата</th><th>Клиент</th><th>VIN/frame/артикул</th><th>Статус</th><th>Действие</th></tr></thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id.slice(0, 8)}</td>
                  <td>{lead.createdAt.toLocaleString("ru-RU")}</td>
                  <td>{lead.name || lead.phone || "-"}</td>
                  <td>{lead.vin || "-"}</td>
                  <td>{leadStatusLabel(lead.status)}</td>
                  <td><Link href={`/admin/leads/${lead.id}`}>Открыть</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function AdminNav() {
  return (
    <nav className="admin-nav">
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/leads">Заявки</Link>
      
      <Link href="/admin/settings">Настройки</Link>
      <form action="/api/admin/logout" method="post"><button type="submit">Выйти</button></form>
    </nav>
  );
}