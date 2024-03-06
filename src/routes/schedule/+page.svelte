<script lang="ts">
	import { P } from 'flowbite-svelte';
	import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte';
	import { UiDate, UiSelect, UiBtn } from '@/components';
	import dayjs from 'dayjs';
	import 'dayjs/locale/ru';

	const doctors = [
		{name: 'Иванов Иван', value: 1},
		{name: 'Петров Петр', value: 2},
		{name: 'Жуков Жук', value: 3},
	]

	const today = dayjs().format('YYYY-MM-DD');
	const weekStart = dayjs().locale('ru').startOf('week').format('YYYY-MM-DD');

	const form = { date: weekStart, doctor: 1	}

	const times = ['8:00','8:30', '9:00','9:30', '10:00','10:30', '11:00','11:30', '12:00','12:30',
								 '13:00','13:30', '14:00','14:30', '15:00','15:30', '16:00','16:30', '17:00','17:30'];
	
	const getWeek = (date: string) => {
		const week: any[] = [];
		let curDate = dayjs(date);

		for (let i = 0; i < 7; i++) {
			week.push({
				name: dayjs(curDate).locale('ru').format('dddd'),
				dd_mm: dayjs(curDate).format('DD.MM'),
				value: dayjs(curDate).format('YYYY-MM-DD'),
			});
			curDate = dayjs(curDate).add(1, 'day');
		}

		return week;
	}
	
	$: weekDays = getWeek(form.date);

	$: month = dayjs(form.date).locale('ru').format('MMMM YYYY').toUpperCase();

	const changeWeek = (op: string) => {
		const diff = (op == 'next') ? 1 : -1;
		const date = dayjs(form.date).add(diff, 'week');
		form.date = dayjs(date).format('YYYY-MM-DD');
	}

	const schedule = [
		{datetime: '2024-03-05T12:00', value: 'Удаление зуба у Жени'},
		{datetime: '2024-03-07T15:00', value: 'Чистка зубов'},
	];

	function getItem(day: string, time: string) {
		const datetime = `${day}T${time.length == 4 ? `0${time}` : time}`;
		const item = schedule.find(item => item.datetime === datetime);
		return item?.value ?? '';
	}
	
</script>

<div class="m-auto max-w-7xl">
	<P align="center" weight="medium" size="2xl" class="mb-3">Расписание приема</P>
	<form class="m-auto max-w-2xl">
		<div class="flex gap-10">
			<UiDate bind:value={form.date} label="Календарь" class="w-40"/>
			<UiSelect bind:value={form.doctor} label="Врач" placeholder="Выберите врача" items={doctors}/>
		</div>
		<div class="flex justify-between">
			<UiBtn size="xs" color="light" name="Предыдущая неделя" leftIcon="ArrowLeft" on:click={()=> changeWeek('prev')}/>
			<P height="loose">{month}</P>
			<UiBtn size="xs" color="light" name="Следующая неделя" rightIcon="ArrowRight" on:click={()=> changeWeek('next')}/>
		</div>
	</form>
	<Table shadow class="table-fixed mt-2" >
		<TableHead class="dark:bg-gray-900">
			<TableHeadCell class="w-12"></TableHeadCell>
			{#each weekDays as day }
				<TableHeadCell class="border-l dark:border-gray-700">
					<span style={`color: ${day.value === today && '#1c71d8'}`}>
						{day.name}<br>{day.dd_mm}
					</span>
				</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each times as time, index }
				<TableBodyRow class={index % 2 == 0 ? 'border-b' : 'border-b-2'}>
					<TableBodyCell class="py-1 px-1.5">{time}</TableBodyCell>
					{#each weekDays as day }
						<TableBodyCell class="py-1 border-l dark:border-gray-700 truncate">
							<span title={getItem(day.value, time)}>{getItem(day.value, time)}</span>
						</TableBodyCell>
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
