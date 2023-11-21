import { StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomScreenNavigator from './BottomScreenNavigator';
import ProductDetails from '../Screens/ProductDetails';
import Cart from '../Screens/Cart';

const AppNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='BottomTabs'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='BottomTabs' component={BottomScreenNavigator}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator