import { Text, View } from "react-native";
import Button from "../Button";
import { styles } from "./styles";

interface DeleteModalProps {
    isVisibleModal: boolean;
    onCancel: () => void;
    onDelete: () => void;
};

export default function DeleteModal({ isVisibleModal, onCancel, onDelete }: DeleteModalProps) {

    return (
        <>
            {isVisibleModal &&
                <>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text>Deseja realmente deletar a Skill?</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                content={"Cancelar"}
                                style={{backgroundColor: "#D9534F", width: 100}}
                                width={100}
                                onPress={() => onCancel()}
                            />
                            <Button
                                content={"Deletar"}
                                style={{backgroundColor: "#356F7A", width: 100}}
                                width={100}
                                onPress={() => onDelete()}
                            />
                        </View>
                    </View>
                </>
            }
        </>
    );
}