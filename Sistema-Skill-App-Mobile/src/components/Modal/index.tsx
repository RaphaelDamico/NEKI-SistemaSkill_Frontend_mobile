import { useEffect, useState } from "react";
import { ModalProps, Skill, UserSkillRequest } from "../../interfaces";
import { addSkillToUser, getAllSkills } from "../../api";
import { styles } from "./styles";
import { FlatList, Text, View } from "react-native";
import Button from "../Button";
import CardModal from "../CardModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Modal({ isVisibleModal, onCancel, onSave, userSkills }: ModalProps) {
    const [skillsList, setSkillsList] = useState<Skill[] | null>();

    useEffect(() => {
        const getSkillsList = async () => {
            try {
                const data = await getAllSkills();
                const filteredSkills = data?.filter(skill =>
                    !userSkills.some(userSkill => userSkill.skill.skillId === skill.skillId)
                );
                setSkillsList(filteredSkills);
            } catch (error) {
                console.error();
            }
        };
        getSkillsList();
    }, [userSkills]);

    const handleChange = (skill: Skill) => {
        const teste = skillsList?.map((item) => {
            if (item.skillId === skill.skillId) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            return item;
        });
        setSkillsList(teste || []);
    };

    const handleSave = async () => {
        try {
            const userIdString = await AsyncStorage.getItem("userId");
            const userId = userIdString ? parseInt(userIdString, 10) : null;
            if (!userId)
                throw new Error("User ID não encontrado");
            await addSkillToUser(skillsList?.filter((item) => {
                return item.checked === true;
            }).map((item) => ({
                skillId: item.skillId,
                userId: userId
            }) as UserSkillRequest) || []);
            onSave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isVisibleModal &&
                <>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headerTitle}>Selecionar Skill</Text>
                        </View>
                        <View style={styles.modalContent}>
                            <FlatList
                                contentContainerStyle={{ gap: 5 }}
                                style={{ maxHeight: 100, bottom: 10 }}
                                data={skillsList}
                                keyExtractor={(item) => item.skillId.toString()}
                                renderItem={({ item }) => (
                                    <CardModal
                                        key={item.skillId}
                                        skill={item}
                                        onValueChange={() => handleChange(item)}
                                    />
                                )}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                content={"Cancelar"}
                                style={{ backgroundColor: "#D9534F", width: 100 }}
                                onPress={() => onCancel()}
                            />
                            <Button
                                content={"Salvar"}
                                style={{ backgroundColor: "#356F7A", width: 100 }}
                                onPress={() => handleSave()}
                            />
                        </View>
                    </View>
                </>
            }
        </>
    );
};