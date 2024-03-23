<script lang="ts">
	const fav = '/images/favicon.svg';
	export let templateTitle: string = ' / X';
	export let title: string = '';
	export let url: string = '';
	export let favicon = fav;
	export let description: string = 'Hello guys from x-clone';
</script>

<svelte:head>
	<title>{title}{templateTitle}</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content={description} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<meta name="twitter:title" content={title + templateTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content={fav} />
	<meta property="og:title" content={templateTitle + title} />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fav} />
	<meta property="og:image:secure" content={fav} />
	<meta property="og:image:width" content="800" />
	<meta property="og:image:height" content="450" />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="article" />
</svelte:head>
