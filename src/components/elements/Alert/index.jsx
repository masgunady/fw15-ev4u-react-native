import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Alert = ({variant, children}) => {
  if (variant === 'error') {
    return (
      <View style={style.errorWrapper}>
        <Icon name="exclamation" size={25} color="white" />
        <Text style={style.errorText}>{children}</Text>
      </View>
    );
  }
  return (
    <View style={style.wrapper}>
      <Icon name="exclamation" size={25} color="white" />
      <Text style={style.text}>{children}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  errorWrapper: {
    backgroundColor: '#FF9191',
    paddingLeft: 15,
    borderRadius: 15,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  errorText: {
    color: 'white',
  },
  wrapper: {
    backgroundColor: '#EAEAEA',
    paddingLeft: 15,
    borderRadius: 15,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  text: {
    color: 'black',
  },
});

export default Alert;
