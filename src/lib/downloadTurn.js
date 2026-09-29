function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMoney(value) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return "-";
  return `$${n.toFixed(2)}`;
}

function formatDateTime(date) {
  if (!date) return "Sin fecha";
  return new Date(date).toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

/** Arma un comprobante HTML y lo descarga (no llama a la API). */
export function downloadTurnReceipt({
  turnNumber,
  date,
  customer,
  car,
  services = [],
  message,
}) {
  const total = services.reduce((acc, s) => acc + (parseFloat(s.price) || 0), 0);
  const duration = services.reduce((acc, s) => acc + (Number(s.duration) || 0), 0);
  const brandName = car?.brand?.name || "";
  const fileId = turnNumber || "comprobante";

  const serviceRows = services.length
    ? services
        .map((s) => {
          const productName = s.product?.name || "";
          return `<tr>
            <td>
              <strong>${escapeHtml(s.name)}</strong>
              ${productName ? `<div class="muted">Producto: ${escapeHtml(productName)}</div>` : ""}
            </td>
            <td>${s.duration ? `${escapeHtml(s.duration)} min` : "-"}</td>
            <td class="right">${escapeHtml(formatMoney(s.price))}</td>
          </tr>`;
        })
        .join("")
    : `<tr><td colspan="3">El turno no tiene servicios agregados</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Turno ${escapeHtml(fileId)} — Car of Duty</title>
  <style>
    body { font-family: "Segoe UI", sans-serif; color: #2B2E33; background: #F4F1EA; margin: 0; padding: 24px; }
    .sheet { max-width: 720px; margin: 0 auto; background: #fffdf9; border: 1px solid #E3E0D8; border-radius: 12px; padding: 32px; }
    h1 { color: #3E4A5C; margin: 0 0 4px; }
    .brand { color: #8B6558; font-weight: 600; margin-bottom: 24px; }
    .number { font-size: 32px; font-weight: 800; color: #4A5D4E; margin: 0; }
    .grid { display: grid; gap: 16px; grid-template-columns: 1fr; margin: 24px 0; }
    @media (min-width: 640px) { .grid { grid-template-columns: 1fr 1fr; } }
    .card { border: 1px solid #E3E0D8; border-radius: 8px; padding: 16px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: .04em; color: #3E4A5C; margin: 0 0 8px; }
    p { margin: 4px 0; }
    .muted { color: #5C6570; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #E3E0D8; vertical-align: top; }
    th { font-size: 12px; color: #5C6570; }
    .right { text-align: right; }
    .total { display: flex; justify-content: space-between; font-weight: 700; font-size: 18px; margin-top: 16px; }
    .foot { margin-top: 28px; font-size: 12px; color: #5C6570; }
  </style>
</head>
<body>
  <article class="sheet">
    <p class="brand">Car of Duty · Servicio de autos</p>
    <h1>Comprobante de turno</h1>
    ${message ? `<p class="muted">${escapeHtml(message)}</p>` : ""}
    <p class="number">Nº ${escapeHtml(turnNumber || "-")}</p>
    <p><strong>Fecha y hora:</strong> ${escapeHtml(formatDateTime(date))}</p>

    <div class="grid">
      <section class="card">
        <h2>Cliente</h2>
        <p>${escapeHtml(customer?.name || "Sin nombre")}</p>
        <p class="muted">${escapeHtml(customer?.email || "")}</p>
        <p class="muted">${escapeHtml(customer?.phone || "")}</p>
      </section>
      <section class="card">
        <h2>Vehículo</h2>
        <p>${escapeHtml(car?.name || "Sin vehículo")}</p>
        <p class="muted">${escapeHtml([brandName, car?.type, car?.motor].filter(Boolean).join(" · "))}</p>
      </section>
    </div>

    <section class="card">
      <h2>Servicios</h2>
      <table>
        <thead>
          <tr><th>Servicio</th><th>Duración</th><th class="right">Precio</th></tr>
        </thead>
        <tbody>${serviceRows}</tbody>
      </table>
      <p class="muted">Duración total: ${duration} minutos</p>
      <p class="total"><span>Total</span><span>${escapeHtml(formatMoney(total))}</span></p>
    </section>

    <p class="foot">Generado el ${escapeHtml(new Date().toLocaleString("es-ES"))}. Presentá este comprobante en el taller. Car of Duty, Salta, Argentina.</p>
  </article>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `turno-car-of-duty-${fileId}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
