import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "../../interfaces";
import { styles } from "./styles";

export default function ButtonComponent({ content, onPress, style }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonContent}>{content}</Text>
        </TouchableOpacity>
    );
};