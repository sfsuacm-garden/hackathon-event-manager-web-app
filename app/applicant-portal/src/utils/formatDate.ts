import humanizeDuration from "humanize-duration";

export function formatDate(startDate: string): string | null {
    const date = new Date(startDate).getTime(); 
    return humanizeDuration(date, { round: true, units: ["d", "m", "y"]})
}

export function formatDateDifference(startDate: string): string | null {
    const start = new Date(startDate).getTime();
    const current = new Date().getTime();

    const difference = current - start;
   
    const humanizedTime = humanizeDuration(difference, { round: true, units: ["d"]});

    return humanizedTime + " ago";
}

export default {formatDate, formatDateDifference};