<script lang="ts">
	import { Select, Label } from 'flowbite-svelte';

	export let value: any;
	export let label = '';
	export let width = '100%';
</script>

<!--
@component
Select with label
-->
<Label class="mb-2" style={`width: ${width}`}>{label}
	<Select bind:value {...$$restProps}/>
</Label>
