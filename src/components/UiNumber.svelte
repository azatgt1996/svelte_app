<script lang="ts">
	import { NumberInput, Label } from 'flowbite-svelte';

	export let value: number = 0;
	export let label = '';
</script>

<!--
@component
NumberInput with label
-->
<Label class="mb-2">{label}
	<NumberInput bind:value {...$$restProps} />
</Label>
