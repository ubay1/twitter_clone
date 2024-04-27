/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { reduxify } from 'svelte-reduxify';
import type { IListData } from '$lib/types/components';

const env = process.env.NODE_ENV;

interface ISignup {
	step: number;
	name: string | null;
	email: string | null;
	yearOfBirth: IListData;
	monthOfBirth: IListData;
	dateOfBirth: IListData;
}
function createSignUp() {
	const { subscribe, set, update } = writable<ISignup>({
		step: 1,
		name: null,
		email: null,
		yearOfBirth: {} as IListData,
		monthOfBirth: {} as IListData,
		dateOfBirth: {} as IListData
	});

	const dataStore = {
		update,
		subscribe,
		setStep: (value: number) => {
			update((items) => {
				return {
					...items,
					step: value
				};
			});
		},
		setName: (value: string) => {
			update((items) => {
				return {
					...items,
					name: value
				};
			});
		},
		setEmail: (value: string) => {
			update((items) => {
				return {
					...items,
					email: value
				};
			});
		},
		setYearOfBirth: (value: { label: string; value: string }) => {
			update((items) => {
				return {
					...items,
					yearOfBirth: value
				};
			});
		},
		setMonthOfBirth: (value: { label: string; value: string }) => {
			update((items) => {
				return {
					...items,
					monthOfBirth: value
				};
			});
		},
		setDateOfBirth: (value: { label: string; value: string }) => {
			update((items) => {
				return {
					...items,
					dateOfBirth: value
				};
			});
		},
		setDataSignup: (value: any) => {
			set(value);
		},
		reset: () =>
			set({
				step: 1,
				name: null,
				email: null,
				yearOfBirth: {} as IListData,
				monthOfBirth: {} as IListData,
				dateOfBirth: {} as IListData
			})
	};

	if (env === 'development') {
		return reduxify(dataStore);
	} else {
		return dataStore;
	}
}
export const dataSignup = createSignUp();
