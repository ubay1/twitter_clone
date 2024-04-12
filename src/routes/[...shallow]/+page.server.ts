// import { Supabase } from '$lib/server/supabase-client';
import type { Actions } from '@sveltejs/kit';

export const load = async ({ params }) => {
	return {
		...params
	};
};

export const actions: Actions = {
	signup: async ({ request }) => {
		// const { data } = await Supabase.from('users').insert({

		// });
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		console.log(request);
		return {
			formdata: {
				name,
				email
			}
		};
	}
};
