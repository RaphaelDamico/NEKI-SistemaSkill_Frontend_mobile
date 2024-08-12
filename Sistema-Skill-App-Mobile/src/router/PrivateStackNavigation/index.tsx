import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
import { RootPrivateStackParamList } from '../../interfaces';

const Stack = createNativeStackNavigator<RootPrivateStackParamList>();

export default function PrivateStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};