export function getWeekNumber(date: Date): number {
    const dayOfWeek = date.getDay();

    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const weekNumber = Math.ceil((dayOfYear + 1) / 7);
    
    return weekNumber;
}