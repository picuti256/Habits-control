import { View, Text } from "react-native";

import { generateDatesFromYearBeginning } from "../utils/generate-range-between-dates";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";

const weekDay = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearsStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill =
  minimumSummaryDatesSizes - datesFromYearsStart.length;

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDay.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <View className="flex-row flex-wrap">
        {datesFromYearsStart.map((date) => (
          <HabitDay key={date.toISOString()} />
        ))}


        
      </View>
      
    </View>
  );
}
