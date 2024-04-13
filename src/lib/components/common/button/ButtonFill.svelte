<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TypeButton, TypeVariant } from '$lib/types/components';
	import classNames from 'classnames';
	import LoadingOneColor from '$lib/components/common/loading/LoadingOneColor.svelte';

	export let variant: TypeVariant = 'black';
	export let type: TypeButton = 'button';
	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let label: string = 'Memuat';
	export let height: string = 'h-11';

	const emit = createEventDispatcher();

	const onClick = () => {
		if (type === 'button') {
			emit('click');
		}
	};

	const buttonType = (type: TypeVariant): string => {
		const buttonTypeMap = {
			primary: 'btn-fill-primary',
			black: 'btn-fill-black',
			white: 'btn-fill-white'
		};

		return buttonTypeMap[`${type}`];
	};
</script>

{#if disabled}
	<div
		class={classNames([
			$$props.class_disabled,
			'h-11 flex cursor-not-allowed items-center justify-center rounded-full bg-gray-500 px-2 text-white/40% font-bold'
		])}
	>
		{label}
	</div>
{:else}
	<button
		{type}
		class={classNames([
			'w-fill relative',
			buttonType(variant),
			{
				'p-0.5': loading,
				[height]: !loading
			}
		])}
		disabled={loading}
		on:click={() => onClick()}
	>
		{#if loading}
			<LoadingOneColor
				color="white"
				classWrapper="absolute left-0 bottom-[0.10rem] text-center w-fill"
				classInner="h-8 w-8"
			/>
		{:else}
			<span> {label}</span>
		{/if}
	</button>
{/if}
