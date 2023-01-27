import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";

interface HabitsProps {
	date: Date;
	completed?: number;
	amount?: number;
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitsProps) {
	const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

	//Pegar as datas dos dias respectivos e já formatar para dia/mês
	const dayAndMonth = dayjs(date).format("DD/MM");
	const dayOfWeek = dayjs(date).format("dddd");

	//Aqui criamos a função para "olhar" quantos hábitos estão completos e passar essa informação a nossa progress bar
	function handleCompletedChange(completed: number){
		console.log(completed)
	}

	return (
		<Popover.Root>
			{/* Cores do Popover com base na porcentagem completa */}
			<Popover.Trigger
				className={clsx("w-10 h-10  border-2  rounded-lg", {
					"bg-zinc-900 border-zinc-800": completedPercentage === 0,
					"bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
					"bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
					"bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
					"bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
					"bg-violet-500 border-violet-400": completedPercentage >= 80,
				})}
			/>

			{/* Popover Utilizando Radix */}
			<Popover.Portal>
				<Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
					<span className="font-semibold text-zinc-400">{dayOfWeek}</span>
					<span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

					{/* Barra de Progresso */}
					<ProgressBar progress={completedPercentage} />

					{/* Aqui no habitList é criado uma propriedade onde passamos a função para olhar quantos hábitos foram criados. */}
					<HabitsList date={date} onCompletedChanged={handleCompletedChange} />

					<Popover.Arrow height={8} width={16} className="fill-zinc-800" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
