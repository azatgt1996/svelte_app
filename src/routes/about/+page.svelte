<script lang="ts">
	import { nanoid } from 'nanoid';
	import { uuid } from '../../stores/globalStore';
	import { Button, P } from 'flowbite-svelte';
	

	const genId = () => ($uuid = nanoid());
</script>

<div style="max-width: 700px; margin: 0 auto">
	<P>uuid: {$uuid}</P>
	<Button on:click={genId}>Generate ID</Button>
</div>
