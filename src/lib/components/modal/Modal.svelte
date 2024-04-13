<script lang="ts">
	import Icons from '@iconify/svelte';
	import classnames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	const emit = createEventDispatcher();

	export const withTitle: boolean = true;

	const closeModal = () => emit('close');
</script>

<div
	class="fixed top-0 left-0 z-1900 w-full h-full flex justify-center items-center backdrop-blur-5"
>
	<div class="fixed inset-0 bg-[rgba(0,0,0,0.8)] opacity-50 z-20"></div>
	<div
		class="bg-white p-2 rounded-lg shadow-xl max-h-full overflow-auto z-2000 w-[40%]"
		un-lt-lg="w-[70%]"
		un-lt-md="w-[80%]"
		un-lt-sm="w-full h-full"
	>
		<div class="flex items-start border-b rounded-t p-2">
			<button type="button" class="btn-close" on:click={closeModal}>
				<Icons icon="mdi-close" class="w-[22px] h-[22px]" color="black" />
			</button>
			<div
				class={classnames(
					['flex flex-1 justify-center mr-10 text-xl font-semibold text-gray-900'],
					{
						hidden: !withTitle
					}
				)}
			>
				<Icons icon="ri:twitter-x-line" class="w-8 h-8 lt-md:w-10" />
			</div>
		</div>
		<div class="p-4 pt-2">
			<slot />
		</div>
	</div>
</div>
