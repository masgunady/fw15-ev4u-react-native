import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({disabled, btnTitle, ...rest}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[style.button, disabled && style.buttonDisabled]}>
      <Text style={[style.textButton, disabled && style.textButtonDisabled]}>
        {btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: '#4c3f91',
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
  },
  buttonDisabled: {
    backgroundColor: '#AAA',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderRadius: 15,
  },
  textButtonDisabled: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 1,
    color: '#FFF',
  },
});

export default Button;
