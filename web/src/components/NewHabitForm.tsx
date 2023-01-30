import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const avalaibleWeekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export function NewHabitForm() {
	const [title, setTitle] = useState("");
	const [weekDays, setWeekDays] = useState<number[]>([]);

	//Função para criação de novo hábito
	async function createNewHabit(e: FormEvent) {
		e.preventDefault();

		if (!title || weekDays.length === 0) {
			alert("Por favor, preencher um hábito e/ou selecionar ao menos um dia.");
		}

		await api.post("habits", {
			title,
			weekDays,
		});

		setTitle("");
		setWeekDays([]);

		alert("Hábito criado com sucesso!");
	}

	//Função para verificar se já existe um dia selecionado para a tarefa, e então irá adicionar ou retirar esse dia
	function handleToggleWeekDay(weekDay: number) {
		if (weekDays.includes(weekDay)) {
			const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);

			setWeekDays(weekDaysWithRemovedOne);
		} else {
			const weekDaysWithAddedOne = [...weekDays, weekDay];

			setWeekDays(weekDaysWithAddedOne);
		}
	}

	return (
		<form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
			<label htmlFor="title" className="font-semibold leading-tight">
				Qual o seu compromentimento?
			</label>

			<input type="text" id="title" className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900" placeholder="Ex: exercitar-se, dormir bem, etc..." autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />

			<label className="font-semibold leading-tight mt-4">Qual a recorrência?</label>

			<div className="flex flex-col gap-2 mt-3">
				{avalaibleWeekDays.map((weekDay, i) => {
					return (
						<Checkbox.Root key={weekDay} className="flex items-center gap-3 group focus:outline-none" checked={weekDays.includes(i)} onCheckedChange={() => handleToggleWeekDay(i)}>
							<div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800  group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
								<Checkbox.Indicator>
									<Check size={20} className="text-white" />
								</Checkbox.Indicator>
							</div>
							<span className=" text-white leading-tight">{weekDay}</span>
						</Checkbox.Root>
					);
				})}
			</div>

			<button type="submit" className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
				<Check size={20} weight="bold" />
				Confirmar
			</button>
		</form>
	);
}
