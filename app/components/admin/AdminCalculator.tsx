"use client";

import { useMemo, useState } from "react";
import { calculatePricing, calculateRecommendedPrice, recommendMarkup, type PricingInput } from "@/lib/pricing";

type AdminCalculatorProps = {
  leadId?: string;
  compact?: boolean;
};

const initial: PricingInput = {
  purchasePrice: 0,
  deliveryCost: 0,
  buyerFee: 0,
  otherExpenses: 0,
  markupPercent: 0,
  fixedMarkup: 0,
  taxPercent: 6,
  discount: 0,
};

function money(value: number) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value || 0);
}

export function AdminCalculator({ leadId, compact }: AdminCalculatorProps) {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState("");
  const result = useMemo(() => calculatePricing(values), [values]);

  function update(name: keyof PricingInput, value: string) {
    setValues((current) => ({ ...current, [name]: Number(value) || 0 }));
  }

  function applyRecommendation() {
    const cost = values.purchasePrice + values.deliveryCost + values.buyerFee + values.otherExpenses;
    const recommended = calculateRecommendedPrice(cost);
    const recommendation = recommendMarkup(cost);
    setValues((current) => ({
      ...current,
      markupPercent: recommendation.percent,
      fixedMarkup: 0,
      discount: 0,
    }));
    setSaved(`Рекомендованная цена: ${money(recommended)}`);
  }

  async function saveCalculation() {
    if (!leadId) return;
    const response = await fetch(`/api/admin/leads/${leadId}/calculations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaved(response.ok ? "Расчет сохранен в заявке" : "Не удалось сохранить расчет");
  }

  return (
    <div className={compact ? "admin-calculator compact" : "admin-calculator"}>
      <div className="admin-form-grid">
        <label>Закупочная цена<input type="number" value={values.purchasePrice || ""} onChange={(e) => update("purchasePrice", e.target.value)} /></label>
        <label>Доставка<input type="number" value={values.deliveryCost || ""} onChange={(e) => update("deliveryCost", e.target.value)} /></label>
        <label>Комиссия<input type="number" value={values.buyerFee || ""} onChange={(e) => update("buyerFee", e.target.value)} /></label>
        <label>Прочие расходы<input type="number" value={values.otherExpenses || ""} onChange={(e) => update("otherExpenses", e.target.value)} /></label>
        <label>Процент наценки<input type="number" value={values.markupPercent || ""} onChange={(e) => update("markupPercent", e.target.value)} /></label>
        <label>Фиксированная наценка<input type="number" value={values.fixedMarkup || ""} onChange={(e) => update("fixedMarkup", e.target.value)} /></label>
        <label>Налог УСН, %<input type="number" value={values.taxPercent || ""} onChange={(e) => update("taxPercent", e.target.value)} /></label>
        <label>Скидка клиенту<input type="number" value={values.discount || ""} onChange={(e) => update("discount", e.target.value)} /></label>
      </div>

      <div className="calc-actions">
        <button type="button" onClick={applyRecommendation}>Рассчитать рекомендуемую цену</button>
        {leadId ? <button type="button" onClick={saveCalculation}>Сохранить расчет</button> : null}
      </div>

      <div className="calc-result-grid">
        <span>Себестоимость<strong>{money(result.costPrice)}</strong></span>
        <span>Рекомендованная цена<strong>{money(result.recommended)}</strong></span>
        <span>Итоговая цена<strong>{money(result.finalPrice)}</strong></span>
        <span>Налог 6%<strong>{money(result.tax)}</strong></span>
        <span>Чистая прибыль<strong>{money(result.profit)}</strong></span>
        <span>Маржинальность<strong>{result.marginPercent.toFixed(1)}%</strong></span>
        <span>Наценка<strong>{result.markupActual.toFixed(1)}%</strong></span>
      </div>
      {result.warning ? <p className="admin-warning">Прибыль ниже рекомендуемого минимума для такого заказа.</p> : null}
      {saved ? <p className="admin-success">{saved}</p> : null}
    </div>
  );
}