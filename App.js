/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
//import type Node from 'react';
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CoinsStack from "./src/components/coins/CoinsStack";
import { FavoritesStack } from "./src/components/favorites/favoritesStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./src/res/colors";

const Tabs = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                screenOptions={{
                    tabBarStyle: { backgroundColor: colors.blackPearl },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="Coins"
                    component={CoinsStack}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Image
                                style={{
                                    tintColor: color,
                                    width: size,
                                    height: size,
                                }}
                                source={require("./src/assets/bank.png")}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Favorites"
                    component={FavoritesStack}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Image
                                style={{
                                    tintColor: color,
                                    width: size,
                                    height: size,
                                }}
                                source={require("./src/assets/star.png")}
                            />
                        ),
                    }}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

export default App;
