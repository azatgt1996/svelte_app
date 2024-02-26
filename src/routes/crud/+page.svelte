<script lang="ts">
	import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Table } from 'flowbite-svelte';
	import { Label, Select, P, Button, Input, Popover, Modal, Badge, Search, Checkbox } from 'flowbite-svelte';
	import { PlusOutline, DotsHorizontalSolid, EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import toast from 'svelte-french-toast';
	import type { Option } from '../../types/interfaces';
	import { showConfirm } from '../../util/interaction'

	let modal = false;
	let search = '';

	const onChange = (e: Event) => search = (e.target as HTMLInputElement).value

	type Car = { id: number; name: string; type: string; year: number };

	const types: Option[] = [
		{ name: 'Sport', value: 'sport' },
		{ name: 'Hatchback', value: 'hatchback' },
		{ name: 'Sedan', value: 'sedan' }
	];

	let form: Car;

	let rows: Car[] = [
		{ id: 1, name: 'Toyota', type: 'sport', year: 2017 },
		{ id: 2, name: 'Ford', type: 'sedan', year: 2018 },
		{ id: 3, name: 'Volvo', type: 'hatchback', year: 2019 },
		{ id: 4, name: 'Saab', type: 'sport', year: 2020 }
	];

	let lastId = 4;

	$: filtered = rows.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()));

	async function onDelete(row: Car) {
		if (!await showConfirm()) return
		rows = rows.filter((el) => el.id != row.id);
		toast.success('Car deleted');
	}

	let isNew = false;

	function openModal(row?: Car) {
		if (row) form = row;
		else form = { id: -1, name: '', type: '', year: 2020 };

		isNew = !!row;

		modal = true;
	}

	function onSave() {
		if (form.id > 0) {
			const index = rows.findIndex((el) => el.id == form.id);
			rows[index] = form;
			rows = rows;
		} else {
			form.id = ++lastId;
			rows.push(form);
			rows = rows;
		}

		toast.success('Car saved');
		modal = false;
	}

	let selected: number[] = []
</script>

<div class="m-auto max-w-xl">
	<Table shadow>
		<caption class="ml-3">
			<P weight="bold" size="2xl" class="mb-2">Our cars</P>
			<div class="inline-flex gap-3 w-full mb-1">
				<Button color="light" size="xs" on:click={() => openModal()}>
					<PlusOutline size="xs" class="me-2" />
					Add
				</Button>
				<Search on:change={onChange} size="sm" class="w-50"/>
			</div>
		</caption>
		<TableHead class="dark:bg-gray-900">
			<TableHeadCell class="!p-4">
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell>ID</TableHeadCell>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Type</TableHeadCell>
			<TableHeadCell>Year</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#if filtered.length == 0}
				<P class="mt-2">Table data is empty</P>
			{/if}
			{#each filtered as row (row.id)}
				<TableBodyRow>
					<TableHeadCell class="!p-4">
						<Checkbox value={row.id} bind:group={selected}/>
					</TableHeadCell>
					<TableBodyCell>{row.id}</TableBodyCell>
					<TableBodyCell>{row.name}</TableBodyCell>
					<TableBodyCell>
						<Badge rounded large color="blue">{row.type}</Badge>
					</TableBodyCell>
					<TableBodyCell>{row.year}</TableBodyCell>
					<TableBodyCell>
						<div id={'more-' + row.id}>
							<DotsHorizontalSolid />
						</div>
						<Popover triggeredBy={'#more-' + row.id} placement="left">
							<button class="mb-1 block" on:click={() => openModal(row)}>
								<EditOutline class="inline pb-1"/>
								Edit
							</button>
							<button class="block" on:click={() => onDelete(row)}>
								<TrashBinOutline class="inline pb-1"/>
								Delete
							</button>
						</Popover>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>

	<Modal class="max-w-md" title={isNew ? 'Editing car' : 'New car'} bind:open={modal}>
		<form on:submit={onSave}>
			<Label class="mb-2">Car name
				<Input bind:value={form.name} required />
			</Label>
			<Label>Type
				<Select	class="mb-2" placeholder="Choose type" items={types}
								bind:value={form.type} required/>
			</Label>
			<Label class="mb-2">Year
				<Input bind:value={form.year} type="number" required />
			</Label>
			<Button class="mt-3" type="submit">Save</Button>
		</form>
	</Modal>
</div>
