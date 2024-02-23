<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import EyeOutline from 'flowbite-svelte-icons/EyeOutline.svelte';
	import EyeSlashOutline from 'flowbite-svelte-icons/EyeSlashOutline.svelte';

	/** model value */
	export let value = '';
	export let required = false;

	let show = false;
</script>

<!--
@component
Password input with eye icon

- Usage:
  ```tsx
  <UiPassword bind:value={password}>
    ```
-->
<Input bind:value type={show ? 'text' : 'password'} placeholder="••••••••" {required}>
	<button slot="left" class="pointer-events-auto" tabindex="-1"
          title={(show ? 'Hide' : 'Show') + ' password'}
          on:click|preventDefault={() => (show = !show)}>
		{#if show}
			<EyeOutline />
		{:else}
			<EyeSlashOutline />
		{/if}
	</button>
</Input>
