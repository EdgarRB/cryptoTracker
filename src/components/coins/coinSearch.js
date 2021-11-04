import React, { useState } from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import colors from "../../res/colors";
export const CoinSearch = (props) => {
    const [query, setQuery] = useState("");

    const handleText = (value) => {
        setQuery(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    return (
        <View>
            <TextInput
                style={[
                    styles.textInput,
                    Platform.OS == "ios"
                        ? styles.textInputIOS
                        : styles.textInputAndroid,
                ]}
                onChangeText={handleText}
                value={query}
                placeholder="Search coin"
                placeholderTextColor="white"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: colors.charade,
        padding: 16,
        color: "white",
    },
    textInputAndroid: {
        borderWidth: 2,
        borderBottomColor: colors.zircon,
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8,
    },
});
