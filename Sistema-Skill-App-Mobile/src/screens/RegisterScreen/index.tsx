import { Text, ImageBackground, View } from "react-native";
import { styles } from "./styles";
import RegisterForm from "../../components/RegisterForm";
import { NavigationProp } from "@react-navigation/native";
import { RootPublicStackParamList } from "../../interfaces";

export default function RegisterScreen({ navigation }: { navigation: NavigationProp<RootPublicStackParamList> }) {

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/images/background.png")}
                style={styles.background}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>System Skills</Text>
                    <RegisterForm navigation={navigation} />
                    <Text style={styles.subTitle}>Gerencie e desenvolva suas habilidades profissionais.</Text>
                </View>
            </ImageBackground>
        </View>
    )
};