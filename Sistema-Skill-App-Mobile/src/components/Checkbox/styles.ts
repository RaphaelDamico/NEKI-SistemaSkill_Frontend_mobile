import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    checkboxContainer: {
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        backgroundColor: "#FFF",
    },
    checkboxLabel: {
        fontSize: 15,
        fontWeight: "500",
        color: "#356F7A",
    }
});