<script lang="ts">
	import { Textarea, Label } from 'flowbite-svelte';
	import UiLabel from './UiLabel.svelte';

	export let value = '';
	export let label = '';
</script>

<!--
@component
Textarea with label
-->
<Label class="mb-2">
	<UiLabel {label} required={$$restProps.required}/>
	<Textarea bind:value {...$$restProps} />
</Label>
