import { View } from "react-native";

interface Props {
  progress?: number;
}

export function ProgressBar({ progress = 0 }: Props) {
  return (
    // Aqui criamos uma view com a cor de "fundo" da barra
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
        {/* E aqui criamos a cor que vai preenchendo conforme a barra de progresso for completada */}
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }} // Aqui é onde é definido o quanto a barra vai ser preenchida.
      />
    </View>
  );
}
