import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { leadStatusLabel } from "@/lib/lead-status";
import { prisma } from "@/lib/prisma";

function money(value: number | null) {
  return value ? new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value) : "-";
}

export default async function AdminLeadsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="admin-page">
      <AdminNav />
      <section className="admin-hero compact"><p className="eyebrow">Заявки</p><h1>Все заявки</h1></section>
      <section className="admin-panel">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Дата</th><th>Имя</th><th>Телефон</th><th>VIN/frame/артикул</th><th>Что нужно подобрать</th><th>Файл</th><th>Статус</th><th>Итог</th><th>Прибыль</th><th></th></tr></thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id.slice(0, 8)}</td><td>{lead.createdAt.toLocaleString("ru-RU")}</td><td>{lead.name || "-"}</td><td>{lead.phone || "-"}</td><td>{lead.vin || "-"}</td><td>{lead.partName || lead.comment || "-"}</td><td>{lead.filePath ? <a href={lead.filePath} target="_blank">Файл</a> : "-"}</td><td>{leadStatusLabel(lead.status)}</td><td>{money(lead.finalPrice)}</td><td>{money(lead.profit)}</td><td><Link href={`/admin/leads/${lead.id}`}>Открыть</Link></td>
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
  return <nav className="admin-nav"><Link href="/admin">Dashboard</Link><Link href="/admin/leads">Заявки</Link><Link href="/admin/settings">Настройки</Link><form action="/api/admin/logout" method="post"><button type="submit">Выйти</button></form></nav>;
}