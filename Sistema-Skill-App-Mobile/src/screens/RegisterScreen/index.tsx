import { Text, ImageBackground, View } from "react-native";
import { styles } from "./styles";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterScreen() {

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/images/background.png")}
                style={styles.background}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>System Skills</Text>
                    <RegisterForm />
                    <Text style={styles.subTitle}>Gerencie e desenvolva suas habilidades profissionais.</Text>
                </View>
            </ImageBackground>
        </View>
    )
};