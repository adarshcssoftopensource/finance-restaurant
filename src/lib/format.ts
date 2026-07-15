const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format a number as USD, e.g. 4820.5 -> "$4,820.50". */
export function money(value: number): string {
  return USD.format(value);
}

/** Format a whole/percent number, e.g. 46 -> "46%". */
export function pct(value: number): string {
  return `${value}%`;
}
