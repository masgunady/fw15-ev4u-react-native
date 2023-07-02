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
import {Formik} from 'formik';
import * as Yup from 'yup';
import http from '../../helpers/http';

const validationSchema = Yup.object({
  email: Yup.string().required('Email is Required!').email('Email is invalid!'),
});

const ForgotPassword = ({navigation}) => {
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const doForgot = async values => {
    try {
      const form = new URLSearchParams();
      form.append('email', values.email);
      const {data} = await http().post('/auth/forgotPassword', form.toString());
      if (data?.message) {
        setSuccessMessage(data?.message);
        setTimeout(() => navigation.replace('ResetPassword'), 2000);
      }
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
    setTimeout(() => setErrorMessage(''), 1500);
  }

  return (
    <ScrollView style={style.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={25} color="#373A42" />
      </TouchableOpacity>
      <View style={{marginBottom: 30}} />
      <View>
        <View style={style.wrappTitle}>
          <Text style={style.textLogin}>Forgot Password</Text>
          <Text style={style.textSubLogin}>
            You'll get mail soon on your email
          </Text>
        </View>

        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={doForgot}>
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
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={style.errorsText}>{errors.email}</Text>
              )}
              <Button onPress={handleSubmit} btnTitle="Send" />
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

export default ForgotPassword;
