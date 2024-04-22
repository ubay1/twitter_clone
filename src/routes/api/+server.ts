/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.json();

	return body;
};
