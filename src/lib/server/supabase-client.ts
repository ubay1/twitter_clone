/* eslint-disable @typescript-eslint/no-unused-vars */
import { SUPABASE_URL, SUPABASE_API_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const Supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
