<script lang="ts">
	import { TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Table } from 'flowbite-svelte';
	import { P, Button, Popover, Modal, Badge, Search, Checkbox } from 'flowbite-svelte';
	import { PlusOutline, DotsHorizontalSolid, EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import toast from 'svelte-french-toast';
	import type { Option } from '../../types/interfaces';
	import { showConfirm } from '../../util/interaction'
	import { UiInput, UiNumber, UiSelect } from '../../components';

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
	const newForm: Car = { id: -1, name: '', type: '', year: 2020 };

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
		form = row ?? newForm;
		isNew = !row;
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

	let mainCB = false
	// $: selected = mainCB ? filtered.map(el => el.id) : []
	$: if (mainCB) selected = filtered.map(el => el.id)
</script>

<div class="m-auto max-w-xl">
	<Table shadow class="table-fixed">
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
			<TableHeadCell class="w-10">
				<Checkbox bind:checked={mainCB}/>
			</TableHeadCell>
			<TableHeadCell class="w-14">ID</TableHeadCell>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell class="w-28">Type</TableHeadCell>
			<TableHeadCell class="w-20">Year</TableHeadCell>
			<TableHeadCell class="w-16"/>
		</TableHead>
		<TableBody>
			{#if filtered.length == 0}
				<P class="m-2 min-w-56">Table data is empty</P>
			{/if}
			{#each filtered as row (row.id)}
				<TableBodyRow>
					<TableHeadCell>
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
						<Popover triggeredBy={'#more-' + row.id} placement="left" arrow={false}>
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
	selected: {selected}

	<Modal class="max-w-md" title={isNew ? 'New car' : 'Editing car'} bind:open={modal}>
		<form on:submit={onSave}>
			<UiInput label="Car name" bind:value={form.name} required maxlength="10" minlength="3"/>
			<UiSelect label="Type" bind:value={form.type} items={types} placeholder="Choose type" required/>
			<UiNumber label="Year" bind:value={form.year} required min="1999" max="2024"/>
			<Button class="mt-3" type="submit">Save</Button>
		</form>
	</Modal>
</div>
