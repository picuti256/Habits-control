import { useState } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Criação do componente para criação de novo hábito.
export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  // Função para marcar e desmarcar o checkbox
  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      // Aqui adiciona o checked
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        {/* Input para o usuário digitar o hábito */}
        <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600" />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {/* Chamada do checkbox com um map dos dias*/}
        {availableWeekDays.map((weekDay, i) => (
          <Checkbox 
          title={weekDay} 
          key={weekDay} 
          onPress = {() => handleToggleWeekDay(i)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
