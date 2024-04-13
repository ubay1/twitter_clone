<script lang="ts">
	import Icon from '@iconify/svelte';
	import { form as SvelteForm, field } from 'svelte-forms';
	import type { IListData } from '$lib/types/components';
	import { checkDataIsNotEmpty } from '$lib/utils/transform';
	import ErrorMessage from './ErrorMessage.svelte';
	import LoadingTwoColor from '../loading/LoadingTwoColor.svelte';
	import { clickOutside } from '$lib/actions/clickOutside';

	let search: string;
	let showList: boolean = false;
	// export let selectedData: IListData = { label: '', value: '' };
	export let listData: IListData[] = [];
	export let placeholder: string = 'Select data';
	export let selected: string;
	export let label: string = '';
	export let id: string;
	export let name: string;
	export let disabled: boolean = false;
	export let isLoading: boolean = false;
	export let validation: any[] | undefined = undefined;

	const form = field(id, '', validation);
	$: formError = $form.dirty && $form.errors.length > 0;

	$: _listData = listData.filter((item) =>
		(item.label as string).toLowerCase().includes(search && search.toLowerCase())
	);

	// $: if (!checkDataIsNotEmpty(selected)) {
	// 	selected = { label: '', value: '' };
	// }

	const handleClickOutside = () => {
		showList = false;
		search = '';
	};
</script>

<div class="relative" use:clickOutside on:click_outside={handleClickOutside}>
	{#if checkDataIsNotEmpty(label)}
		<label for={id} class="text-color-default">{label}</label>
	{/if}
	{#if disabled || isLoading}
		<div
			class="bg-gray-50 border border-gray-300 focus:border-primary-500 focus:ring-primary-500 w-full flex justify-between items-center py-2 pr-1.5 pl-2.5 rounded-lg focus:border focus:ring-2 outline-none"
		>
			<span class="text-color-default text-sm opacity-20">
				{isLoading ? 'Loading data ..' : checkDataIsNotEmpty(selected) ? selected : placeholder}
			</span>
			{#if isLoading}
				<LoadingTwoColor color1="#555" class="m-0 w-7 h-7 p-0" />
			{:else}
				<Icon
					icon={!showList ? 'ic:round-keyboard-arrow-down' : 'ic:round-keyboard-arrow-up'}
					class="w-[1.5rem] h-[1.5rem] text-gray-500 opacity-20"
				/>
			{/if}
		</div>
	{:else}
		<div class="custom-select">
			<select bind:value={selected} {id} {name}>
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
		border: 1px solid #dedede;
		padding-left: 8px;
		/* background-image: linear-gradient(to top, #f9f9f9, #fff 33%); */
	}
	select:focus-visible {
		outline: 2px solid #1d9bf0;
		border: none;
	}
</style>
