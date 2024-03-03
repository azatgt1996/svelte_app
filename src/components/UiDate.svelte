<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import UiLabel from './UiLabel.svelte';

	export let value: any = null;
	export let label: string = '';
	export let type: 'date'|'datetime-local'|'time' = 'date';
	
</script>

<!--
@component
Date input with label
-->
<Label class="mb-2">
	<UiLabel {label} required={$$restProps.required}/>
	<Input bind:value {...$$restProps} {type}/>
</Label>
