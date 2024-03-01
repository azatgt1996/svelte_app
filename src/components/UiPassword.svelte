<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import EyeOutline from 'flowbite-svelte-icons/EyeOutline.svelte';
	import EyeSlashOutline from 'flowbite-svelte-icons/EyeSlashOutline.svelte';
	import UiLabel from './UiLabel.svelte';

	export let value = '';
	export let label = 'Password';
	export let placeholder = '••••••••';

	let show = false;
</script>

<!--
@component
Password input with hide\show value

- Usage:
  ```tsx
  <UiPassword bind:value={password}>
    ```
-->
<Label class="mb-2">
	<UiLabel {label} required={$$restProps.required}/>
	<Input bind:value type={show ? 'text' : 'password'} {placeholder} {...$$restProps}>
		<div slot="left" class="pointer-events-auto"
				 tabindex="-1" role="button" aria-hidden="true"
				 title={(show ? 'Hide' : 'Show') + ' password'}
				 on:click|preventDefault|stopPropagation={() => (show = !show)}>
			{#if show}
				<EyeOutline />
			{:else}
				<EyeSlashOutline />
			{/if}
		</div>
	</Input>
</Label>
