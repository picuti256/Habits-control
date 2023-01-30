import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitsListProps {
	date: Date;
	//Aqui passamos a função criada na nossa progress bar, avisando o TS que é uma função de retorno vazio
	onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
	possibleHabits: Array<{
		id: string;
		title: string;
		created_at: string;
	}>;
	completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
	const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

	//Aqui é a chamada da API para retornar os hábitos do dia e os hábitos completos.
	useEffect(() => {
		api
			.get("day", {
				params: {
					date: date.toISOString(),
				},
			})
			.then((response) => {
				setHabitsInfo(response.data);
			});
	}, []);

	//Função de chamada da API para marcar o toggle
	async function handleToggleHabit(habitId: string) {
		//Verifica se o habit já foi completo
		const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

		await api.patch(`/habits/${habitId}/toggle`);

		let completedHabits: string[] = [];

		if (isHabitAlreadyCompleted) {
			//Aqui "removemos" o toggle da lista
			completedHabits = habitsInfo!.completedHabits.filter((id) => id !== habitId);
		} else {
			//Adiciona na lista
			completedHabits = [...habitsInfo!.completedHabits, habitId];
		}

		setHabitsInfo({
			possibleHabits: habitsInfo!.possibleHabits,
			completedHabits,
		});

		//Aqui chamamos a função no toggle, que é onde recebe as informações de quantos hábitos foram completos no dia e enviando essa informação a nossa progress bar
		onCompletedChanged(completedHabits.length);
	}

	const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());
	return (
		<div className="mt-6 flex flex-col gap-3">
			{/* Fazemos um map, percorrendo todos os hábitos e retornando o checkbox montado. */}
			{habitsInfo?.possibleHabits.map((habit) => {
				return (
					<Checkbox.Root key={habit.id} onCheckedChange={() => handleToggleHabit(habit.id)} checked={habitsInfo.completedHabits.includes(habit.id)} disabled={isDateInPast} className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed">
						
						<div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800  group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
							<Checkbox.Indicator>
								<Check size={20} className="text-white" />
							</Checkbox.Indicator>
						</div>
						<span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">{habit.title}</span>
					</Checkbox.Root>
				);
			})}
		</div>
	);
}
