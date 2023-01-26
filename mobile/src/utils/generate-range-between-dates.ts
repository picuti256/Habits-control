import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  // Pega a data do inicio do ano.
  const firstDayOfTheYear = dayjs().startOf("year");

  // Pega a data atual
  const today = new Date();

  const dates = [];
  let compareDate = firstDayOfTheYear;

  // While para comparar as datas
  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}
