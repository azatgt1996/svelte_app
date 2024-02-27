<script lang="ts">
	import { nanoid } from 'nanoid';
	import { uuid } from '../../stores/globalStore';
	import { Button, P, Label, Input } from 'flowbite-svelte';
	import { showConfirm, showPrompt } from '../../util/interaction';
	import toast from 'svelte-french-toast';
	import { getById } from '../../util/api'
	
	const genId = () => ($uuid = nanoid());

	async function testConfirm() {
		let res = await showConfirm();
		res ? toast.success('true') : toast.error('false');
	}

	async function testPrompt() {
		let res = await showPrompt();
		toast.promise(getById('products', res), { loading: 'Receiving...', success: 'Product received', error: 'Error...' })
	}
</script>

<div class="max-w-md m-auto">
	<P>uuid: {$uuid}</P>
	<Button on:click={genId}>Generate ID</Button>
	<Button on:click={testConfirm}>Show confirm</Button>
	<Button on:click={testPrompt}>Show prompt</Button>

	<form class="mt-4">
		<div class="flex mb-2">
			<Label class="me-2">Login
				<Input placeholder="john" required />
			</Label>
			<Label>Email
				<Input type="email" placeholder="john@gmail.com" required />
			</Label>
		</div>
		<Label class="mb-2">Age
			<Input placeholder="18" type="number" required />
		</Label>
	</form>
</div>
