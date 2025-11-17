export function formatDateTime(dateString: string) {
    const date = new Date(dateString)
    const dateStr = date.toLocaleDateString()
    const timeStr = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })
    return { date: dateStr, time: timeStr }
}