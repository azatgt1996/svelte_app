<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Card, P } from 'flowbite-svelte';
	import type { Product } from '@/types';
	import { getById } from '@/util/api';
	import { UiBtn } from '@/components';

	let id = $page.params.id;

	let product: Product;

	onMount(async () => {
		product = await getById('products', id);
	});
</script>

<div class="max-w-md m-auto">
	<UiBtn href="/products" size="xs" name="Go back" leftIcon="ArrowLeft"/>
	{#if product}
		<Card img={product.image} class="mt-2">
			<P size="2xl" weight="bold" color="text-blue-700">${product.price}</P>
			<P size="2xl" weight="bold">{product.title}</P>
			<P>{product.description}</P>
		</Card>
	{/if}
</div>
