/**
 * Utilities for calendar grid generation and date formatting.
 */

/** Return YYYY-MM-DD for a Date */
export function formatISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Generate a 6x7 matrix (6 weeks, 7 days) of Date objects for the given month.
 * month is 0-based (0 = Jan).
 */
export function generateMonthMatrix(year: number, month: number): Date[][] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun
  // start date = firstOfMonth - startWeekday days
  const startDate = new Date(firstOfMonth);
  startDate.setDate(firstOfMonth.getDate() - startWeekday);

  const weeks: Date[][] = [];
  const cursor = new Date(startDate);
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}
