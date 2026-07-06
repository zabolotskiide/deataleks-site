"use client";

import { FormEvent, useState } from "react";

type LeadFormProps = {
  variant: "hero" | "contact";
  source: string;
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M5 12h13m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M7 10V8a5 5 0 0 1 10 0v2M6 10h12v10H6V10Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export function LeadForm({ variant, source }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("source", source);

    setStatus("sending");
    setMessage("");

    const response = await fetch("/api/lead", { method: "POST", body: data });
    const result = await response.json().catch(() => null);

    if (response.ok) {
      form.reset();
      setStatus("success");
      setMessage("Спасибо. Мы получили заявку и скоро свяжемся.");
      return;
    }

    setStatus("error");
    setMessage(result?.message || "Не удалось отправить заявку. Позвоните нам по телефону.");
  }

  const isHero = variant === "hero";

  return (
    <form className={isHero ? "vin-panel reveal" : "contact-form reveal"} onSubmit={handleSubmit} encType="multipart/form-data">
      {isHero ? <><h2>Подбор по VIN</h2><p>Оставьте телефон, VIN или коротко опишите, что нужно подобрать.</p></> : null}
      <input type="hidden" name="source" value={source} />
      <label className="honeypot-field" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-grid">
        <label><span>Имя</span><input name="name" aria-label="Имя" placeholder="Ваше имя" /></label>
        <label><span>Телефон</span><input name="phone" aria-label="Телефон" placeholder="+7 (___) ___-__-__" required /></label>
      </div>
      <label><span>VIN / Frame / Артикул</span><input name="vin" aria-label="VIN, Frame или артикул" placeholder="Введите VIN, frame или артикул" /></label>
      <label><span>Что нужно подобрать</span><textarea name="requestText" aria-label="Что нужно подобрать" placeholder="Например: Opel Astra H 2005, передние тормозные колодки, VIN если есть" rows={isHero ? 3 : 4} /></label>
      <label className="file-field"><span>Файл к заявке</span><input name="file" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.xls,.xlsx" /><small>Можно прикрепить фото детали, список запчастей, PDF, Excel или Word. Максимум 20 MB.</small></label>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Отправляем..." : "Отправить заявку"}{!isHero ? <ArrowIcon /> : null}</button>
      <span className="vin-note"><LockIcon />Ваши данные защищены</span>
      {message ? <p className={`form-status ${status === "success" ? "success" : "error"}`}>{message}</p> : null}
    </form>
  );
}