import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import Http from "../../libs/http";
import CoinsItem from "./CoinsItem";
import colors from "../../res/colors";
import { CoinSearch } from "./coinSearch";

function CoinsScreen({ navigation }) {
    const [data, setData] = useState({});
    const [allCoins, setAllCoins] = useState({});
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        let coins = await Http.instance.get(
            "https://api.coinlore.net/api/tickers/"
        );
        setData(coins.data);
        setAllCoins(coins.data);
        setLoading(false);
        console.log("coins", coins);
    };

    useEffect(() => {
        getData();
    }, []);

    const handlePress = (coin) => {
        console.log("pasa por aqui");
        navigation.navigate("CoinDetail", { coin });
    };

    const handleSearch = (value) => {
        let filtered = allCoins.filter((coin) => {
            return (
                coin.name.toLowerCase().includes(value.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(value.toLowerCase())
            );
        });

        setData(filtered);
    };

    return (
        <View style={styles.container}>
            <CoinSearch onChange={handleSearch} />
            {loading === true ? (
                <ActivityIndicator
                    style={styles.loading}
                    size="large"
                    animating={loading}
                />
            ) : null}

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CoinsItem
                        item={item}
                        pressEvent={() => handlePress(item)}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade,
    },
    titleText: {
        color: "white",
        textAlign: "center",
    },
    btn: {
        padding: 8,
        backgroundColor: "lightblue",
        borderRadius: 8,
        margin: 12,
    },
    btnText: {
        color: "white",
        textAlign: "center",
    },
    loading: {
        marginTop: 60,
    },
});

export default CoinsScreen;
