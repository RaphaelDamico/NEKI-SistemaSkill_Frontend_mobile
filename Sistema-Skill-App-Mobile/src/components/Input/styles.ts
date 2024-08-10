import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        height: 70,
        justifyContent: "space-between",
    },
    label: {
        fontWeight: "500",
        fontSize: 16,
        color: "#356F7A",
        paddingHorizontal: "8%"

    },
    input: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 50,
        padding: 8,
        backgroundColor: "#D3D3D3",
        elevation: 5,
    },
    viewIcon: {
        position: "relative",
        left: "85%",
        bottom: "35%",
    }
});