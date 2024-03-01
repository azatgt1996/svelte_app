<script lang="ts">
	import { MultiSelect, Label } from 'flowbite-svelte';
	import UiLabel from './UiLabel.svelte';

	export let value: (string|number)[] = [];
	export let label = '';
	//TODO add required
</script>

<!--
@component
MultiSelect with label
-->
<Label class="mb-2">
	<UiLabel {label} required={$$restProps.required}/>
	<MultiSelect class="mb-2 bg-gray-50 dark:bg-gray-700" bind:value {...$$restProps}/>
</Label>
