import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        top: "45%",
        left: "23%",
        transform: [{ translateX: -0.5 * (80 + 20) }, { translateY: -0.5 * (30 + 8) }],
        backgroundColor: "#F9F9F9",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 10,
        zIndex: 1000,
        width: "80%",
        height: "20%",  // A altura foi ajustada para se adequar ao conteúdo
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        zIndex: 999,
    },
    modalHeader: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    }
});