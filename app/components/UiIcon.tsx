export function UiIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    scan: "M7 3H4a1 1 0 0 0-1 1v3 M17 3h3a1 1 0 0 1 1 1v3 M7 21H4a1 1 0 0 1-1-1v-3 M17 21h3a1 1 0 0 0 1-1v-3 M8 12h8",
    layers: "m12 3 8 4-8 4-8-4 8-4Z M4 12l8 4 8-4 M4 17l8 4 8-4",
    route: "M5 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M8 15h3a4 4 0 0 0 4-4V9",
    check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M8.5 12.2l2.3 2.3 4.8-5",
    network: "M5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M8 9h8 M7 12l3 4 M17 12l-3 4",
    wallet: "M4 7h14a2 2 0 0 1 2 2v9H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z M16 12h4 M5 7l10-4 2 4",
    cash: "M4 7h16v10H4V7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M7 10v4 M17 10v4",
    card: "M3 7h18v10H3V7Z M3 10h18 M7 14h4",
    invoice: "M7 3h10v18H7V3Z M10 8h4 M10 12h4 M10 16h3",
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}