<script lang="ts">
	import { Checkbox, A, Button } from 'flowbite-svelte';
  import type { Option, User } from '../types/interfaces'
  import { UiInput, UiPassword, UiSelect, UiMultiSelect, UiTextarea } from '../components'

	let form: User = {
		login: '',
		email: '',
		password: '',
		password2: '',
		birthDate: '',
		about: '',
		lang: '',
		skills: []
	};

	const langs: Option[] = [
		{ name: 'English', value: 'EN' },
		{ name: 'Russian', value: 'RU' }
	];

	const skills: Option[] = [
		{ name: 'Java', value: 'java' },
		{ name: 'Svelte', value: 'svelte' },
		{ name: 'Kotlin', value: 'kotlin' }
	];

	function submit() {
		if (form.password != form.password2) return alert('Passwords mismatch');
		if (form.birthDate > '2010-01-01')
			return alert('Birth day not should be later than "2010-01-01"');
		alert(JSON.stringify(form, null, 2));
	}
</script>

<div class="max-w-sm m-auto">
	<form on:submit={submit}>
		<UiInput label="Login" bind:value={form.login} placeholder="john" required/>
		<UiInput label="Email" bind:value={form.email} type="email" placeholder="john@mail.com" required/>
		<UiPassword bind:value={form.password} required/>
		<UiPassword label="Confirm password" bind:value={form.password2} required/>
		<UiInput label="Birth date" bind:value={form.birthDate} type="date" required/>
		<UiSelect label="Language" bind:value={form.lang} items={langs} placeholder="Choose language" required/>
		<UiMultiSelect label="Skills" items={skills} bind:value={form.skills}/>
		<UiTextarea label="About" bind:value={form.about} placeholder="Type to yourself" required/>
		<Checkbox class="mb-6" required>
			I agree with the <A class="ml-1" href="/">terms and conditions</A>.
		</Checkbox>
		
		<Button type="submit">Submit</Button>
		<Button class="ml-5" type="reset" color="light">Reset</Button>
	</form>
</div>