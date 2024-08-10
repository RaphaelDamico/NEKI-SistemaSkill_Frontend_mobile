import { Text, ImageBackground, View } from "react-native";
import { styles } from "./styles";
import LoginForm from "../../components/LoginForm";
// import LoginForm from "../../components/LoginForm";

export default function LoginScreen() {

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/images/background.png")}
                style={styles.background}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>System Skills</Text>
                    <LoginForm />
                    <Text style={styles.subTitle}>Gerencie e desenvolva suas habilidades profissionais.</Text>
                </View>
            </ImageBackground>
        </View>
    )
};