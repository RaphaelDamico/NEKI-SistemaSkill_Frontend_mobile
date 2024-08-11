import PublicStack from "./PublicStackNavigation";
import PrivateStack from "./PrivateStackNavigation";
import { useAuthUser } from "../contexts/AuthUserContext";

const Routes = () => {
    const { signed } = useAuthUser()


    return <>{signed ?  <PrivateStack /> : <PublicStack />}</>;
};

export default Routes;