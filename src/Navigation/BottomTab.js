import { Image, Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, IMAGES } from '../Assets';
import Home from '../Screens/User/Home';
import Profile from '../Screens/User/Profile';
const Tab = createBottomTabNavigator();


const BottomTab = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: COLORS?.blue,
        tabBarInactiveTintColor: COLORS?.black,
        tabBarStyle: {
          backgroundColor: COLORS?.white,
          height: 60,
          paddingTop: Platform.OS == 'android' ? 5 : 10,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES?.home}
              style={{ width: 23, height: 23 }}
              resizeMode={'contain'}
              tintColor={focused ? COLORS?.blue : COLORS?.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES?.profile}
              style={{ width: 25, height: 25 }}
              resizeMode={'contain'}
              tintColor={focused ? COLORS?.blue : COLORS?.black}
            />
          ),
        }}
      />


    </Tab.Navigator>
  );
};
export default BottomTab;

const styles = StyleSheet.create({});
