import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    SectionList,
    FlatList,
    Pressable,
    Alert,
} from "react-native";
import colors from "../../res/colors";
import Http from "../../libs/http";
import { CoinMarketDetailScreen } from "./CoinMarketItem";
import Storage from "../../libs/storage";

export const CoinDetailScreen = (props) => {
    const [coin, setcoin] = useState({});
    const [markets, setMarkets] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        console.log("Datos de la moneda", props.route.params.coin);
        const coin = props.route.params.coin;
        setcoin(coin);
        getFavorite(coin);
        getMarkets(coin.id);
    }, [props]);

    useEffect(() => {
        debugger;

        props.navigation.setOptions({ title: coin.name });
    }, [coin]);

    const getSymbolIcon = (name) => {
        if (name) {
            return `https://c1.coinlore.com/img/25x25/${name}.png`;
        }
    };

    const getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd],
            },
            { title: "Volume 24h", data: [coin.volume24] },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h],
            },
        ];
        return sections;
        //setSections(sections);
    };

    const getMarkets = async (coinId) => {
        if (coinId) {
            let url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

            const markets = await Http.instance.get(url);
            setMarkets(markets);
        }
    };

    const toogleFavorite = () => {
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    };

    const addFavorite = async () => {
        debugger;
        const coinValue = JSON.stringify({ coin });
        const key = `favorite-${coin.id}`;
        // static instance = new Storage()

        const stored = await Storage.instance.add(key, coinValue);

        if (stored) {
            setIsFavorite(true);
        }
    };

    const removeFavorite = () => {
        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "remove",
                onPress: async () => {
                    const key = `favorite-${coin.id}`;
                    await Storage.instance.remove(key);

                    setIsFavorite(false);
                },
                style: "destructive",
            },
        ]);
    };

    const getFavorite = async (coin) => {
        const key = `favorite-${coin.id}`;
        try {
            const favStr = await Storage.instance.get(key);
            console.log("fav: ", favStr);

            if (favStr !== null) {
                setIsFavorite(true);
            }
        } catch (err) {
            console.log("get favorites error", err);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image
                        style={styles.image}
                        source={{ uri: getSymbolIcon(coin.nameid) }}
                    />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>

                <Pressable
                    onPress={toogleFavorite}
                    style={[
                        styles.bottonFav,
                        isFavorite
                            ? styles.bottonFavRemove
                            : styles.bottonFavAdd,
                    ]}
                >
                    <Text style={styles.bottonFavText}>
                        {isFavorite ? "Remove favorite" : "Add favorite"}{" "}
                    </Text>
                </Pressable>
            </View>
            <View>
                <SectionList
                    style={styles.section}
                    sections={getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>
                                {section.title}
                            </Text>
                        </View>
                    )}
                />
                <Text style={styles.marketTitle}>Markets</Text>
                <FlatList
                    style={styles.flatSection}
                    horizontal={true}
                    data={markets}
                    renderItem={({ item }) => (
                        <CoinMarketDetailScreen item={item} />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
    },
    container: {
        flex: 1,
        backgroundColor: colors.charade,
    },
    row: {
        flexDirection: "row",
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        marginLeft: 8,
    },
    sectionHeader: {
        backgroundColor: "rgba(0,0,0, 0.2)",
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        color: "white",
        fontSize: 14,
    },
    sectionText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    section: {
        maxHeight: 220,
    },
    flatSection: {
        height: 100,
        paddingLeft: 15,
    },
    marketTitle: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 14,
        marginLeft: 16,
        fontWeight: "bold",
    },
    bottonFav: {
        padding: 8,
        borderRadius: 8,
    },
    bottonFavAdd: {
        backgroundColor: colors.picton,
    },
    bottonFavRemove: {
        backgroundColor: colors.carmine,
    },
    bottonFavText: {
        color: colors.white,
        fontWeight: "bold",
    },
});
