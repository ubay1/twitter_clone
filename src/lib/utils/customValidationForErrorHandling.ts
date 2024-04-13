import { checkDataIsNotEmpty } from './transform';

/* -------------------------------------------------------------------------- */
/*                 custom error handling svelte-form					                */
/* 									https://chainlist.github.io/svelte-forms/									*/
/* -------------------------------------------------------------------------- */
export const customValidationNameSignup = () => {
	return async (value: string) => {
		if (checkDataIsNotEmpty(value)) {
			return { valid: true, name: 'custom_name_signup' };
		} else {
			return { valid: false, name: 'custom_name_signup' };
		}
	};
};
