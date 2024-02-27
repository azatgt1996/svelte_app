<script lang="ts">
	import { Card, P, Spinner, Label, Select } from 'flowbite-svelte';
	import { size } from '../../stores/globalStore';
	import type { Product } from '../../types/interfaces';
	import { getAll } from '../../util/api';

	const sizes = [
		{ name: '3 products', value: 3 },
		{ name: '5 products', value: 5 },
		{ name: '7 products', value: 7 },
		{ name: '10 products', value: 10 }
	];

	let promise: Promise<Array<Product>>;
	$: promise = getAll('products', $size);
</script>

<div class="max-w-md m-auto">
	<Label class="mb-5">Products count
		<Select bind:value={$size} items={sizes}/>
	</Label>
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
