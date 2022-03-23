import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import DetailMovie from '../screens/DetailMovie'
import Home from '../screens/Home'

const Stack = createStackNavigator();

export default function MainRoutes() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
      <Stack.Screen name='Main' component={Home}/>
      <Stack.Screen name='DetailMovie' component={DetailMovie} />
    </Stack.Navigator>
  )
}