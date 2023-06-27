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

const Register = ({navigation}) => {
  return (
    <ScrollView style={style.container}>
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
      </View>
      <View style={style.formInput}>
        <Input placeholder="Enter your fullname" />
        <Input placeholder="Enter your email" keyboardType="email-address" />
        <Input placeholder="Enter your password" password />
        <Input placeholder="Re-Enter your password" password />
        <View style={{marginBottom: 3}} />
        <View style={style.sectionToSignup}>
          <Text>Accept terms and condition</Text>
        </View>
        <View style={{marginBottom: 3}} />

        <Button btnTitle="Sign Up" />
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
});

export default Register;
