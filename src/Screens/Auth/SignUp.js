import {
  Image,
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
import { COLORS, FONTS, IMAGES } from '../../Assets';
import Button from '../../Components/Button';
import { emailRegex, isValidForm } from '../../Constants';
import { Variables, useAuth, useUser } from '../../Context/UserContext';
import { SET_ASYNC_DATA } from '../../Async';

const SignUp = ({ navigation }) => {
  const { updateIsAuth } = useAuth();
  const { updateUserData } = useUser();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handlePress = async () => {
    let error = {
      name: !name ? 'First name is invalid' : '',
      email: !emailRegex.test(email) ? 'Email is invalid' : '',
      password: !password ? 'Password is required' : '',
      confirmPassword: !confirmPassword ? 'Confirm password is required' : '',
    };
    setErrors(error);
    if (password != confirmPassword) {
      setErrors({
        ...error,
        confirmPassword: "Password or Confirm password didn't match",
      })
    }
    if (isValidForm(error)) {
      ToastAndroid.show('SignUp successfully', ToastAndroid.SHORT);
      await SET_ASYNC_DATA(Variables.USER, { data: { name: name, email: email } });
      updateUserData( { name: name, email: email })
      updateIsAuth(true)
    }
  };

  const handleBack = () => navigation?.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.backView}>
          <Pressable onPress={handleBack}>
            <Image
              resizeMode={'contain'}
              source={IMAGES.back}
              style={styles.backIcon}
            />
          </Pressable>
          <Text style={styles.welcomeText}>SignUp</Text>
        </View>

        <View style={styles.section}>
          <InputBox
            title={'Name'}
            value={name}
            onChangeText={e => {
              setname(e);
              setErrors({ ...errors, name: '' });
            }}
            placeholder={'Enter Name'}
            error={errors?.name}
          />

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
          <InputBox
            title={'Confirm Password'}
            value={confirmPassword}
            onChangeText={e => {
              setconfirmPassword(e);
              setErrors({ ...errors, confirmPassword: '' });
            }}
            placeholder={'Enter Confirm Password'}
            error={errors?.confirmPassword}
            secure
          />

          <Button
            title={'SignUp'}
            onPress={handlePress}
            style={styles.button}
          />
        </View>
        <View>
          <Pressable
            style={styles.accountSection}
            onPress={() => navigation?.navigate('Login')}>
            <Text style={styles.notHaveAccount}>Already have an account?</Text>
            <Text style={styles.createAccount}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

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
  backIcon: {
    height: 16,
    width: 16,
    marginRight: 15,
  },
  backView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
