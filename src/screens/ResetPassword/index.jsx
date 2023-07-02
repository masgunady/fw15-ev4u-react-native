import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Alert, Button, Input} from '../../components/elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import http from '../../helpers/http';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  code: Yup.number().required('Code is required').positive().integer(),
  email: Yup.string().required('Email is Required!').email('Email is invalid!'),
  password: Yup.string().required('Password is Required'),
  confirmPassword: Yup.string().required('Confirm Password is Required'),
});

const ResetPassword = ({navigation}) => {
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const doReset = async values => {
    try {
      const form = new URLSearchParams();
      form.append('code', values.code);
      form.append('email', values.email);
      form.append('password', values.password);
      form.append('confirmPassword', values.confirmPassword);
      const {data} = await http().post('/auth/resetPassword', form.toString());
      if (data?.message) {
        setSuccessMessage(data?.message);
        setTimeout(() => navigation.replace('SignIn'), 2000);
      }
      // console.log(form.toString());
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg) {
        setErrorMessage(errorMsg);
      }
    }
  };

  if (successMessage) {
    setTimeout(() => setSuccessMessage(''), 1500);
  }
  if (errorMessage) {
    setTimeout(() => setErrorMessage(''), 2500);
  }

  return (
    <ScrollView style={style.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Icon name="arrow-left" size={25} color="#373A42" />
      </TouchableOpacity>
      <View style={{marginBottom: 30}} />
      <View>
        <View style={style.wrappTitle}>
          <Text style={style.textLogin}>Reset Password</Text>
          <Text style={style.textSubLogin}>
            You'll get mail soon on your email
          </Text>
        </View>

        <Formik
          initialValues={{
            code: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={doReset}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={style.formInput}>
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {errorMessage && <Alert variant="error">{errorMessage}</Alert>}

              <Input
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                value={values.code}
                placeholder="Enter your reset code"
                keyboardType="numeric"
              />
              {errors.code && touched.code && (
                <Text style={style.errorsText}>{errors.code}</Text>
              )}
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
              <Input
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="Re-Enter your password"
                password
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={style.errorsText}>{errors.confirmPassword}</Text>
              )}
              <Button onPress={handleSubmit} btnTitle="Reset" />
            </View>
          )}
        </Formik>
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
    gap: 25,
    marginBottom: 30,
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
    color: '#373A42',
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

export default ResetPassword;
