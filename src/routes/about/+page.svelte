<script lang="ts">
	import { nanoid } from 'nanoid';
	import { uuid } from '../../stores/globalStore';
	import { Button, P } from 'flowbite-svelte';
	import { showConfirm, showPrompt } from '../../util/interaction';
	import toast from 'svelte-french-toast';
	
	const genId = () => ($uuid = nanoid());

	async function testConfirm() {
		let res = await showConfirm();
		toast.success(res.toString());
	}

	async function testPrompt() {
		let res = await showPrompt();
		toast.success(res?.toString() ?? 'null');
	}
</script>

<div class="max-w-md m-auto">
	<P>uuid: {$uuid}</P>
	<Button on:click={genId}>Generate ID</Button>
	<Button on:click={testConfirm}>Show confirm</Button>
	<Button on:click={testPrompt}>Show prompt</Button>
</div>
