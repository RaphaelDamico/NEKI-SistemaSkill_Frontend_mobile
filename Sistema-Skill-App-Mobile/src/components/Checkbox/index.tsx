import React from "react";
import { Text, View, Pressable } from "react-native";
import Icon from "../Icon";
import { styles } from "./styles";
import { CustomCheckboxProps } from "../../interfaces";

export default function CustomCheckbox({ value, onValueChange, label, id }: CustomCheckboxProps) {
    return (
        <View style={styles.checkboxContainer}>
            <Pressable onPress={() => onValueChange(!value)} style={[styles.checkbox, value && styles.checked]}>
            {value && <Icon name={"check"} color="blue" size={15} />}
        </Pressable>
            <Text nativeID={id} style={styles.checkboxLabel}>
            {label}
        </Text>
        </View>
    );
}
