<script lang="ts">
	import { page } from '$app/stores';
	import Seo from '$lib/components/common/Seo.svelte';
</script>

<Seo templateTitle="" title={$page.status + ' - ' + $page.error?.message} />

<div>
	<div
		un-text="~ sm"
		un-m="y-4 t-[150px]"
		un-flex="~ col justify-center items-center"
	>
		<div un-font="bold" un-text="7xl">{$page.status}</div>
		<div un-max="w-md" un-text="center">
			{$page.status === 404
				? 'Maaf, Halaman yang anda minta tidak ditemukan.'
				: $page.error?.message}
		</div>
		<div class="my-6">
			<button
				un-bg=""
				un-cursor="pointer"
				un-p="2"
				un-border="none"
				un-decoration="none"
				on:click={() => (window.location.href = '/')}
			>
				Kembali
			</button>
		</div>
	</div>
</div>
