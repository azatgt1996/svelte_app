<script lang="ts">
	import { NumberInput, Label } from 'flowbite-svelte';
	import UiLabel from './UiLabel.svelte';

	export let value: number = 0;
	export let label = '';

	const validKeys = '0 1 2 3 4 5 6 7 8 9 Backspace ArrowUp ArrowDown'.split(' ')
	const onKeydown = (e: any) => (!validKeys.includes(e.key)) && e.preventDefault();
</script>

<!--
@component
NumberInput with label
-->
<Label class="mb-2">
	<UiLabel {label} required={$$restProps.required}/>
	<NumberInput bind:value min="0" {...$$restProps} on:keydown={onKeydown}/>
</Label>
