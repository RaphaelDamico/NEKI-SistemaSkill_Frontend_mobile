import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Skill } from "../../interfaces";
import { styles } from "./styles";
import CustomCheckbox from "../Checkbox";

interface CardModalProps {
    skill: Skill;
    onValueChange: () => void;
};

export default function CardModal({ skill, onValueChange }: CardModalProps) {
    return (
        <View style={styles.cardModalContainer}>
            <Pressable style= {styles.cardModalContainer} onPress={onValueChange}>
            <View style={styles.cardModalContent}>
                <Text style={{color: "#F9F9F9", fontWeight: "600", fontSize: 20}}>{skill.skillName}</Text>
                <View>
                <CustomCheckbox value={skill.checked || false} onValueChange={onValueChange}  />
                </View>
            </View>
        </Pressable>
        </View>
    );
}