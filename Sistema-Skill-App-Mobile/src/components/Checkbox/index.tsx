import { View, Text } from "react-native";
import { styles } from "./styles";
import { CheckboxProps } from "../../interfaces";
import Checkbox from 'expo-checkbox';

export default function CustomCheckbox({ label, value, onValueChange, id }: CheckboxProps) {
    return(
        <View style={styles.checkboxContainer}>
        <Checkbox
            value={value}
            onValueChange={onValueChange}
            accessibilityLabelledBy={id}
        />
        <Text nativeID={id} style={styles.checkboxLabel}>
            {label}
        </Text>
    </View>
    );
};