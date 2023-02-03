import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { generateDatesFromYearBeginning } from "../utils/generate-range-between-dates";
import { api } from "../lib/axios";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";

//Dias de dias da semana
const weekDay = ["D", "S", "T", "Q", "Q", "S", "S"];

//Verifica quantos dias já se passaram desde o inicio do ano
const datesFromYearsStart = generateDatesFromYearBeginning();

//Número de hábitos disponiveis
const minimumSummaryDatesSizes = 18 * 7;

//Quantos hábitos serão exibidos para "preencher" a tela
const amountOfDaysToFill =
  minimumSummaryDatesSizes - datesFromYearsStart.length;

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const { navigate } = useNavigation();

  // Aqui criamos a função que vai fazer a requisição da nossa API
  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");
      console.log(response.data);
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops...", "Não foi possível carregar o sumário de hábitos.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
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

      {/* Própriedade de scroll dentro do celular, foi colocado retirando o header, pois assim só irá mexer o Summary e temos uma "guia" com os dias */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearsStart.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                key={index}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
