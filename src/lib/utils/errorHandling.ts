/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorFetching = (error: any) => {
	if (error.response) {
		throw {
			code: error.response.status,
			data: null,
			message: error.message,
			statusMessage: error.response.statusText
		};
	} else {
		throw {
			code: 500,
			data: null,
			message: 'Internal server error',
			statusMessage: 'Terjadi kesalahan'
		};
	}
};

export const errorMsg = (id: string, min?: number | undefined, idConfirm?: string) => {
	return [
		{
			type: 'required',
			value: `${id} is required.`
		},
		{
			type: 'not_an_email',
			value: `${id} must be a valid email.`
		},
		{
			type: 'min',
			value: `${id} have at least ${min} characters.`
		},
		{
			type: 'specialchar_password',
			value: 'Can only be lowercase, uppercase, and special characters !@#$%^&*'
		},
		{
			type: 'specialchar_password',
			value: 'Can only be lowercase, uppercase, and special characters !@#$%^&*'
		},
		{
			type: 'only_number',
			value: `${id} only number.`
		},
		{
			type: 'match_field',
			value: `${id} harus sama dengan ${idConfirm}.`
		},
		{
			type: 'have_upper_char',
			value: `${id} minimal memiliki 1 huruf kapital.`
		},
		{
			type: 'have_lower_char',
			value: `${id} minimal memiliki 1 huruf kecil.`
		},
		{
			type: 'have_specific_special_char',
			value: `${id} minimal memiliki 1 spesial karakter dan hanya bisa menggunakan spesial karakte,`
		},
		{
			type: 'have_number',
			value: `${id} minimal memiliki 1 angka.`
		},
		{
			type: 'have_two_digit_behind_comma',
			value: `Hanya bisa berupa angka dan titik, serta maksimal 2 angka dibelakang koma.`
		},
		{
			type: 'custom_name_signup',
			value: `What's your name?`
		}
	];
};
