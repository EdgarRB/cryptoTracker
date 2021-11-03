import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
    Image,
} from "react-native";
import colors from "../../res/colors";

const CoinsItem = (props) => {
    const getImageArrow = () => {
        if (props.item.percent_change_1h > 0) {
            return require("../../assets/arrow_up.png");
        } else {
            return require("../../assets/arrow_down.png");
        }
    };

    return (
        <Pressable onPress={props.pressEvent} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{props.item.symbol}</Text>
                <Text style={styles.nameText}>{props.item.name}</Text>
                <Text
                    style={styles.nameText}
                >{`$ ${props.item.price_usd} `}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>
                    {props.item.percent_change_1h}
                </Text>
                <Image style={styles.imgIcon} source={getImageArrow()} />
                {/* <Text style={styles.nameText}>{props.item.name}</Text> */}
            </View>

            {/* <Text>{item.name}</Text> */}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        borderBottomColor: colors.zircon,
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: "row",
    },
    symbolText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12,
    },
    nameText: {
        color: "white",
        fontSize: 14,
        marginRight: 12,
    },
    percentText: {
        color: "white",
        fontSize: 12,
        marginRight: 8,
    },
    priceText: {
        color: "white",
        fontSize: 14,
    },
    imgIcon: {
        width: 22,
        height: 22,
    },
});

export default CoinsItem;
