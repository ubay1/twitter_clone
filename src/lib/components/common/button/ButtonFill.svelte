<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TypeButton, TypeVariant } from '$lib/types/components';
	import classNames from 'classnames';
	import LoadingOneColor from '$lib/components/common/loading/LoadingOneColor.svelte';

	export let variant: TypeVariant = 'default';
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
			default: 'btn-fill-gray'
		};

		return buttonTypeMap[`${type}`];
	};
</script>

{#if disabled}
	<div
		class={classNames([
			$$props.class_disabled,
			'h-11 flex cursor-not-allowed items-center justify-center rounded-lg bg-disabled px-2 text-sm text-gray-4 font-400'
		])}
	>
		{label}
	</div>
{:else}
	<button
		{type}
		class={classNames([
			'w-fill',
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
			<LoadingOneColor color="white" class="h-8 w-8 pt-1.2" />
		{:else}
			<span> {label}</span>
		{/if}
	</button>
{/if}
