import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

// Aqui criamos o componente de botão para voltar a página anterior
export function BackButton() {
    // Aqui pegamos a função goBack do useNavigation para fazer o retorno para página anterior.
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7}
        onPress={goBack}>
      <Feather name="arrow-left" size={32} color={colors.zinc[400]} />
    </TouchableOpacity>
  );
}
