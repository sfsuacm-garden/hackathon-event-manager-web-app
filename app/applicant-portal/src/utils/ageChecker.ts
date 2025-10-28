// Enforce 18+ by this event date
import { EVENT_CUTOFF_YMD } from "@/lib/constants";

export function parseYMDToUTCDate(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

export function is18By(dobYMD: string, cutoffYMD = EVENT_CUTOFF_YMD): boolean {
  const dob = parseYMDToUTCDate(dobYMD);
  const cutoff = parseYMDToUTCDate(cutoffYMD);
  let age = cutoff.getUTCFullYear() - dob.getUTCFullYear();
  const monthDelta = cutoff.getUTCMonth() - dob.getUTCMonth();
  if (monthDelta < 0 || (monthDelta === 0 && cutoff.getUTCDate() < dob.getUTCDate())) age--;
  return age >= 18;
}
export function todayYMD(): string {
  return new Date().toISOString().slice(0, 10);
}
