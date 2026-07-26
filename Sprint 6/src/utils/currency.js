export const EXCHANGE_RATE = 83; // Standard conversion: 1 USD = 83 INR

/**
 * Formats a raw price (in USD from DummyJSON API or calculation) into formatted Indian Rupees (INR)
 * @param {number|string} priceUsd
 * @returns {string} e.g. "₹45,567"
 */
export function formatINR(priceUsd) {
  if (priceUsd === undefined || priceUsd === null || isNaN(priceUsd)) return '₹0';
  const inrValue = Math.round(Number(priceUsd) * EXCHANGE_RATE);
  return '₹' + inrValue.toLocaleString('en-IN');
}

/**
 * Converts USD amount to INR whole number
 * @param {number|string} priceUsd
 * @returns {number}
 */
export function toINR(priceUsd) {
  if (priceUsd === undefined || priceUsd === null || isNaN(priceUsd)) return 0;
  return Math.round(Number(priceUsd) * EXCHANGE_RATE);
}
