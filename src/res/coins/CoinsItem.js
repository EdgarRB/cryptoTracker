import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

const CoinsItem = (props) => {
    return (
        <View>
            <Text>{props.item.name}</Text>
            <Text>{props.item.symbol}</Text>
            {/* <Text>{item.name}</Text> */}
        </View>
    );
};

export default CoinsItem;
