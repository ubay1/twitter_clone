<script lang="ts">
	import { dataSignup as useDataSignUp } from '$lib/stores/auth/signup';
	import Step1 from './signup/Step1.svelte';
</script>

<div class="px-8 flex flex-col items-start lt-sm:px-2">
	<div class="font-bold text-2xl mb-6 sm:mt-6 lt-sm:mt-10">Create your account</div>
	<!-- use:enhance={submitSignup} -->
	<form method="post" action="?/signup">
		{#if $useDataSignUp.step === 1}
			<Step1 />
		{/if}
	</form>
</div>
