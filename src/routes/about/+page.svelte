<script lang="ts">
	import { nanoid } from 'nanoid';
	import { uuid } from '../../stores/globalStore';
	import { Button, P } from 'flowbite-svelte';
	import { showConfirm, showPrompt } from '../../util/interaction';
	

	const genId = () => ($uuid = nanoid());

	async function testConfirm() {
		let res = await showConfirm();
		console.log(res);
	}

	async function testPrompt() {
		let res = await showPrompt();
		console.log(res);
	}
</script>

<div class="max-w-md m-auto">
	<P>uuid: {$uuid}</P>
	<Button on:click={genId}>Generate ID</Button>
	<Button on:click={testConfirm}>Show confirm</Button>
	<Button on:click={testPrompt}>Show prompt</Button>
</div>
