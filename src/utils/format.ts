export function formatNumber2(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2);
}

