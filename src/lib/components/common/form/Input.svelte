<script lang="ts">
	import classNames from 'classnames';
	import { onMount } from 'svelte';

	export let id: string;
	export let label: string;
	export let showTotalInput: boolean = true;
	export let maxLengthInput: number = 50;
	export let value: string;
	export let initFocus: boolean = false;

	let formInput: any;
	let isFocused: boolean = false;

	$: totalValue = Number(value.length);

	const onFocus = () => (isFocused = true);
	const onBlur = () => (isFocused = false);

	onMount(() => {
		if (initFocus) {
			formInput.focus();
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={classNames('inputContainer', {
		'border border-solid border-[#dedede]': !isFocused,
		'border-2 border-solid border-[#1d9bf0]': isFocused
	})}
	on:click={formInput.focus()}
>
	<input
		{id}
		name={id}
		type="text"
		required
		maxlength={maxLengthInput}
		bind:this={formInput}
		bind:value
		on:focus={onFocus}
		on:blur={onBlur}
	/>
	<label
		for={id}
		class={classNames({
			'!text-gray-5': !isFocused
		})}>{label}</label
	>
	{#if showTotalInput}
		<div
			class={classNames('absolute right-3 top-2 text-[14px] text-gray', {
				hidden: !isFocused,
				block: isFocused
			})}
		>
			{totalValue}/{maxLengthInput}
		</div>
	{/if}
</div>

<style>
	.inputContainer {
		background: transparent !important;
		width: 100%;
		/* max-width: 480px; */
		border-radius: 5px;
		position: relative;
	}
	.inputContainer > * {
		transition: all 0.1s ease-out;
		/* transition-delay: 0.1s; */
	}
	.inputContainer input {
		height: 28px;
		margin: 20px 0 4px 0;
		padding-left: 10px;
		font-size: 16px;
		width: -moz-available;
		width: -webkit-fill-available;
		width: fill-available;
		outline: none !important;
		background: transparent !important;
		border: none !important;
		/* box-shadow: inset 99px 99px 99px 99px #eee; */
		display: block;
	}
	.inputContainer input:focus,
	.inputContainer input:valid {
		margin: 20px 0 4px 0;
	}
	.inputContainer input:focus + label,
	.inputContainer input:valid + label {
		top: 5px;
		color: #1d9bf0;
	}
	.inputContainer label {
		position: absolute;
		cursor: text;
		line-height: 20px;
		top: 15px;
		left: 10px;
		color: #6b7820;
		font-size: 16px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
