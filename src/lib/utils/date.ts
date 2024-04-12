import dayjs from 'dayjs';
import leapYear from 'dayjs/plugin/isLeapYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import id from 'dayjs/locale/id';
import durations from 'dayjs/plugin/duration';
import type { IListData } from '../types/components';

dayjs.locale(id);
dayjs.extend(leapYear);
dayjs.extend(customParseFormat);
dayjs.extend(durations);

export const currentYear = dayjs().year();
export const currentMonth = dayjs().month() + 1;
export const currentDate = dayjs().date();
const formatYMD = 'YYYY-MM-DD';

export const convertToYmd = (val: string) => dayjs(val, formatYMD);
const month31 = [1, 3, 5, 7, 8, 10, 12];
const month30 = [4, 6, 9, 11];
const listMonth = [
	{ label: 'January', value: '1' },
	{ label: 'February', value: '2' },
	{ label: 'March', value: '3' },
	{ label: 'April', value: '4' },
	{ label: 'May', value: '5' },
	{ label: 'June', value: '6' },
	{ label: 'July', value: '7' },
	{ label: 'August', value: '8' },
	{ label: 'September', value: '9' },
	{ label: 'October', value: '10' },
	{ label: 'November', value: '11' },
	{ label: 'December', value: '12' }
];

// hanya untuk jika nilai dibawah 10 tidak ada 0 nya didepan
export const checkNumberAndAssignZero = (value: number): string =>
	value < 10 ? `0${value}` : String(value);

// Check apakah tahun dan bulan yang dipilih adalah kabisat
const isLeapYearAndMonth = (year: number, month: number) => {
	const transformMonth = checkNumberAndAssignZero(month);
	const combineKey = `${year}-${transformMonth}-01`;

	let status = false;
	if (dayjs(combineKey).isLeapYear()) {
		status = true;
	}

	return status;
};
// get panjang tanggal dari tahun dan bulan, apakah 28/29/30/31 hari.
const getDateFromYearMonth = (year: number, month: number) => {
	const cekIsMonth31 = month31.includes(month);
	const cekIsMonth30 = month30.includes(month);

	const isLeapYear = isLeapYearAndMonth(year, month);

	let length;
	// jika tahun dan bulan adalah kabisat maka panjangnya 29
	if (isLeapYear && month === 2) {
		length = 29;
	} else {
		length = cekIsMonth31 ? 31 : cekIsMonth30 ? 30 : 28;
	}

	return length;
};

export const getListYears = () => {
	const listYear: IListData[] = [];
	const lengthYear = 51;

	for (let i = 0; i < currentYear - (currentYear - lengthYear); i++) {
		listYear.push({ label: String(currentYear - i), value: String(currentYear - i) });
	}

	return listYear;
};

export const getListMonths = (year: number) => {
	// jika parameter sama dengan tahun sekarang,
	// maka ambil bulan dari januari-bulan sekarang.
	if (year === currentYear) {
		const month: IListData[] = [];
		listMonth.forEach((item, index) => {
			if (index < currentMonth) {
				month.push(item);
			}
		});
		return month;
	}
	return listMonth;
};

export const getListDates = (year: number, month: number) => {
	// jika parameter sama dengan tahun sekarang,
	// maka ambil bulan dari januari-bulan sekarang.
	const date: IListData[] = [];
	if (year === currentYear && month === currentMonth) {
		for (let i = 0; i < currentDate; i++) {
			date.push({ label: String(i + 1), value: String(i + 1) });
		}
	} else {
		const dateIsLeapYear = getDateFromYearMonth(year, month);

		for (let i = 0; i < dateIsLeapYear; i++) {
			date.push({ label: String(i + 1), value: String(i + 1) });
		}
	}

	return date;
};

export const getAgeFromOneDate = (date: string) => {
	const birthDate = dayjs(date);
	const now = dayjs();

	const years = now.diff(birthDate, 'years');
	birthDate.add(years, 'years');

	const months = now.diff(birthDate, 'months');
	birthDate.add(months, 'months');

	const days = now.diff(birthDate, 'days');

	const combinedKey = `${years}|${months}|${days}`;

	let fullAge = '';

	switch (combinedKey) {
		case '1|1|0':
			fullAge = `${years} Tahun ${months} Bulan`;
			break;
		case '1|0|1':
			fullAge = `${years} Tahun ${days} Hari`;
			break;
		case '0|1|1':
			fullAge = `${months} Bulan ${days} Hari`;
			break;
		case '1|0|0':
			fullAge = `${years} Tahun`;
			break;
		case '0|1|0':
			fullAge = `${months} Bulan`;
			break;
		case '0|0|1':
			fullAge = `${days} Hari`;
			break;

		default:
			fullAge = `${years} Tahun ${months} Bulan ${days} Hari`;
			break;
	}

	return fullAge;
};

export const getAgeFromTwoDate = (startDate: string, endDate: string) => {
	const date1 = dayjs(startDate, formatYMD);
	const date2 = dayjs(endDate, formatYMD);

	const diff = date2.diff(date1);

	const duration = dayjs.duration(diff);

	const years = duration.years();
	const months = duration.months();
	const days = duration.days();

	return `${Math.abs(years)} tahun ${Math.abs(months)} bulan ${Math.abs(days)} hari`;
};

// get full date dari tahun & bulan, ex: 1 tahun 4 bulan => 2023-02-08
export const getDateFromAge = (ageYear: number, ageMonth: number) => {
	const birthdate = dayjs().subtract(ageYear, 'year').subtract(ageMonth, 'month');
	return birthdate.format('YYYY-MM-DD');
};

// get tahun/bulan/tanggal
export const getYearFromDateObject = (dateObject: string) => String(dayjs(dateObject).year());
export const getMonthFromDateObject = (dateObject: string) => String(dayjs(dateObject).month());
export const getDateFromDateObject = (dateObject: string) => String(dayjs(dateObject).date());

export const standardDate = (date: string) => dayjs(date).format('DD MMMM YYYY');
export const dateOnlyThreeCharMonthName = (date: string) => dayjs(date).format('DD MMM YYYY');

export const getTotalDaysFromCurrentYearToBackYear = (inputYear: string, injectionDate: string) => {
	const startDate = dayjs(inputYear);
	const endDate = dayjs(injectionDate);
	return endDate.diff(startDate, 'days');
};
