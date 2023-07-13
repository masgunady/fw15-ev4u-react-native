import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Input, Alert} from '../../components/elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {asyncRegister} from '../../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage} from '../../redux/reducers/auth';
import {Checkbox, Button} from 'react-native-paper';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is Required!')
    .min(3, 'Please insert valid full name'),
  email: Yup.string().required('Email is Required!').email('Email is invalid!'),
  password: Yup.string().required('Password is Required'),
  confirmPassword: Yup.string()
    .required('Confirm password is Required')
    .oneOf([Yup.ref('password'), null], 'Password must match'),
  // termAndCondition: Yup.boolean().oneOf(
  //   [true],
  //   'You must accept the terms and conditions',
  // ),
});

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const [checked, setChecked] = React.useState(true);

  const doRegister = values => {
    dispatch(asyncRegister(values));
  };
  if (successMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
      navigation.replace('SignIn');
    }, 1500);
  }
  // const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
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
      <View style={style.wrappTitle}>
        <Text style={style.textLogin}>Sign Up</Text>
        <View style={style.sectionToSignup}>
          <Text style={style.textSubLogin}>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={style.textSubLoginBtn}> Sign In</Text>
          </TouchableOpacity>
        </View>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      </View>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          termAndCondition: true,
        }}
        validationSchema={validationSchema}
        onSubmit={doRegister}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={style.formInput}>
            <Input
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
              placeholder="Enter your fullname"
            />
            {errors.fullName && touched.fullName && (
              <Text style={style.errorsText}>{errors.fullName}</Text>
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
            <View style={{marginBottom: 3}} />
            <View style={style.sectionToSignup}>
              <Checkbox
                status={checked ? 'unchecked' : 'checked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text>Accept terms and condition</Text>
            </View>
            {errors.termAndCondition && touched.termAndCondition && (
              <Text style={style.errorsText}>{errors.termAndCondition}</Text>
            )}
            <View style={{marginBottom: 3}} />

            <Button
              style={style.button}
              mode="contained"
              onPress={handleSubmit}
              disabled={checked}>
              <Text style={style.textButton}>Sign Up</Text>
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 15,
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 1,
    color: '#FFF',
    width: '100%',
  },
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
    justifyContent: 'start',
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
  errorsText: {
    color: '#FF9191',
  },
});

export default Register;
