import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
	//Habitos(criar)
	app.post("/habits", async (req) => {
		const createHabitBody = z.object({
			title: z.string(),
			weekDays: z.array(z.number().min(0).max(6)),
		});

		const { title, weekDays } = createHabitBody.parse(req.body);

		const today = dayjs().startOf("day").toDate();

		await prisma.habit.create({
			data: {
				title,
				created_at: today,
				weekDays: {
					create: weekDays.map((weekDay) => {
						return {
							week_day: weekDay,
						};
					}),
				},
			},
		});
	});

	//Dia(Mostra os hábitos do dia)
	app.get("/day", async (req) => {
		const getDayParams = z.object({
			//Utilizamos a função do zod para realizar essa transformação da data do front
			date: z.coerce.date(),
		});

		//Pega a informação da query params e transforma em date
		const { date } = getDayParams.parse(req.query);

		const parsedDate = dayjs(date).startOf("day");
		//Busca o dia da semana
		const weekDay = parsedDate.get("day");

		//Faz a chamada ao banco de dados para buscar os habitos do dia
		const possibleHabits = await prisma.habit.findMany({
			where: {
				created_at: {
					//Busca habitos criados até a data.
					lte: date,
				},
				//Aqui é realizado um join para buscar habitos apenas naquele dia da semana
				weekDays: {
					some: {
						week_day: weekDay,
					},
				},
			},
		});

		const day = await prisma.day.findUnique({
			where: {
				date: parsedDate.toDate(),
			},
			include: {
				dayHabits: true,
			},
		});

		const completedHabits =
			day?.dayHabits.map((dayHabit) => {
				return dayHabit.habit_id;
			}) ?? [];

		return {
			possibleHabits,
			completedHabits,
		};
	});

	//Completar / não-completar um hábito
	app.patch("/habits/:id/toggle", async (req) => {
		//route param => parametro de identificação(: dentro de query)

		const toggleHabitParams = z.object({
			id: z.string().uuid(),
		});

		const { id } = toggleHabitParams.parse(req.params);

		const today = dayjs().startOf("day").toDate();

		//Verifica se existe um hábito no dia.
		let day = await prisma.day.findUnique({
			where: {
				date: today,
			},
		});

		//Caso não exista hábito no dia, o mesmo será criado
		if (!day) {
			day = await prisma.day.create({
				data: {
					date: today,
				},
			});
		}

		//Consulta tabela para verificar hábitos.
		const dayHabit = await prisma.dayHabit.findUnique({
			where: {
				day_id_habit_id: {
					day_id: day.id,
					habit_id: id,
				},
			},
		});

		//Faz a verificação se tem atividade concluída no dia para então realizar o toggle de concluído ou não concluído.
		if (dayHabit) {
			//remover a marcação de completo
			await prisma.dayHabit.delete({
				where: {
					id: dayHabit.id,
				},
			});
		} else {
			//Completar o habito no dia
			await prisma.dayHabit.create({
				data: {
					day_id: day.id,
					habit_id: id,
				},
			});
		}
	});

	//Mostra todos os hábitos
	app.get("/summary", async () => {
		const summary = await prisma.$queryRaw`
            SELECT 
                D.id, 
                D.date,
                (
                    SELECT 
                       cast(count(*) as float)
                    FROM day_habits DH
                    WHERE 
                        DH.day_id = D.id
                ) as completed,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H
                        ON H.id = HWD.habit_id
                    WHERE 
                        HWD.week_day = cast(strftime('%w',D.date/1000.0, 'unixepoch') as int)
                        AND H.created_at <= D.date
                ) as amount
            FROM day D
        `;

		return summary;
	});
}
