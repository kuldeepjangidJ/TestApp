import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import Home from '../Screens/User/Home';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />

    </Stack.Navigator>
  );
};

export default AuthStack;
