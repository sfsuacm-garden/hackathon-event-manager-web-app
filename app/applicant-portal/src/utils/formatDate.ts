export function formatDate(startDate: string): string | null {
    const date = new Date(startDate);
    return date.toLocaleString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit"});
}

export function formatDateDifference(startDate: string): string | null {
    const start = new Date(startDate);
    const current = new Date();

    const difference = current.getDay() - start.getDay();

    return String(difference) + " days ago";
}

export default {formatDate, formatDateDifference};