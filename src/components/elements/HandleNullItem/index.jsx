import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const HandleNullItem = ({noItem, noItemSub}) => {
  return (
    <View style={style.noEventContainer}>
      <Text style={style.noEventText}>No {noItem}</Text>
      <View>
        <Text style={style.noEventSubText}>
          It seems you haven't {noItemSub} yet.
        </Text>
        <Text style={style.noEventSubText}>
          you can explore everything here.
        </Text>
        <Text style={style.noEventSubText}>do you want to try it?</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  noEventText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    textTransform: 'capitalize',
    color: 'black',
    textAlign: 'center',
  },
  noEventSubText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  noEventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default HandleNullItem;
