import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-range-days";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

// Chamada da função que verifica o dia que estamos para criar o número de quadrados até a data atual.
const summaryDates = generateDatesFromYearBeginning();

type Summary = Array<{
	id: string;
	date: string;
	amount: number;
	completed: number;
}>;

//Verificar o número de dias minimos para preenchimento da table.
const minimumSummaryDatesSize = 18 * 7; // 18 semanas
const amaountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
	const [summary, setSummary] = useState<Summary>([]);

	//Realizamos a chamada da API
	useEffect(() => {
		api.get("summary").then((response) => {
			setSummary(response.data);
		});
	}, []);

	return (
		// Aqui é feita a chamada do componente que irá criar a table com os quadrados da aplicação
		<div className="w-full flex ">
			<div className="grid grid-rows-7 grid-flow-row gap-3">
				{weekDays.map((weekDays, i) => {
					return (
						<div key={`${weekDays} ${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
							{weekDays}
						</div>
					);
				})}
			</div>

			<div className="grid grid-rows-7 grid-flow-col gap-3">
				{summary.length > 0 &&
					summaryDates.map((date) => {
						//Realizamos a validação para verificar se a data que recebe é a mesma da summary
						const dayInSummary = summary.find((day) => {
							//Aqui usamos dayjs para ficar mais fácil o tratamento de datas
							return dayjs(date).isSame(day.date, "day");
						});

						return <HabitDay date={date} amount={dayInSummary?.amount} defaultCompleted={dayInSummary?.completed} key={date.toString()} />;
					})}

				{/* Aqui é criado um fill para preencher um número de quadrados minimos da aplicação */}
				{amaountOfDaysToFill > 0 &&
					Array.from({ length: amaountOfDaysToFill }).map((_, i) => {
						return <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>;
					})}
			</div>
		</div>
	);
}
