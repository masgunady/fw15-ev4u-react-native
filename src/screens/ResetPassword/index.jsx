import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Button, Input} from '../../components/elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ResetPassword = ({navigation}) => {
  return (
    <ScrollView style={style.container}>
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
        <View style={style.formInput}>
          <Input placeholder="Enter your reset code" />
          <Input placeholder="Enter your email" keyboardType="email-address" />
          <Input placeholder="Enter your password" password />
          <Input placeholder="Re-Enter your password" password />
          <Button btnTitle="Reset" />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
});

export default ResetPassword;
