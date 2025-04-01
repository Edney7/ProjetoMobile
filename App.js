import React from "react";
import Routes from "./src/routes";

import { StatusBar } from "react-native";


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Main from './src/pages/main';
import Recipe from './src/pages/recipe'; // Importando a tela Recipe
const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar backgroundColor="black" />
//       <Routes />
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
        <StatusBar backgroundColor="black" />
        <Routes />
        <Stack.Screen name="Main" component={Main} options={{ title: 'Receitas' }} />
        <Stack.Screen name="Recipe" component={Recipe} options={{ title: 'Detalhes da Receita' }} />
    </NavigationContainer>
  );
}
