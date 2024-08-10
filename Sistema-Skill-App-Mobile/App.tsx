import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { AuthUserProvider } from './src/contexts/AuthUserContext';
import RegisterScreen from './src/screens/RegisterScreen';
import { RegisterUserProvider } from './src/contexts/RegisterUserContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RegisterUserProvider>
        <AuthUserProvider>
          <RegisterScreen />
        </AuthUserProvider>
      </RegisterUserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

