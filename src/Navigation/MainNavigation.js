import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import RootStack from './RootStack';
import SplashScreen from 'react-native-splash-screen';
import { Variables, useAuth, useUser } from '../Context/UserContext';
import { GET_ASYNC_DATA } from '../Async';

const MainNavigation = () => {
  const { isAuth, updateIsAuth } = useAuth();
  const { updateUserData } = useUser();

  const getAsyncData = async () => {
    await GET_ASYNC_DATA(Variables?.USER).then(data => {
      if (data) {
        let dta = JSON.parse(data)
        updateUserData(dta);
        updateIsAuth(true);
        console.log(dta, '==-------Data--------');
      } else {
        updateIsAuth(false);
        updateUserData({})
      }
    })
  }

  useEffect(() => {
    getAsyncData();
  }, [isAuth]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000);
  }, [isAuth]);

  return (
    <NavigationContainer onReady={() => SplashScreen.hide()}>
      {isAuth ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;
