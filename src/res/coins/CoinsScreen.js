import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

function CoinsScreen({ navigation }) {
    const handlePress = () => {
        console.log("go to detail");
        navigation.navigate("CoinDetail");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Coins Screen</Text>
            <Pressable onPress={handlePress} style={styles.btn}>
                <Text style={styles.btnText}>Ir a detail</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "darkgray",
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
});

export default CoinsScreen;
