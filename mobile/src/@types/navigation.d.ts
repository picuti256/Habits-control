// Aqui definimos a tipagem das rotas de navegação

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            new: undefined;
            habit: {
                date: string;
            }
        }
    }
}