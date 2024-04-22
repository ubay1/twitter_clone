// import { Supabase } from '$lib/server/supabase-client';
import { Supabase } from '$lib/server/supabase-client.js';
import { addZeroInNumber } from '$lib/utils/transform.js';
import type { Actions } from '@sveltejs/kit';

export const load = async ({ params }) => {
	return {
		...params
	};
};

export const actions: Actions = {
	signup: async ({ request }) => {
		const formdata = await request.formData();
		const fullname = formdata.get('Name');
		const email = formdata.get('Email');
		const birth_date = `${formdata.get('Year')}-${addZeroInNumber(Number(formdata.get('Month')))}-${addZeroInNumber(Number(formdata.get('Date')))}`;

		const res = await Supabase.from('users').insert({ fullname, email, birth_date }).select();

		return {
			status: res.status,
			data: res.data
		};
	}
};
