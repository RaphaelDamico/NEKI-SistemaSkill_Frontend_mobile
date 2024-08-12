import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthUserProvider } from './src/contexts/AuthUserContext';
import { RegisterUserProvider } from './src/contexts/RegisterUserContext';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/router';

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
  };

  return (
    <View style={styles.container}>
      <RegisterUserProvider>
        <AuthUserProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </AuthUserProvider>
      </RegisterUserProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

