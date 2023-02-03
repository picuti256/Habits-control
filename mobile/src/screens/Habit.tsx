import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface Params {
  date: string;
}

export function Habits() {
  const route = useRoute();
  //   Aqui pegamos a data através da rota
  const { date } = route.params as Params;

  // Aqui fazemos a conversão da data que chegou como string para o modelo de data normal.
  const parsedDate = dayjs(date);

  // Aqui pegamos o dia da semana já formatado para portugues, tendo em vista a configuração incial que fizemos na pasta lib.
  const dayOfWeek = parsedDate.format("dddd");

  //Aqui pegamos o dia e mês formatados.
  const dayAndMonth = parsedDate.format("DD/MM");

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        {/* Dia da semana */}
        <Text className="mt-6 text-zinc-400 font-semibold text-base">
          {dayOfWeek}
        </Text>

        {/* Dia e mês */}
        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        {/* Barra de progresso */}
        <ProgressBar progress={30} />

        <View className="mt-6">
            <Checkbox 
            title="Beber 2L de água" 
            checked={false}
            />
            <Checkbox 
            title="Alongamento" 
            checked={true}
            />
        </View>
      </ScrollView>
    </View>
  );
}
