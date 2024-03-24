<script lang="ts">
	import Icon from '@iconify/svelte';
	import classnames from 'classnames';
	import { form as SvelteForm, field } from 'svelte-forms';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import type { IListData } from '$lib/types/components';
	import { checkDataIsNotEmpty } from '$lib/utils/transform';
	import ErrorMessage from './ErrorMessage.svelte';
	import Loading from '../Loading.svelte';
	import { clickOutside } from '$lib/actions/clickOutside';

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(6), flip(), shift()]
	});

	let search: string;
	let showList: boolean = false;
	export let selectedData: IListData = { label: '', value: '' };
	export let listData: IListData[] = [];
	export let placeholderBtn: string = 'Select data';
	export let placeholderSearch: string = 'Search data';
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

	$: if (!checkDataIsNotEmpty(selectedData.value)) {
		selectedData = { label: '', value: '' };
	}

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
			class="bg-gray-50 border border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 w-full flex justify-between items-center py-2 pr-1.5 pl-2.5 rounded-lg focus:border focus:ring-2 dark:bg-gray-700 dark:border outline-none dark:focus:ring-2"
		>
			<span class="text-color-default text-sm opacity-20">
				{isLoading
					? 'Loading data ..'
					: checkDataIsNotEmpty(selectedData.value)
						? selectedData.label
						: placeholderBtn}
			</span>
			{#if isLoading}
				<Loading color1="#555" class="m-0 w-7 h-7 p-0" />
			{:else}
				<Icon
					icon={!showList ? 'ic:round-keyboard-arrow-down' : 'ic:round-keyboard-arrow-up'}
					class="w-[1.5rem] h-[1.5rem] text-gray-500 dark:text-gray-500 opacity-20"
				/>
			{/if}
		</div>
	{:else}
		<button
			{id}
			{disabled}
			use:floatingRef
			class={classnames(
				'bg-gray-50 border w-full flex justify-between items-center py-2 pr-1.5 pl-2.5 rounded-lg focus:border focus:ring-2 dark:bg-gray-700 dark:border outline-none dark:focus:ring-2',
				{
					'border-red-500 ring-red-500 dark:ring-red-500': formError,
					'border-gray-300 dark:border-gray-600': !formError
				}
			)}
			on:click={() => {
				showList = !showList;
				if (!showList) {
					if (checkDataIsNotEmpty($form.value)) {
						$form.value = JSON.stringify(selectedData);
					} else {
						$form.dirty = true;
						$form.invalid = true;
					}
				}
			}}
		>
			<span class="text-color-default text-sm truncate">
				{checkDataIsNotEmpty(selectedData.value) ? selectedData.label : placeholderBtn}
			</span>
			<Icon
				icon="ic:round-keyboard-arrow-down"
				class={classnames('w-[1.5rem] h-[1.5rem] text-gray-500 dark:text-gray-400', {
					'rotate-180 transform transition duration-200 ease-in-out': showList,
					'rotate-0 transform transition duration-200 ease-in-out': !showList
				})}
			/>
		</button>
		{#if showList}
			<div
				use:floatingContent
				class="absolute z-[1000] bg-white border border-gray-300 top-14 shadow rounded-lg w-full max-h-[250px] overflow-auto dark:bg-gray-700 dark:border dark:border-gray-600"
			>
				<div class="p-2 sticky top-0 bg-white dark:bg-gray-700">
					<input
						bind:value={search}
						type="text"
						placeholder={placeholderSearch}
						class="w-full bg-gray-100 py-2 border-none rounded-lg focus:border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:bg-gray-600"
					/>
				</div>
				<div class="px-2 pb-2">
					{#if search && _listData.length === 0}
						<div class="text-center">
							<span class="font-bold break-words"> {search}</span> Not Found
						</div>
					{:else}
						{#each search ? _listData : listData as item}
							<button
								class={classnames(
									'text-left px-3 py-2 w-full text-color-default cursor-pointer hover:rounded-lg',
									{
										'bg-primary-500 rounded-lg hover:bg-primary-500 dark:hover:bg-primary-500 text-white':
											selectedData.value === item.value,
										'bg-transparent hover:bg-gray-100 hover:dark:bg-gray-600':
											selectedData.value !== item.value
									}
								)}
								on:click={() => {
									showList = !showList;
									selectedData = item;
									$form.value = JSON.stringify(item);
								}}
							>
								{item.label}
							</button>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
		{#if $form.errors}
			<ErrorMessage errors={$form.errors} id={name} />
		{/if}
	{/if}
</div>
