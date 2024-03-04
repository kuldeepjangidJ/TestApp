import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Variables, useAuth, useUser } from '../Context/UserContext';
import { COLORS, FONTS, IMAGES } from '../Assets';

const CustomDrawer = ({ navigation }) => {
  const { isAuth, updateIsAuth } = useAuth();
  const { userData, updateUserData } = useUser();



  const _logout = async () => {
    Alert.alert('Logout', 'Are you sure, you want to logout?', [
      {
        text: 'No',
        style: 'destructive',
      },
      {
        text: 'Yes',
        onPress: () => {
          onLogout()
        },
      },
    ]);
  };
  useEffect(() => {
    console.log('sasa', JSON.stringify(userData), isAuth);
  }, [userData, isAuth])

  const onLogout = async () => {
    await AsyncStorage.removeItem(Variables.USER);
    await AsyncStorage.removeItem(Variables.AUTH);
    updateIsAuth(false);
    updateUserData({});
    console.log('sasa', userData, isAuth);
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS?.white,
      }}>
      <View style={styles.profileContainer}>
        <Image source={IMAGES?.profile} style={{ height: 80, width: 80, margin: 5 }} />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: COLORS.black, fontFamily: FONTS.bold }}>
            {userData?.name}
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.black, fontFamily: FONTS.regular }}>
            {userData?.email}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={styles.drawerContainer}>
          <View style={styles.drawerContainer}>
            <Image source={IMAGES?.home} resizeMode={'contain'} style={{ height: 25, width: 25, marginRight: 10 }} tintColor={COLORS.black} />
            <Text style={{ fontSize: 14, color: COLORS.black, fontFamily: FONTS.regular }}>
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} style={styles.drawerContainer}>
          <View style={styles.drawerContainer}>
            <Image source={IMAGES?.profile} resizeMode={'contain'} style={{ height: 25, width: 25, marginRight: 10 }} tintColor={COLORS.black} />
            <Text style={{ fontSize: 14, color: COLORS.black, fontFamily: FONTS.regular }}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ paddingHorizontal: 10, marginVertical: 11, flexDirection: 'row' }} onPress={() => _logout()}>
        <Image source={IMAGES?.logout} resizeMode={'contain'} style={{ height: 25, width: 25, marginRight: 10 }} />
        <Text style={{ color: COLORS.black }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;


const styles = StyleSheet.create({
  drawerContainer: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center'
  },


  profileContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: COLORS?.blue,
    alignItems: "center",
  },
});
