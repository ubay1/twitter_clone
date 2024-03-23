/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from './$types';
import { Supabase } from '$lib/server/supabase-client';

export const POST: RequestHandler = async (event) => {
	const conn = Supabase.connect();
	const body = await event.request.json();

	return body;
};
