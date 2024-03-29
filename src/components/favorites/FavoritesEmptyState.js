import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FavoritesEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You don't have any favorite yet</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
});

export default FavoritesEmptyState;
