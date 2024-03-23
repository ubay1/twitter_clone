/* eslint-disable @typescript-eslint/no-unused-vars */
import { SUPABASE_URL, SUPABASE_API_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export class Supabase {
	static connect() {
		return createClient(SUPABASE_URL, SUPABASE_API_KEY);
	}
}
