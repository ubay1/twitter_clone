<script lang="ts">
	import 'uno.css';
	import '$lib/assets/css/global.css';
	// import '$lib/assets/css/theme.css';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import Seo from '$lib/components/common/Seo.svelte';
	import { Toaster } from 'svelte-french-toast';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<Seo />

<main class="overflow-hidden bg-color_bg lampon" id="layout1">
	<Toaster />
	<slot />
</main>

<style>
</style>
