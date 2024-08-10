import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../../screens/LoginScreen';
import RegisterScreen from '../../../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function PublicStack() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    );
}