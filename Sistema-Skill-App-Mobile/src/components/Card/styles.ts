import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 16,
        alignSelf: "center",
        elevation: 10,
        width: "90%",
        marginBottom: 20,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
    },
    infoContent: {
        maxWidth: "80%",
        gap: 8
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#356F7A",
    },
    description: {
        fontWeight: "500",
        lineHeight: 18
    },
    buttonContainer: {
        width: "100%",
        justifyContent: "flex-end",
        flexDirection: "row",
        gap: 20
    }
});