<script lang="ts">
	import { page } from '$app/stores';
	import { currentYear, getListDates, getListMonths, getListYears } from '$lib/utils/date';
	import FormInput from '$lib/components/common/form/Input.svelte';
	import FormSelectV2 from '$lib/components/common/form/SelectV2.svelte';
	import { debounce } from '$lib/actions/debounce';
	import type { IListData } from '$lib/types/components';
	import { dataSignup as useDataSignUp } from '$lib/stores/auth/signup';
	import ButtonFill from '$lib/components/common/button/ButtonFill.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { checkObjectHasEmptyValue } from '$lib/utils/transform';

	let dataSignup = {
		name: '',
		email: '',
		yearOfBirth: {} as IListData,
		monthOfBirth: {} as IListData,
		dateOfBirth: {} as IListData
	};
	$: useDataSignUp.setDataSignup(dataSignup);

	const submitSignup: SubmitFunction = ({ formData, cancel }) => {
		console.log(Object.fromEntries(formData));
		console.log(dataSignup);

		const objectHasEmptyValue = checkObjectHasEmptyValue(dataSignup);

		if (objectHasEmptyValue) {
			alert('gagal');
			cancel();
		}

		return async ({ result, update, formData }) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers
			// the default logic that would be triggered if this callback wasn't set
			if (result.type === 'success') {
				alert('sukses');
			}
			// jika data sukses dikirim, lakukan reset form
			// await update({ reset: true });
			dataSignup = {
				name: '',
				email: '',
				yearOfBirth: {} as IListData,
				monthOfBirth: {} as IListData,
				dateOfBirth: {} as IListData
			};
		};
	};
</script>

<div class="px-8 flex flex-col items-start lt-sm:px-2">
	<div class="font-bold text-2xl mb-6 lt-sm:mt-10">Create your account</div>
	<form method="post" action="?/signup" use:enhance={submitSignup}>
		<div class="w-fill flex flex-col gap-4">
			<FormInput id="name" label="Name" bind:value={dataSignup.name} initFocus={true} />
			<FormInput
				id="email"
				label="Email"
				showTotalInput={false}
				maxLengthInput={1000}
				bind:value={dataSignup.email}
			/>

			<div>
				<div class="font-bold text-sm mb-1">Date of birth</div>
				<div class="text-xs text-gray-5 mb-4">
					This will not be shown publicly. Confirm your own age, even if this account is for a
					business, a pet, or something else.
				</div>
				<div class="grid grid-cols-3 gap-2 mb-20 lt-sm:grid-cols-1">
					<FormSelectV2
						id="Year"
						name="Year"
						placeholder="Year"
						listData={getListYears()}
						bind:selected={dataSignup.yearOfBirth}
					/>
					<FormSelectV2
						id="Month"
						name="Month"
						placeholder="Month"
						listData={getListMonths(Number(dataSignup.yearOfBirth.value))}
						bind:selected={dataSignup.monthOfBirth}
					/>
					<FormSelectV2
						id="Date"
						name="Date"
						placeholder="Day"
						listData={getListDates(
							Number(dataSignup.yearOfBirth.value),
							Number(dataSignup.monthOfBirth.value)
						)}
						bind:selected={dataSignup.dateOfBirth}
					/>
				</div>
				<ButtonFill label="Submit" variant="default" type="submit" />
			</div>
		</div>
	</form>
</div>

<style></style>
