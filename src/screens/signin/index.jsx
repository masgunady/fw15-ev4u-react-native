import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Button, Input, Alert} from '../../components/elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {asyncLogin} from '../../redux/actions/auth';
import {clearMessage} from '../../redux/reducers/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SplashScreen from 'react-native-splash-screen';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter the valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);
  React.useState(() => {
    SplashScreen.hide();
  }, []);
  const doLogin = values => {
    dispatch(asyncLogin(values));
  };
  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  }
  return (
    <ScrollView style={style.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Icon name="arrow-left" size={25} color="#373A42" />
      </TouchableOpacity>
      <View style={{marginBottom: 30}} />

      <View>
        <View style={style.wrappTitle}>
          <Text style={style.textLogin}>Log In</Text>
          <Text style={style.textSubLogin}>
            Hi, Welcome back to Urticket ..
          </Text>
          {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={doLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={style.formInput}>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={style.errorsText}>{errors.email}</Text>
              )}
              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Enter your password"
                password
              />
              {errors.password && touched.password && (
                <Text style={style.errorsText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={style.forgotPassText}>Forgot Password ?</Text>
              </TouchableOpacity>
              <Button
                disabled={!touched.email && !touched.password}
                onPress={handleSubmit}
                btnTitle="Login"
              />
            </View>
          )}
        </Formik>
        <View style={{marginBottom: 15}} />
        <View style={style.sectionToSignup}>
          <Text style={style.textSubLogin}>Don't have account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={style.textSubLoginBtn}> Sign Up here</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 25}} />
        <Text style={style.textAlternativeLogin}>or sign with</Text>
        <View style={{marginBottom: 25}} />
        <View style={style.wrapAlternativeLogin}>
          <View style={style.contentAlternativeLogin}>
            <Icon name="google" size={25} color="grey" />
          </View>
          <View style={style.contentAlternativeLogin}>
            <Icon name="facebook" size={25} color="blue" />
          </View>
          <View style={style.contentAlternativeLogin}>
            <Icon name="fingerprint" size={25} color="#373A42" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  wrappTitle: {
    width: '100%',
    gap: 20,
    marginBottom: 25,
  },
  textLogin: {
    color: '#373A42',
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
  },
  sectionToSignup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSubLogin: {
    color: '#373A42',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.5,
  },
  textSubLoginBtn: {
    color: '#4c3f91',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
  },
  formInput: {
    gap: 15,
  },
  forgotPassText: {
    alignSelf: 'flex-end',
    fontFamily: 'Poppins-SemiBold',
    color: '#4c3f91',
    letterSpacing: 0.5,
  },
  textAlternativeLogin: {
    textAlign: 'center',
    color: '#373A42',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.5,
  },
  wrapAlternativeLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  contentAlternativeLogin: {
    width: 95,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#373A42',
    borderRadius: 5,
  },
  errorsText: {
    color: '#FF9191',
  },
});

export default SignIn;
