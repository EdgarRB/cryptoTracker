import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SectionList } from "react-native";
import colors from "../../res/colors";

export const CoinDetailScreen = (props) => {
    const [coin, setcoin] = useState({});
    //const [sections, setSections] = useState([]);

    useEffect(() => {
        console.log("Datos de la moneda", props.route.params.coin);
        setcoin(props.route.params.coin);
        //getSections();
    }, [props]);

    useEffect(() => {
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

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <Image
                    style={styles.image}
                    source={{ uri: getSymbolIcon(coin.nameid) }}
                />

                <Text style={styles.titleText}>{coin.name}</Text>
            </View>
            <View>
                <SectionList
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
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 16,
        flexDirection: "row",
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
});
