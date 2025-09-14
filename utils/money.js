export function formatMoney({ amount, currencyCode }) {
  const value = Number(amount || 0);
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode || 'USD' }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currencyCode || ''}`.trim();
  }
}
