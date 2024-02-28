<script lang="ts">
	import { MultiSelect, Label } from 'flowbite-svelte';

	export let value: (string|number)[] = [];
	export let label = '';
</script>

<!--
@component
MultiSelect with label
-->
<Label class="mb-2">{label}
	<MultiSelect class="mb-2 bg-gray-50 dark:bg-gray-700" bind:value {...$$restProps}/>
</Label>
