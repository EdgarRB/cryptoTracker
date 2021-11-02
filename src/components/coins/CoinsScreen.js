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

function CoinsScreen({ navigation }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        let coins = await Http.instance.get(
            "https://api.coinlore.net/api/tickers/"
        );
        setData(coins.data);
        setLoading(false);
        console.log("coins", coins);
    };

    useEffect(() => {
        getData();
    }, []);

    const handlePress = () => {
        console.log("go to detail");
        navigation.navigate("CoinDetail");
    };

    return (
        <View style={styles.container}>
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
                    <CoinsItem item={item} />
                    // <View>
                    //     <Text>{item.name}</Text>
                    //     <Text>{item.symbol}</Text>
                    //     {/* <Text>{item.name}</Text> */}
                    // </View>
                )}
            />
            {/* <Text style={styles.titleText}>Coins Screen</Text>
            <Pressable onPress={handlePress} style={styles.btn}>
                <Text style={styles.btnText}>Ir a detail</Text>
            </Pressable> */}
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
