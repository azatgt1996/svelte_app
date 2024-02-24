<script lang="ts">
  import { TableBody, TableBodyCell, TableBodyRow, TableHead, Label, Select,
           TableHeadCell, Table, P, Button, Input, Popover, Modal } from 'flowbite-svelte';
  import SearchOutline from 'flowbite-svelte-icons/SearchOutline.svelte';
  import DotsHorizontalSolid from 'flowbite-svelte-icons/DotsHorizontalSolid.svelte';
  import PlusOutline from 'flowbite-svelte-icons/PlusOutline.svelte';
	import toast from 'svelte-french-toast';

  let modal = false;
  let search = '';

  type Car = { id: number, maker: string, type: string, make: number }

  const types = [
    { name: 'Sport', value: 'sport' },
    { name: 'Hatchback', value: 'hatchback' },
    { name: 'Sedan', value: 'sedan' },
  ]

  let form: Car;

  let rows: Car[] = [
    { id: 1, maker: 'Toyota', type: 'sport', make: 2017 },
    { id: 2, maker: 'Ford', type: 'sedan', make: 2018 },
    { id: 3, maker: 'Volvo', type: 'hatchback', make: 2019 },
    { id: 4, maker: 'Saab', type: 'sport', make: 2020 }
  ];

  let lastId = 4;

  $: filtered = rows.filter(row => row.maker.toLowerCase().includes(search.toLowerCase()));

  function onDelete(row: Car) {
    rows = rows.filter(el => el.id != row.id)
    toast.success('Car deleted')
  }

  let isNew = false;

  function openModal(row?: Car) {
    if (row) form = row
    else form = { id: -1, maker: '', type: '', make: 2020 }

    isNew = !!row;

    modal = true
  }

  function onSave() {
    if (form.id > 0) {
      const index = rows.findIndex(el => el.id == form.id)
      rows[index] = form
      rows = rows
    } else {
      form.id = ++lastId
      rows.push(form)
      rows = rows
    }

    toast.success('Car saved')
    modal = false
  }
  
</script>

<div class="max-w-xl m-auto">
  <P weight="bold" size="2xl" class="mb-2">
    Our cars
    <br>
    <div class="inline-flex gap-3">
      <Button color="light" size="xs" on:click={() => openModal()}>
        <PlusOutline size="xs" class="me-2"/>
        Add
      </Button>
      <!-- <Button color="light" size="xs">Delete</Button> -->
      <Input on:change={e => search = e.target.value} placeholder="Search..." size="sm">
        <SearchOutline slot="left"/>
      </Input>
    </div>
  </P>
  <Table hoverable={true}>
    <TableHead class="dark:bg-gray-900" >
      <TableHeadCell>ID</TableHeadCell>
      <TableHeadCell>Maker</TableHeadCell>
      <TableHeadCell>Type</TableHeadCell>
      <TableHeadCell>Make</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody>
      {#each filtered as row}
        <TableBodyRow>
          <TableBodyCell>{row.id}</TableBodyCell>
          <TableBodyCell>{row.maker}</TableBodyCell>
          <TableBodyCell>{row.type}</TableBodyCell>
          <TableBodyCell>{row.make}</TableBodyCell>
          <TableBodyCell>
            <DotsHorizontalSolid id={'more-' + row.id}/>
            <Popover triggeredBy={'#more-' + row.id} placement="left">
              <button class="block mb-1" on:click={() => openModal(row)}>Edit</button>
              <button class="block" on:click={() => onDelete(row)}>Delete</button>
            </Popover>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <Modal class="max-w-md" title={isNew ? 'Editing car' : 'New car'} bind:open={modal}>
    <form on:submit={onSave}>
      <Label class="mb-2">Maker
        <Input bind:value={form.maker} required />
      </Label>
      <Label class="mb-2">Make
        <Input bind:value={form.make} type="number" required />
      </Label>
      <Label>Type
        <Select class="mb-2" placeholder="Choose type" items={types} bind:value={form.type} required />
      </Label>
      <Button class="mt-3" type="submit">Save</Button>
    </form>
  </Modal>
</div>