<script lang="ts">
	import { Select, Label } from 'flowbite-svelte';
	import UiLabel from './UiLabel.svelte';

	export let value: any = '';
	export let label = '';
	export let width = '100%';
</script>

<!--
@component
Select with label
-->
<Label class="mb-2" style={`width: ${width}`}>
	<UiLabel {label} required={$$restProps.required}/>
	<Select bind:value {...$$restProps}/>
</Label>
