import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    content: {
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        gap: 20,
    },
    textContainer: {
    },
    title: {
        fontFamily: "Poppins-MediumItalic",
        fontSize: 50,
        fontWeight: "500",
        color: "#F9F9F9",
    },
    subTitle: {
        fontSize: 25,
        textAlign: "center",
        color: "#F9F9F9",
        fontWeight: "300"
    }
});