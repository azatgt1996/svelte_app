<script lang="ts">
	import { Card, P, Spinner } from 'flowbite-svelte';
	import { size } from '@src/stores/globalStore';
	import type { Product } from '@src/types';
	import { getAll } from '@src/util/api';
	import { UiSelect } from '@src/components'

	const sizes = [
		{ name: '3 products', value: 3 },
		{ name: '5 products', value: 5 },
		{ name: '7 products', value: 7 },
		{ name: '10 products', value: 10 }
	];

	let promise: Promise<Product[]>;
	$: promise = getAll('products', $size);
</script>

<div class="max-w-md m-auto">
	<UiSelect label="Products count" bind:value={$size} items={sizes} width="200px"/>
	{#await promise}
		<Spinner class="m-auto" />
		<P>Products is loading ...</P>
	{:then list}
		{#each list as item (item.id)}
			<Card class="mt-2" href={'/products/' + item.id}>
				<P size="2xl" weight="bold">{item.title}</P>
				<P>{item.description}</P>
			</Card>
		{/each}
	{/await}
</div>
