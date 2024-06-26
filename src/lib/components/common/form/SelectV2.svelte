<script lang="ts">
	import Icon from '@iconify/svelte';
	import { form as SvelteForm, field } from 'svelte-forms';
	import type { IListData } from '$lib/types/components';
	import { checkDataIsNotEmpty } from '$lib/utils/transform';
	import ErrorMessage from './ErrorMessage.svelte';
	import LoadingTwoColor from '../loading/LoadingTwoColor.svelte';
	import { clickOutside } from '$lib/actions/clickOutside';
	import classNames from 'classnames';
	import { createEventDispatcher } from 'svelte';

	const emit = createEventDispatcher();

	let showList: boolean = false;
	export let listData: IListData[] = [];
	export let placeholder: string = 'Select data';
	export let label: string = '';
	export let id: string;
	export let name: string;
	export let disabled: boolean = false;
	export let isResetForm: boolean = false;
	export let isLoading: boolean = false;
	export let validation: any[] | undefined = undefined;

	const form = field(id, '', validation);
	$: formError = $form.dirty && $form.errors.length > 0;
	$: emit('selected', $form.value);

	// reset value form selected
	$: if (isResetForm) $form.value = '';

	const handleClickOutside = () => {
		showList = false;
	};
</script>

<div class="relative" use:clickOutside on:click_outside={handleClickOutside}>
	{#if checkDataIsNotEmpty(label)}
		<label for={id} class="text-color-default">{label}</label>
	{/if}
	{#if disabled || isLoading}
		<div
			class="bg-gray-500 border border-gray-500 w-fill flex justify-between items-center py-[10px] pr-1.5 pl-2.5 rounded-lg focus:border focus:ring-2 outline-none"
		>
			<span class="text-white/40% text-sm">
				{isLoading ? 'Loading data ..' : placeholder}
			</span>
			{#if isLoading}
				<LoadingTwoColor color1="#555" class="m-0 w-7 h-7 p-0" />
			{:else}
				<Icon
					icon={!showList ? 'ri:expand-up-down-fill' : 'ri:expand-up-down-fill'}
					class="text-white/40%"
				/>
			{/if}
		</div>
	{:else}
		<div class="custom-select">
			<select
				bind:value={$form.value}
				{id}
				{name}
				class={classNames({
					'border-2 border-solid border-red-500': formError,
					'border border-solid border-[#dedede]': !formError
				})}
			>
				<option disabled value="">{placeholder}</option>
				{#each listData as data}
					<option value={data.value}>{data.label}</option>
				{/each}
			</select>
		</div>
		{#if $form.errors}
			<ErrorMessage errors={$form.errors} id={name} />
		{/if}
	{/if}
</div>

<style>
	.custom-select {
		position: relative;
	}
	.custom-select::before,
	.custom-select::after {
		--size: 0.25rem;
		position: absolute;
		content: '';
		right: 0.6rem;
		pointer-events: none;
	}

	.custom-select::before {
		border-left: var(--size) solid transparent;
		border-right: var(--size) solid transparent;
		border-bottom: var(--size) solid black;
		top: 40%;
	}

	.custom-select::after {
		border-left: var(--size) solid transparent;
		border-right: var(--size) solid transparent;
		border-top: var(--size) solid black;
		top: 55%;
	}
	select {
		appearance: none;
		-webkit-appearance: none;
		width: 100%;
		height: 40px;
		border-radius: 6px;
		padding-left: 8px;
		background-color: white;
		/* background: linear-gradient(to bottom, #fff, #edecec);
		box-shadow: inset 0 1px 0 #edecec; */
	}
	/* select:hover {
		background: linear-gradient(to top, #fff, #edecec);
	} */
	select:focus-visible {
		outline: 2px solid #1d9bf0;
		border: none;
	}
</style>
