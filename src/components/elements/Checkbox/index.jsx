import React from 'react';
import {Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Checkbox = ({...props}) => {
  return (
    <View>
      <View>
        <CheckBox {...props} />
      </View>
    </View>
  );
};

export default Checkbox;
