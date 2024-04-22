import { Supabase } from '$lib/server/supabase-client';

export async function load() {
	const { data } = await Supabase.from('users').select();
	// console.log(data);
	return {
		users: data ?? []
	};
}
