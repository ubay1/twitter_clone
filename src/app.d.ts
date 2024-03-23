// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface PageState {
			showModal: boolean;
		}
	}
	namespace svelteHTML {
		import type { AttributifyAttributes } from '@unocss/preset-attributify';
		type HTMLAttributes = AttributifyAttributes;
	}
}

export {};
