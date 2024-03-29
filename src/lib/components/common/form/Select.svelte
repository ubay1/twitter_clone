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
			class="bg-gray-50 border border-gray-300 focus:border-primary-500 focus:ring-primary-500 w-full flex justify-between items-center py-2 pr-1.5 pl-2.5 rounded-lg focus:border focus:ring-2 outline-none"
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
					class="w-[1.5rem] h-[1.5rem] text-gray-500 opacity-20"
				/>
			{/if}
		</div>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			{id}
			{disabled}
			use:floatingRef
			class={classnames(
				'bg-transparent border-solid border-1 h-[55px] w-full flex flex-col items-start rounded-[5px] focus:border focus:ring-2 outline-none cursor-pointer',
				{
					'border-red-500 ring-red-500': formError,
					'border-[#dedede]': !formError || !showList,
					'border-blue-500 border-2': showList
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
			<span
				class={classnames('text-sm truncate pt-1 px-2', {
					'text-gray-500': !showList,
					'text-blue-500': showList
				})}
			>
				{name}
			</span>
			<div class="flex items-center justify-between w-full absolute top-35% h-40px">
				<span
					class={classnames('text-sm truncate px-2', {
						'text-gray-500': !checkDataIsNotEmpty(selectedData.value)
					})}
				>
					{checkDataIsNotEmpty(selectedData.value) ? selectedData.label : ''}
				</span>
				<Icon
					icon="bi:chevron-down"
					class={classnames('w-[1rem] h-[1rem] absolute right-2 top-[0px]', {
						'rotate-180 transform transition duration-200 ease-in-out text-blue-500': showList,
						'rotate-0 transform transition duration-200 ease-in-out text-gray-500': !showList
					})}
				/>
			</div>
		</div>
		{#if showList}
			<div
				use:floatingContent
				class="absolute z-[1000] bg-white border border-gray-300 top-14 shadow rounded-lg w-full max-h-[250px] overflow-auto"
			>
				<div class="p-2 sticky top-0 bg-white">
					<input
						bind:value={search}
						type="text"
						placeholder={placeholderSearch}
						class="w-full bg-gray-100 py-2 border-none rounded-lg focus:border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
										'bg-primary-500 rounded-lg hover:bg-primary-500 text-white':
											selectedData.value === item.value,
										'bg-transparent hover:bg-gray-100': selectedData.value !== item.value
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
