<script lang="ts">
	import { Input, Select, Textarea, Checkbox, A, Label, Button, MultiSelect } from 'flowbite-svelte';
  import type { Option, User } from '../types/interfaces'
  import UiPassword from '../components/UiPassword.svelte'

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
		<Label class="mb-2">Login
			<Input bind:value={form.login} placeholder="john" required />
		</Label>
		<Label class="mb-2">Email
			<Input bind:value={form.email} type="email" placeholder="john@gmail.com" required />
		</Label>
		<Label class="mb-2">Password
			<UiPassword bind:value={form.password} required />
		</Label>
		<Label class="mb-2">Confirm password
			<UiPassword bind:value={form.password2} required />
		</Label>
		<Label class="mb-2">Birth date
			<Input bind:value={form.birthDate} type="date" placeholder="Input date" required />
		</Label>
		<Label>Language
			<Select class="mb-2" placeholder="Choose language" items={langs} bind:value={form.lang} required />
		</Label>
		<Label>Skills
			<MultiSelect class="mb-2 bg-gray-50 dark:bg-gray-700" items={skills} bind:value={form.skills}/>
		</Label>
		<Label>About
			<Textarea class="mb-2" bind:value={form.about} placeholder="Type to yourself" required />
		</Label>
		<Checkbox class="mb-6" required>
			I agree with the <A class="ml-1" href="/">terms and conditions</A>.
		</Checkbox>
		<Button type="submit">Submit</Button>
		<Button class="ml-5" type="reset" color="light">Reset</Button>
	</form>
</div>
