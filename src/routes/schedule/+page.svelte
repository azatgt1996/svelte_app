<script lang="ts">
	import { P, Button } from 'flowbite-svelte';
	import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
	import ArrowLeft from 'flowbite-svelte-icons/ArrowLeftOutline.svelte'
	import ArrowRight from 'flowbite-svelte-icons/ArrowRightOutline.svelte'
	import { UiDate, UiSelect, UiBtn } from '@/components';

	const doctors = [
		{name: 'Иванов Иван', value: 1},
		{name: 'Петров Петр', value: 2},
		{name: 'Жуков Жук', value: 3},
	]

	const form = {
		date: new Date().toISOString().slice(0, 10),
		doctor: 1,
	}

	const times = ['8:00','8:30', '9:00','9:30', '10:00','10:30', '11:00','11:30', '12:00','12:30',
								 '13:00','13:30', '14:00','14:30', '15:00','15:30', '16:00','16:30', '17:00','17:30'];
	
	const getWeek = (date: string) => {
		const week: any[] = [];
		let curDate = new Date(date);

		for (let i = 0; i < 7; i++) {
			week.push({
				name: new Date(curDate).toLocaleString('ru', { weekday: 'long' }),
				value: new Date(curDate).toLocaleString().slice(0, 5),
			});
			curDate = new Date(curDate.setDate(curDate.getDate() + 1));
		}

		return week;
	}
	
	$: weekDays = getWeek(form.date);

	$: month = new Date(form.date).toLocaleString('ru', { month: 'long', year: 'numeric' }).toUpperCase()

	const changeWeek = (op: string) => {
		let date = new Date(form.date);
		const diff = op == 'next' ? 7 : -7;
		date = new Date(date.setDate(date.getDate() + diff));
		form.date = date.toISOString().slice(0, 10);
	}

</script>

<div class="m-auto max-w-7xl">
	<P align="center" weight="bold" size="2xl" class="mb-3">Расписание приема</P>
	<form class="m-auto max-w-2xl">
		<div class="flex gap-10">
			<UiDate bind:value={form.date} label="Календарь" class="w-40"/>
			<UiSelect bind:value={form.doctor} label="Врач" placeholder="Выберите врача" items={doctors}/>
		</div>
		<div class="flex justify-between">
			<UiBtn size="xs" color="light" name="Предыдущая неделя" leftIcon="ArrowLeft" on:click={() => changeWeek('prev')}/>
			<P height="loose">{month}</P>
			<UiBtn size="xs" color="light" name="Следующая неделя" rightIcon="ArrowRight" on:click={() => changeWeek('next')}/>
		</div>
	</form>
	<Table shadow class="table-fixed mt-2" >
		<TableHead class="dark:bg-gray-900">
			<TableHeadCell class="w-12"></TableHeadCell>
			{#each weekDays as day }
				<TableHeadCell>
					<span>{day.name}<br>{day.value}</span>
				</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each times as time, index }
				<TableBodyRow class={index % 2 == 0 ? 'border-b' : 'border-b-2'}>
					<TableBodyCell class="py-1 px-1.5">{time}</TableBodyCell>
					{#each weekDays as day, idx }
						<TableBodyCell class="py-1"></TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
