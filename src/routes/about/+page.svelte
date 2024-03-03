<script lang="ts">
	import { nanoid } from 'nanoid';
	import { uuid } from '@/stores/globalStore';
	import { Button, P, Tabs, TabItem } from 'flowbite-svelte';
	import { showConfirm, showPrompt } from '@/util/interaction';
	import toast from 'svelte-french-toast';
	import { getById } from '@/util/api'
	import { UiInput, UiNumber, UiPassword } from '@/components';
	
	const genId = () => ($uuid = nanoid());

	async function testConfirm() {
		let res = await showConfirm();
		res ? toast.success('true') : toast.error('false');
	}

	async function testPrompt() {
		let res = await showPrompt();
		let props = { loading: 'Receiving...', success: 'Product received', error: 'Error...' };
		toast.promise(getById('products', res), props)
	}

	const form = {
		login: '',
		email: '',
		pinCode: '',
		price: 100,
		age: 20,
		name: '',
		date: new Date().toISOString().slice(0,16)
	}
</script>

<div class="max-w-md m-auto">
	<P>uuid: {$uuid}</P>
	<Button on:click={genId}>Generate ID</Button>
	<Button on:click={testConfirm}>Show confirm</Button>
	<Button on:click={testPrompt}>Show prompt</Button>

	<form class="mt-4" on:submit={() => alert(JSON.stringify(form, null, 4))}>
		<!-- TODO navigate to a tab that has blank required fields -->
		<Tabs>
			<TabItem open title="Main">
				<div class="flex gap-4">
					<UiInput bind:value={form.login} label="Login" placeholder="john" required/>
					<UiInput bind:value={form.email} label="Email" type="email" placeholder="john@gmail.com" required/>
					<UiPassword bind:value={form.pinCode} label="Pin code" placeholder="1234" maxlength={4}
											pattern="{String.raw`\d{4}`}" required class="w-28"/>
				</div>
				<UiInput bind:value={form.price} label="Price" type="range" min="0" max="200" title={form.price}/>
				<UiNumber bind:value={form.age} label="Age" placeholder="18" required min="10"/>
			</TabItem>
			<TabItem title="Additional">
				<UiInput bind:value={form.name} label="Name" placeholder="type anything..." required/>
				<UiInput bind:value={form.date} label="Date" type="datetime-local" required/>
			</TabItem>
		</Tabs>

		<P><pre>{JSON.stringify(form, null, 2)}</pre></P>
		<br>
		<Button type="submit">Submit</Button>
	</form>
</div>
