import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    formContainer: {
        width: "80%",
        height: 360,
        backgroundColor: "#F9F9F9",
        borderRadius: 16,
        paddingVertical: 15,
        elevation: 10,
        flexGrow: 1,
    },
    formContent: {
        gap: 10,
    },
    errorContainer: {
        paddingHorizontal: 10,
    },
    errorSpan: {
        color: "red",
        fontSize: 14,
    },
});