export function isPositiveAmount(value: string): boolean {
  return /^\d+(?:\.\d{1,2})?$/.test(value) && parseFloat(value) > 0;
}

export function isValidDateOrEmpty(value?: string): boolean {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + "T00:00:00Z");
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d <= today;
}

