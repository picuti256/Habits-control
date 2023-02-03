// Aqui será criado a nossas rotas utilizando o react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Navigator para criar o escopo da nota e screen para onde será enviado cada rota.
const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import { New } from "../screens/New";
import { Habits } from "../screens/Habit";

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {/* Aqui é informado quando alguém acessar a rota com o nome "Home", irá rendenizar a tela home */}
      <Screen name="home" component={Home} />

      {/* Aqui é informado quando alguém acessar a rota com o nome "new", irá rendenizar a tela new */}
      <Screen name="new" component={New} />

      {/* Aqui é informado quando alguém acessar a rota com o nome "Habits", irá rendenizar a tela Habits */}
      <Screen name="habit" component={Habits} />
    </Navigator>
  );
}
