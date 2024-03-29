<script lang="ts">
	import { page } from '$app/stores';
	import Icons from '@iconify/svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Seo from '$lib/components/common/Seo.svelte';
	import { constantFooterAuthPage } from '$lib/utils/constants';
	import { currentYear, getListDates, getListMonths, getListYears } from '$lib/utils/date';
	import { CloseShallowRouting, ShallowRouting } from '$lib/utils/shallowRouting.ts';
	import FormInput from '$lib/components/common/form/Input.svelte';
	import FormSelect from '$lib/components/common/form/Select.svelte';
	import type { IListData } from '$lib/types/components';
	import { dataSignup as useDataSignUp } from '$lib/stores/auth/signup';
	import { onMount } from 'svelte';

	let isShowModal: boolean = false;

	let dataSignup = {
		name: '',
		email: '',
		yearOfBirth: {} as IListData,
		monthOfBirth: {} as IListData,
		dateOfBirth: {} as IListData
	};
	$: useDataSignUp.setDataSignup(dataSignup);

	let metaTitle: string = "X. It's what's happening";
	$: compMetaTitle = metaTitle;

	const listFooter = constantFooterAuthPage;

	function getTitle(path?: string) {
		const list = {
			signup: 'Sign Up For X',
			signin: 'Log In For X',
			default: "X. It's what's happening"
		};

		if (path) {
			metaTitle = (list as any)[path];
		} else {
			metaTitle = list.default;
		}
	}
	function showModal(path: string) {
		ShallowRouting._path = path;
		ShallowRouting.showModal();
		isShowModal = true;
		getTitle(path);
	}
	function closeModal() {
		const close = new CloseShallowRouting();
		close.back({ type: 'replace_back' });
		isShowModal = false;
		getTitle();
	}

	onMount(() => {});
</script>

<Seo title={compMetaTitle} url="/" />

{#if isShowModal}
	<Modal on:close={closeModal}>
		<div class="px-8 flex flex-col items-start">
			<div class="font-bold text-2xl mb-6">Create your account</div>
			<div class="w-fill flex flex-col gap-4">
				<FormInput id="name" label="Name" bind:value={dataSignup.name} />
				<FormInput
					id="email"
					label="Email"
					showTotalInput={false}
					maxLengthInput={1000}
					bind:value={dataSignup.email}
				/>

				<div>
					<div class="font-bold text-sm mb-1">Date of birth</div>
					<div class="text-xs text-gray-5">
						This will not be shown publicly. Confirm your own age, even if this account is for a
						business, a pet, or something else.
					</div>
					<div class="grid grid-cols-3 gap-2">
						<FormSelect
							id="Year"
							name="Year"
							listData={getListYears()}
							bind:selectedData={dataSignup.yearOfBirth}
						/>
						<FormSelect
							id="Month"
							name="Month"
							listData={getListMonths(Number(dataSignup.yearOfBirth.value))}
							bind:selectedData={dataSignup.monthOfBirth}
						/>
						<FormSelect
							id="Date"
							name="Date"
							listData={getListDates(
								Number(dataSignup.yearOfBirth.value),
								Number(dataSignup.monthOfBirth.value)
							)}
							bind:selectedData={dataSignup.dateOfBirth}
						/>
					</div>
				</div>
			</div>
		</div>
	</Modal>
{/if}

<div
	class="h-full"
	un-md="flex"
	un-lt-md="flex flex-col w-3/4 m-auto py-6"
	un-lt-sm="flex flex-col w-10/11 m-auto py-6"
>
	<div un-md="flex justify-center w-[48%]" un-lt-md="flex justify-start">
		<Icons icon="ri:twitter-x-line" class="w-300px h-full lt-md:w-10" />
	</div>
	<div
		un-md="flex flex-col justify-center w-[52%]"
		un-lt-md="flex flex-col justify-center gap-4 mt-10"
	>
		<div class="font-defaultBold font-bold" un-md="text-[4.3rem] mt-20" un-lt-md="text-3xl">
			Happening now
		</div>
		<div class="font-bold text-2xl mt-8 mb-6" un-lt-md="mt-2">Join today.</div>
		<div class="w-[320px] flex flex-col gap-2 <md:w-full">
			<button class="btn-light w-full flex justify-center items-center gap-2">
				<Icons icon="ri:google-fill" class="text-lg" /> Sign up with Google
			</button>
			<button class="btn-light w-full flex justify-center items-center gap-2">
				<Icons icon="ri:apple-fill" class="text-lg" /> Sign up with Apple
			</button>

			<div class="flex justify-center items-center">
				<div class="flex-1 pr-2">
					<div class="w-full h-[1.5px] bg-gray-1"></div>
				</div>
				<div class="text-sm">or</div>
				<div class="flex-1 pl-2">
					<div class="w-full h-[1.5px] bg-gray-1"></div>
				</div>
			</div>

			<button
				class="btn-light border-none bg-colord text-white w-full font-semibold hover:bg-colore"
				on:click|preventDefault={() => showModal('signup')}
			>
				Create account
			</button>

			<div class="text-[11px]">
				By signing up, you agree to the <span class="text-light-colore">Terms of Service</span> and
				<span class="text-light-colore">Privacy Policy</span>, including
				<span class="text-light-colore">Cookie Use</span>
			</div>

			<div class="mt-10">
				<div class="font-bold">Already have an account?</div>
				<button class="btn-light font-semibold w-full mt-4 text-colord hover:bg-colord/10%">
					Sign in
				</button>
			</div>
		</div>
	</div>
</div>
<div
	class="w-10/11 m-auto text-gray-500 text-[14px] flex justify-center flex-wrap gap-4 my-6"
	un-lt-sm="w-fill px-2"
>
	{#each listFooter as list}
		<div>{list}</div>
	{/each}
</div>

<style></style>
