import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

const BtnMinOpacity = ({icon, text, createEventFunc}) => {
  return (
    <View style={style.contBtnTopManage}>
      <TouchableOpacity style={style.btnTopManage} onPress={createEventFunc}>
        <FeatherIcon name={icon} size={25} color="#4c3f91" />
        <Text style={style.textTopManage}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  contBtnTopManage: {
    marginTop: 10,
    marginBottom: 30,
  },
  btnTopManage: {
    width: 140,
    height: 55,
    backgroundColor: '#F1EAFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    gap: 7,
  },
  textTopManage: {
    color: '#4c3f91',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },
});

export default BtnMinOpacity;
