export const uppercaseLetter = (value: string): string => value.toUpperCase();
export const capitalizeWord = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalPerWords = (str: string) => {
	const strArray = str.split(' ');

	for (let i = 0; i < strArray.length; i++) {
		strArray[`${i}`] = capitalizeWord(strArray[`${i}`]);
	}

	return strArray.join(' ');
};
export const formatNumber = (number: number, type?: string | undefined) =>
	new Intl.NumberFormat(!type ? 'en-US' : type).format(number);

export const removeNullOrUndefined = (object: object) =>
	JSON.parse(JSON.stringify(object, (_, value) => value ?? undefined));

export const checkDataIsNotEmpty = (value: string | number | null | undefined): boolean =>
	!['', '-', null, 'null', undefined, 'undefined', 0].includes(value);

export function addZeroInNumber(value: number): string {
	if (value < 10) {
		return `0${value}`;
	}
	return String(value);
}

interface DataSignup {
	[key: string]: string | number | object;
}
export function checkObjectHasEmptyValue(obj: DataSignup): boolean {
	for (const key in obj) {
		if (typeof obj[key] === 'string' && (obj[key] as string).trim() === '') {
			return true;
		}
		if (typeof obj[key] === 'object') {
			const subObject = obj[key] as DataSignup; // Type assertion to enforce DataSignup type
			const subResult = checkObjectHasEmptyValue(subObject);
			if (subResult) {
				return subResult;
			}
		}
	}
	return false;
}
