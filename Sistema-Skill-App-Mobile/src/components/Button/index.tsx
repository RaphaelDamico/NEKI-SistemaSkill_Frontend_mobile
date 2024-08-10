import { View, TouchableOpacity,Text  } from "react-native";
import { ButtonProps } from "../../interfaces";
import { styles } from "./styles";

export default function ButtonComponent({content, onPress, backgroundColor }: ButtonProps) {
    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: backgroundColor}]}>
                <Text style={styles.buttonContent}>{content}</Text>
            </TouchableOpacity>
        </View>
    );
};