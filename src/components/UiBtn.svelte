<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import ArrowLeft from 'flowbite-svelte-icons/ArrowLeftOutline.svelte'
	import ArrowRight from 'flowbite-svelte-icons/ArrowRightOutline.svelte'
	import Plus from 'flowbite-svelte-icons/PlusOutline.svelte'
	import Trash from 'flowbite-svelte-icons/TrashBinOutline.svelte'

	export let name: string = '';

	export let leftIcon: string = '';
	export let rightIcon: string = '';

	const icons = {
		ArrowLeft, ArrowRight, Plus, Trash
	}
	
</script>

<!--
@component
Button with icon (left or right)
-->
<Button {...$$restProps} on:click>
	{#if leftIcon}
		<svelte:component this={icons[leftIcon]} size="sm" class={name && 'me-3'}/>
	{/if}
	{name}
	{#if rightIcon}
		<svelte:component this={icons[rightIcon]} size="sm" class="ms-3"/>
	{/if}
</Button>
