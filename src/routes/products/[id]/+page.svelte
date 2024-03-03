<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Card, P, Button } from 'flowbite-svelte';
	import type { Product } from '../../../types';
	import { getById } from '../../../util/api';
	import ArrowLeft from 'flowbite-svelte-icons/ArrowLeftOutline.svelte'

	let id = $page.params.id;

	let product: Product;

	onMount(async () => {
		product = await getById('products', id);
	});
</script>

<div class="max-w-md m-auto">
	<Button href="/products" size="xs">
		<ArrowLeft class="me-3"/>
		Go back
	</Button>
	{#if product}
		<Card img={product.image} class="mt-2">
			<P size="2xl" weight="bold" color="text-blue-700">${product.price}</P>
			<P size="2xl" weight="bold">{product.title}</P>
			<P>{product.description}</P>
		</Card>
	{/if}
</div>
