import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"


export async function appRoutes(app: FastifyInstance) {
    app.post('/habits', async (req) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })

        const { title, weekDays} = createHabitBody.parse(req.body);
        
        const today = dayjs().startOf('day').toDate();

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (req) => {
        const getDayParams = z.object({
            //Utilizamos a função do zod para realizar essa transformação da data do front
            date: z.coerce.date()
        })

        
        //Pega a informação da query params e transforma em date
        const { date } = getDayParams.parse(req.query)
        
        const parsedDate = dayjs(date).startOf('day')
        //Busca o dia da semana
        const weekDay = parsedDate.get('day')


        //Faz a chamada ao banco de dados para buscar os habitos do dia
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    //Busca habitos criados até a data
                    lte: date,
                },
                //Aqui é realizado um join para buscar habitos apenas naquele dia da semana
                weekDays: {
                    some: {
                        week_day:weekDay
                    }
                }
            }
        })


        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            },
            include: {
                dayHabits: true,
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits
        }
    })
}
