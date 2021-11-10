import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FavoritesEmptyState from "./FavoritesEmptyState";
import colors from "../../res/colors";
import Storage from "../../libs/storage";
import CoinsItem from "../coins/CoinsItem";
const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getFavorites();
        });
        return unsubscribe;
    }, [navigation]);

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();

            const keys = allKeys.filter(
                (val) => val.includes("favorite-") && !val.includes("undefined")
            );

            const favs = await Storage.instance.getAll(keys);

            const favsArr = favs.map((favs) => JSON.parse(favs[1]));

            const favsObj = favsArr.map((favs) => favs.coin);

            setFavorites(favsObj);

            console.log("All favs ", favs);
            console.log("All favs objects: ", favsObj);
            // console.log("Test 1: ", favsObj[0]);
            // console.log("Test 2: ", favsObj[0].coin);
            // console.log("Test 3: ", favsObj[0].coin.id);
            // console.log("Test 4: ", favsObj[0].id);
        } catch (err) {
            console.log("get favorites error", err);
        }
    };

    const handlePress = (coin) => {
        console.log("coin: ", coin);
        navigation.navigate("CoinDetail", { coin });
    };
    return (
        <View style={styles.container}>
            {favorites.length == 0 ? (
                <FavoritesEmptyState />
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CoinsItem
                            item={item}
                            pressEvent={() => handlePress(item)}
                        />
                    )}
                />
            )}

            {/* <Text>Favorites Screen</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1,
    },
});

export default FavoritesScreen;
