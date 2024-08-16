export function getWeekRange(weekNumber: number, year: number): { from: Date; to: Date; } {
    weekNumber -= 2;
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const daysToFirstMonday = (dayOfWeek === 0) ? 1 : (8 - dayOfWeek);
    const firstMonday = new Date(firstDayOfYear);
    firstMonday.setDate(firstDayOfYear.getDate() + daysToFirstMonday);
    const weekStartDate = new Date(firstMonday);
    weekStartDate.setDate(firstMonday.getDate() + weekNumber * 7);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
    weekStartDate.setHours(0, 0, 0, 0);
    weekEndDate.setHours(23, 59, 59, 999);
    const timezoneOffset = weekStartDate.getTimezoneOffset() * 60000;
    const fromLocal = new Date(weekStartDate.getTime() - timezoneOffset);
    const toLocal = new Date(weekEndDate.getTime() - timezoneOffset);
    return { from: fromLocal, to: toLocal };
}
