import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, IMAGES } from '../../Assets';
import { useUser } from '../../Context/UserContext';

const Profile = () => {
    const { userData } = useUser()
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                <Text style={styles.heading}>Profile</Text>
            </View>
            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                <Image source={IMAGES?.profile} style={{ height: 80, width: 80, margin: 5, color: COLORS.black }} />
                <Text style={styles.heading}>{userData?.name}</Text>
                <Text style={styles.heading}>{userData?.email}</Text>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        padding: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: FONTS.bold,
        color: COLORS.black
    },
    sunText: {
        fontSize: 15,
        fontWeight: FONTS.regular,
    },
});
