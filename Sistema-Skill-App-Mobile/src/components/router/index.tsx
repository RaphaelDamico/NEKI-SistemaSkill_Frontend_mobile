import AsyncStorage from "@react-native-async-storage/async-storage";
import PublicStack from "./PublicStackNavigation";
import PrivateStack from "./PrivateStackNavigation";

export default function Routes() {
    const token = AsyncStorage.getItem("userToken");

    return <>{!token ? <PublicStack /> : <PrivateStack />}</>;
};