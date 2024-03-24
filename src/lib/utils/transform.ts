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
