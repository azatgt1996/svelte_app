<script lang="ts">
	import { Textarea, Label } from 'flowbite-svelte';

	export let value = '';
	export let label = '';
</script>

<!--
@component
Textarea with label
-->
<Label class="mb-2">{label}
	<Textarea bind:value {...$$restProps} />
</Label>
