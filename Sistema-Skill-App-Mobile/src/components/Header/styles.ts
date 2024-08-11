import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        height: "20%",
        justifyContent: "space-evenly"

    },
    wellcomeAndLogoutContent: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "3%",
        gap: 10
    },

    listSkillsAndAddButtonContent: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "3%",
    },
    wellcomeText: {
        color: "#356F7A",
        fontWeight: "500",
        fontSize: 20
    },
    listSkillsText: {
        color: "#356F7A",
        fontWeight: "500",
        fontSize: 25
    },
});