<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';

	export let value = '';
	export let label: string = '';
</script>

<!--
@component
Input with label
-->
<Label class="mb-2">{label}
	<Input bind:value {...$$restProps} />
</Label>
