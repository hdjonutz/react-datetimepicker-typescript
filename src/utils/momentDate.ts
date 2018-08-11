const moment = require('moment');

export function getNamesDaysOfWeek(date: number = null): Array<string> {
    // monday = 1-th Saturday; 2-th Sunday; 3-th day;

    const nameDays: Array<string> = [];
    const now = moment(date) || moment(new Date().getTime());
    const witchDay = now.isoWeekday();

    // 4-3 = 1; => add(-1, 'd'); bis +7 days;
    // 1-3 = -2;=> add(1, 'd');  bis +7 days;
    const addDay = witchDay - 1;
    now.add(-addDay, 'd');
    for (let i = 0; i < 7; i++ ) {
        nameDays.push(now.format('dd'));
        now.add(1, 'd');
    }
    return nameDays;
}

export function getAllDaysFomLayoutMonthDisplay(date: number = null, daySelected: number = null): any {
    // disabled past and future days on month
    // acktive days from aktelle month
    // 6 * 7 = 42 days;
    const nowTodayMounth = moment();
    const days: any = [];
    const nowMonth = moment(date) || moment(new Date().getTime());
    const pastMonth = nowMonth.clone();

    // delete all days from month until day 1 and get position in week
    const witchFirstDay = pastMonth.add(-nowMonth.date() + 1, 'd');

    // get day for position 'Monday' from last week
    pastMonth.add(-witchFirstDay.isoWeekday() + 1, 'd');

    const daySelect = moment(daySelected);
    for (let i = 0; i < 42; i++) {
        days.push({
            isToday: pastMonth.date() === nowTodayMounth.date() && pastMonth.month() === nowTodayMounth.month(),
            status: pastMonth.month() === nowMonth.month(),
            day: pastMonth.date(),
            isSelected: pastMonth.date() === daySelect.date() && pastMonth.month() === daySelect.month(),
            dataStamp: pastMonth.valueOf(),
        });
        pastMonth.add(1, 'd');
    }
    return days;
}
export function getAllMonthsFomLayoutYearDisplay(date: number = null, monthSelected: number = null): any {
    // 4 * 4 = 16 months; (next)12 + 4 and (back)4 + 12
    const nowMonth = moment();
    const months: any = [];
    const nowYear = moment(date) || moment(new Date().getTime());
    const pastYear = nowYear.clone();

    // delete all months from year until first month and get position
    pastYear.add(-nowYear.month() - 2, 'M');

    const monthSelect = moment(monthSelected);
    for (let i = 0; i < 16; i++) {
        months.push({
            isNowMonth: pastYear.month() === nowMonth.month() && pastYear.year() === nowMonth.year(),
            status: pastYear.year() === nowYear.year(),
            month: pastYear.format('MMM').replace('.', ''),
            isSelected: pastYear.month() === monthSelect.month() && pastYear.year() === monthSelect.year(),
            dataStamp: pastYear.valueOf(),
        });
        pastYear.add(1, 'M');
    }
    return months;
}

export function getAllYearsFomLayoutAllYearDisplay(date: number = null, yearSelected: number = null): any {
    // 4 * 4 = 16 months; (next)12 + 4 and (back)4 + 12
    const now = moment();
    const years: any = [];
    const nowYear = moment(date) || moment(new Date().getTime());
    const pastYear = nowYear.clone();

    // delete all months from year until first month and get position
    pastYear.add(-6, 'Y');

    const yearSelect = moment(yearSelected);
    for (let i = 0; i < 16; i++) {
        years.push({
            isNowYear: pastYear.year() === now.year(),
            status: true,
            year: pastYear.format('YYYY'),
            isSelected: pastYear.year() === yearSelect.year(),
            dataStamp: pastYear.valueOf(),
        });
        pastYear.add(1, 'Y');
    }
    return years;
}
