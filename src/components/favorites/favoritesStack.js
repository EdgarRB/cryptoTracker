import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import FavoritesScreen from "./favoritesScreen";
import colors from "../../res/colors";
const Stack = createStackNavigator();

import { CoinDetailScreen } from "../coinDetail/CoinDetailScreen";

export const FavoritesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blackPearl,
                    shadowColor: colors.blackPearl,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    textAlign: "center",
                },
            }}
        >
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
        </Stack.Navigator>
    );
};
