<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Seo from '$lib/components/common/Seo.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { CloseShallowRouting, ShallowRouting } from '$lib/utils/shallowRouting.ts';

	export let data;

	function showModal(path: string) {
		ShallowRouting._path = path;
		ShallowRouting.showModal();
	}
	function closeModal() {
		const close = new CloseShallowRouting();
		close.back({ type: 'replace_back' });
	}

	afterNavigate(() => {
		showModal(data.shallow);
	});
</script>

<Seo title="Signup For X" url="/" />

{#if $page.state.showModal}
	<Modal on:close={closeModal} />
{/if}
