import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import MainRoutes from './src/routes/MainRoutes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  )
}