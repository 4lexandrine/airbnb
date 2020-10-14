import React from "react";
import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AppLayout = ({ children }) => {
    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            {children}
        </KeyboardAwareScrollView>

    );
}

export default AppLayout;

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height - StatusBar.currentHeight,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
    }
})