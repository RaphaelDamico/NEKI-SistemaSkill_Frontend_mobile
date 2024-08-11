import { useState } from "react";
import { UserSkill } from "../../interfaces";
import { styles } from "./styles";
import { updateUserSkillLevel } from "../../api";
import { Alert, Image, Text, View } from "react-native";
import Button from "../Button";
import Icon from "../Icon";
import StarRating from "../StarRating";

interface CardProps {
    userSkill: UserSkill;
    deleteSkill: (userId: number) => void;
    refreshSkills: () => void;
}

export default function Card({ userSkill, deleteSkill, refreshSkills }: CardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [level, setLevel] = useState(userSkill.level);

    const handleRatingChange = (newRating: number) => {
        setLevel(newRating);
    };

    const handleSave = async () => {
        if (level !== undefined) {
            await updateUserSkillLevel({ userSkillId: userSkill.userSkillId, level });
            setIsEditing(false);
            refreshSkills();
            Alert.alert("Level da skill atualizado")
        }
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.buttonContainer}>
                <Button
                    content={
                        <Icon
                            name={"edit"}
                            color="#356F7A"
                            size={20}
                        />
                    }
                    onPress={() => setIsEditing(!isEditing)}
                />
                <Button
                    content={
                        <Icon
                            name={"trash"}
                            color="red"
                            size={20}
                        />
                    }
                    onPress={() => deleteSkill(userSkill.userSkillId)}
                />
            </View>
            <View style={styles.cardContent}>
                <View style={{padding: 10, borderRadius: 50,backgroundColor: 'white', elevation: 10}}>
                    <Image
                        source={{ uri: userSkill.skill.image }}
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        accessibilityLabel="Logo da skill"
                    />
                </View>
                <View style={styles.infoContent}>
                    <Text style={styles.title}>{userSkill.skill.skillName}</Text>
                    <StarRating rating={level || 1} onRatingChange={handleRatingChange} isEditing={isEditing} onSave={handleSave} />
                    <Text style={styles.description}> {userSkill.skill.description}</Text>
                </View>
            </View>
        </View>
    );
}