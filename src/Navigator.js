import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CarRegister from "./screens/CarRegister";
import CarsList from "./screens/CarsList";

import { FontAwesome as Icon } from "@expo/vector-icons";

const Stack = createStackNavigator();

const RootStackNav = () => {
    return (
        <Stack.Navigator initialRouteName="">
            <Stack.Screen
                name="CarList"
                component={CarsList}
                options={{ title: "Lista de Carros", headerShown: false }}
            />
            <Stack.Screen
                name="CarRegister"
                component={CarRegister}
                options={{ title: "Registro de Carro" }}
            />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <RootStackNav />
        </NavigationContainer>
    );
};

export default MainNavigator;
