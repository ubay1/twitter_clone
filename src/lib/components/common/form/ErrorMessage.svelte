<script lang="ts">
	import { errorMsg } from '$lib/utils/errorHandling';

	export let id: string = '';
	export let idConfirm: string | undefined = undefined;
	export let min: number | undefined = undefined;
	export let errors: string[] = [];

	function checkTypeError(type: string): string {
		return errorMsg(id, min, idConfirm).filter((item) => item.type === type)[0].value;
	}
</script>

<div class="flex flex-col">
	{#each errors as error, idx}
		<div class="text-sm text-red-500">
			{#if idx === 0}
				{checkTypeError(error)}
			{/if}
		</div>
	{/each}
</div>

<style></style>
