import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../Components/InputBox';
import { COLORS, FONTS } from '../../Assets';
import Button from '../../Components/Button';
import { BOOK_DATA, emailRegex, isValidForm } from '../../Constants';
import { useDispatch } from 'react-redux';
import { GET_ASYNC_DATA, SET_ASYNC_DATA } from '../../Async';
import { Variables, useAuth, useUser } from '../../Context/UserContext';

const Login = ({ navigation }) => {
  const { updateIsAuth } = useAuth();
  const { updateUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handlePress = async () => {
    let error = {
      email: !emailRegex.test(email) ? 'Email is invalid' : '',
      password: !password ? 'Password is required' : '',
    };
    setErrors(error);

    if (isValidForm(error)) {
      ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
      await SET_ASYNC_DATA(Variables.USER, { data: { email: email } });
      updateIsAuth(true)
      updateUserData({ email: email })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.welcomeText}>Login to Test App</Text>
        <View style={styles.section}>
          <InputBox
            title={'Email'}
            value={email}
            onChangeText={e => {
              setEmail(e);
              setErrors({ ...errors, email: '' });
            }}
            placeholder={'Enter Email'}
            keyboardType={'email-address'}
            error={errors?.email}
          />

          <InputBox
            title={'Password'}
            value={password}
            onChangeText={e => {
              setPassword(e);
              setErrors({ ...errors, password: '' });
            }}
            placeholder={'Enter Password'}
            error={errors?.password}
            secure
          />

          <Button title={'Login'} onPress={handlePress} style={styles.button} />
        </View>
        <View>
          <Pressable
            style={styles.accountSection}
            onPress={() => navigation?.navigate('SignUp')}>
            <Text style={styles.notHaveAccount}>Not have an account?</Text>
            <Text style={styles.createAccount}>SignUp</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  welcomeText: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 18,
  },
  section: {
    marginTop: '20%',
  },
  button: {
    marginTop: 20,
  },
  accountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  notHaveAccount: {
    color: COLORS.black,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  createAccount: {
    color: COLORS.blue,
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginLeft: 5,
  },
});
