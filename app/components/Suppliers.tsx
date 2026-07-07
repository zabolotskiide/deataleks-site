import { supplierNames } from "@/lib/site";

export function Suppliers() {
  return (
    <section id="suppliers" className="section suppliers-section">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 xl:px-10">
        <div className="supplier-panel reveal">
          <h2>Работаем с федеральными поставщиками</h2>
          <div className="supplier-grid">
            {supplierNames.map((supplier) => (
              <span key={supplier} className="supplier-logo">
                {supplier}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}