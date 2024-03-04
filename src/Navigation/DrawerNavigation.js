import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';


const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: '70%',
                    backgroundColor: 'transparent',
                },
                swipeEdgeWidth: 0,
                drawerType: 'front',
            }}
            drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen
                name="BottomTab"
                getComponent={() => require('./BottomTab').default}
                options={{
                    headerShown: false,
                    title: 'Home',
                }}
            />
        </Drawer.Navigator>
    );
}



