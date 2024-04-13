<script lang="ts">
	import Icons from '@iconify/svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Seo from '$lib/components/common/Seo.svelte';
	import { constantFooterAuthPage } from '$lib/utils/constants';
	import { CloseShallowRouting, ShallowRouting } from '$lib/utils/shallowRouting.ts';
	import { onMount } from 'svelte';
	import ModalSignup from '$lib/components/modal/ModalSignup.svelte';
	import ButtonFill from '$lib/components/common/button/ButtonFill.svelte';

	let isShowModal: boolean = false;

	let metaTitle: string = "X. It's what's happening";
	$: compMetaTitle = metaTitle;

	const listFooter = constantFooterAuthPage;

	function getTitle(path?: string) {
		const list = {
			signup: 'Sign up for X',
			signin: 'Log in for X',
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
		<ModalSignup on:close={closeModal} />
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
			<button class="btn-fill-white h-11 w-full flex justify-center items-center gap-2">
				<Icons icon="ri:google-fill" class="text-lg" /> Sign up with Google
			</button>
			<button class="btn-fill-white h-11 w-full flex justify-center items-center gap-2">
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

			<ButtonFill variant="primary" on:click={() => showModal('signup')} label="Create account" />

			<div class="text-[11px]">
				By signing up, you agree to the <span class="text-light-colore">Terms of Service</span> and
				<span class="text-light-colore">Privacy Policy</span>, including
				<span class="text-light-colore">Cookie Use</span>
			</div>

			<div class="mt-10">
				<div class="font-bold">Already have an account?</div>
				<button
					class="btn-fill-white h-11 font-semibold w-full mt-4 text-color_primary hover:bg-color_primary/10%"
				>
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
