/**
 * Steps 225-226: Multi-Currency (USD, SAR, BDT) Conversion Service + Real-time Exchange Rate API
 */

export type Currency = "USD" | "SAR" | "BDT" | "EUR";

// Mock rates (in prod, fetch from api.exchangerate.host or similar)
const EXCHANGE_RATES: Record<Currency, Record<Currency, number>> = {
  USD: { USD: 1, SAR: 3.75, BDT: 117.5, EUR: 0.92 },
  SAR: { SAR: 1, USD: 0.2667, BDT: 31.33, EUR: 0.245 },
  BDT: { BDT: 1, USD: 0.0085, SAR: 0.0319, EUR: 0.0078 },
  EUR: { EUR: 1, USD: 1.086, SAR: 4.07, BDT: 127.7 },
};

/**
 * Step 225: Multi-currency conversion
 */
export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount;
  const rate = EXCHANGE_RATES[from]?.[to];
  if (!rate) throw new Error(`No rate for ${from}->${to}`);
  return amount * rate;
}

export function getSupportedCurrencies(): Currency[] {
  return ["USD", "SAR", "BDT", "EUR"];
}

/**
 * Step 226: Real-time Exchange Rate API Connect (mock)
 * In prod: fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
 */
export async function fetchRealTimeRate(from: Currency, to: Currency): Promise<number> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 100));
  return EXCHANGE_RATES[from]?.[to] ?? 1;
}

export async function convertWithRealTimeRate(amount: number, from: Currency, to: Currency): Promise<{ converted: number; rate: number }> {
  const rate = await fetchRealTimeRate(from, to);
  return { converted: amount * rate, rate };
}
