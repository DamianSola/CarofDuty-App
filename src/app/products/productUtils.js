export function formatProductPrice(price) {
  if (price == null) return null;
  const raw = typeof price === "object" && price.$numberDecimal ? price.$numberDecimal : price;
  const n = parseFloat(raw);
  if (Number.isNaN(n)) return null;
  return n.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

export function asProductList(products) {
  if (Array.isArray(products)) return products;
  if (Array.isArray(products?.data)) return products.data;
  return [];
}

export function productStock(product) {
  const n = Number(product?.stock);
  return Number.isNaN(n) ? null : n;
}
