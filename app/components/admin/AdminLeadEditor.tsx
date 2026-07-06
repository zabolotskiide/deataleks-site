"use client";

import { useState } from "react";
import { leadStatuses } from "@/lib/lead-status";
import { AdminCalculator } from "./AdminCalculator";

type AdminLeadEditorProps = {
  lead: {
    id: string;
    status: string;
    managerComment: string | null;
  };
};

export function AdminLeadEditor({ lead }: AdminLeadEditorProps) {
  const [status, setStatus] = useState(lead.status);
  const [managerComment, setManagerComment] = useState(lead.managerComment || "");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  async function saveLead() {
    const response = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, managerComment }),
    });
    setMessage(response.ok ? "Заявка сохранена" : "Не удалось сохранить заявку");
  }

  async function addNote() {
    const response = await fetch(`/api/admin/leads/${lead.id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: note }),
    });
    if (response.ok) {
      setNote("");
      setMessage("Заметка добавлена. Обновите страницу, чтобы увидеть ее в истории.");
    } else {
      setMessage("Не удалось добавить заметку");
    }
  }

  return (
    <div className="admin-detail-grid">
      <section className="admin-panel">
        <h2>Управление заявкой</h2>
        <label>
          Статус
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {leadStatuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label>
          Комментарий менеджера
          <textarea value={managerComment} onChange={(event) => setManagerComment(event.target.value)} rows={5} />
        </label>
        <button type="button" onClick={saveLead}>Сохранить изменения</button>
        {message ? <p className="admin-success">{message}</p> : null}
      </section>

      <section className="admin-panel">
        <h2>Заметка</h2>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={5} placeholder="Добавить заметку к заявке" />
        <button type="button" onClick={addNote}>Добавить заметку</button>
      </section>

      <section className="admin-panel wide">
        <h2>Калькулятор наценки</h2>
        <AdminCalculator leadId={lead.id} compact />
      </section>
    </div>
  );
}