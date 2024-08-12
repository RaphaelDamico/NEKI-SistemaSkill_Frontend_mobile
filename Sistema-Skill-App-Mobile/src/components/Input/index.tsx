import { useState } from "react";
import { styles } from "./styles";
import { Text, TextInput, View } from "react-native";
import { InputProps } from "../../interfaces";
import Icon from "../Icon";

export default function Input({ label, type, value, onChangeText, placeholder, id, hasIcon }: InputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <View style={styles.inputContainer}>
            <Text nativeID={id} style={styles.label}>{label}</Text>
            <TextInput
                secureTextEntry={type === "password" && !showPassword}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.input}
                accessibilityLabelledBy={id}
            />
            {hasIcon &&
                <>
                    <Icon
                        name={showPassword ? "viewOpen" : "eyeClosed"}
                        style={styles.viewIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                </>
            }
        </View>
    );
};