<script lang="ts">
	import { nanoid } from 'nanoid';
	import { uuid } from '../../stores/globalStore';
	import { Button, P } from 'flowbite-svelte';
	import { showConfirm, showPrompt } from '../../util/interaction';
	import toast from 'svelte-french-toast';
	import { getById } from '../../util/api'
	import { UiInput, UiNumber, UiPassword } from '../../components';
	
	const genId = () => ($uuid = nanoid());

	async function testConfirm() {
		let res = await showConfirm();
		res ? toast.success('true') : toast.error('false');
	}

	async function testPrompt() {
		let res = await showPrompt();
		let props = { loading: 'Receiving...', success: 'Product received', error: 'Error...' };
		toast.promise(getById('products', res), props)
	}
</script>

<div class="max-w-md m-auto">
	<P>uuid: {$uuid}</P>
	<Button on:click={genId}>Generate ID</Button>
	<Button on:click={testConfirm}>Show confirm</Button>
	<Button on:click={testPrompt}>Show prompt</Button>

	<form class="mt-4">
		<div class="flex gap-4">
			<UiInput label="Login" placeholder="john" required/>
			<UiInput label="Email" type="email" placeholder="john@gmail.com" required/>
			<UiPassword label="Pin code" placeholder="1234" maxlength={4}
									pattern="{String.raw`\d{4}`}" required class="w-28"/>
		</div>
		<UiInput label="Price" type="range" min="0" max="9999"/>
		<UiNumber label="Age" placeholder="18" required min="10"/>
		<Button type="submit">Submit</Button>
	</form>
</div>
