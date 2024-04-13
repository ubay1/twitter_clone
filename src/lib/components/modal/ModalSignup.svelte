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
	import { email } from 'svelte-forms/validators';
	import { customValidationNameSignup } from '$lib/utils/customValidationForErrorHandling';

	let isLoading: boolean = false;

	let dataSignup = {
		name: '',
		email: '',
		yearOfBirth: '',
		monthOfBirth: '',
		dateOfBirth: ''
	};
	$: useDataSignUp.setDataSignup(dataSignup);

	const submitSignup: SubmitFunction = ({ formData, cancel }) => {
		isLoading = true;
		const objectHasEmptyValue = checkObjectHasEmptyValue(dataSignup);
		// console.log(objectHasEmptyValue);
		// console.log(dataSignup);

		if (objectHasEmptyValue) {
			alert('gagal');
			cancel();
		}

		return async ({ result }) => {
			console.log(result);
			isLoading = false;

			if (result.type === 'success') {
				alert('sukses');
			}
			// jika data sukses dikirim, lakukan reset form
			// await update({ reset: true });
			dataSignup = {
				name: '',
				email: '',
				yearOfBirth: '',
				monthOfBirth: '',
				dateOfBirth: ''
			};
		};
	};
</script>

<div class="px-8 flex flex-col items-start lt-sm:px-2">
	<div class="font-bold text-2xl mb-6 mt-10">Create your account</div>
	<form method="post" action="?/signup" use:enhance={submitSignup}>
		<div class="w-full flex flex-col gap-4">
			<FormInput
				id="Name"
				name="Name"
				label="Name"
				validation={[customValidationNameSignup()]}
				bind:value={dataSignup.name}
				on:value={(e) => (dataSignup.name = e.detail)}
				initFocus={true}
			/>
			<FormInput
				id="Email"
				name="Email"
				label="Email"
				validation={[email()]}
				showTotalInput={false}
				maxLengthInput={1000}
				bind:value={dataSignup.email}
				on:value={(e) => (dataSignup.email = e.detail)}
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
						listData={getListMonths(Number(dataSignup.yearOfBirth))}
						bind:selected={dataSignup.monthOfBirth}
					/>
					<FormSelectV2
						id="Date"
						name="Date"
						placeholder="Day"
						listData={getListDates(Number(dataSignup.yearOfBirth), Number(dataSignup.monthOfBirth))}
						bind:selected={dataSignup.dateOfBirth}
					/>
				</div>
				<ButtonFill
					label="Submit"
					variant="black"
					type="submit"
					loading={isLoading}
					disabled={checkObjectHasEmptyValue(dataSignup)}
				/>
			</div>
		</div>
	</form>
</div>
