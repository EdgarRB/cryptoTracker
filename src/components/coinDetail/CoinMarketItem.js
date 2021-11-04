import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import colors from "../../res/colors";

export const CoinMarketDetailScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{props.item.name}</Text>
            <Text style={styles.priceText}>{props.item.price_usd}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: colors.zircon,
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
        alignItems: "center",
    },

    nameText: {
        color: "white",
        fontWeight: "bold",
    },
    priceText: { color: "white" },
});
