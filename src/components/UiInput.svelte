<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import UiLabel from './UiLabel.svelte';

	export let value: any = '';
	export let label: string = '';
	//TODO add pattern props without String.raw``
</script>

<!--
@component
Input with label
-->
<Label class="mb-2">
	<UiLabel {label} required={$$restProps.required}/>
	<Input bind:value {...$$restProps}/>
</Label>
