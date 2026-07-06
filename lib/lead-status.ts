export const leadStatuses = [
  { value: "new", label: "Новая" },
  { value: "in_progress", label: "В работе" },
  { value: "waiting_client", label: "Ожидает клиента" },
  { value: "ordered", label: "Заказана" },
  { value: "delivering", label: "Доставляется" },
  { value: "closed", label: "Закрыта" },
  { value: "cancelled", label: "Отменена" },
];

export function leadStatusLabel(status: string | null | undefined) {
  return leadStatuses.find((item) => item.value === status)?.label || "Новая";
}