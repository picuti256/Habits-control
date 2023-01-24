import { generateDatesFromYearBeginning } from "../utils/generate-range-days";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

// Chamada da função que verifica o dia que estamos para criar o número de quadrados até a data atual.
const summaryDates = generateDatesFromYearBeginning();

//Verificar o número de dias minimos para preenchimento da table.
const minimumSummaryDatesSize = 18 * 7; // 18 semanas
const amaountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
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
				{summaryDates.map((date) => {
					return <HabitDay amount={5} completed={Math.round(Math.random() * 5)} key={date.toString()} />;
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
