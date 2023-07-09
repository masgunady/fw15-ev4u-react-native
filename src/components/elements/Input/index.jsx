import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Input = ({password, ...rest}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const handleInputPass = () => {
    setHidePassword(!hidePassword);
  };
  return (
    <View style={style.container}>
      <View style={style.inputContainer}>
        <TextInput secureTextEntry={hidePassword} {...rest} />
      </View>
      {password && (
        <TouchableOpacity onPress={handleInputPass} style={style.iconShowHide}>
          {hidePassword ? (
            <Icon name="eye-outline" size={25} color="grey" />
          ) : (
            <Icon name="eye-off-outline" size={25} color="grey" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  inputContainer: {
    borderRadius: 15,
    height: 55,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 15,
    position: 'relative',
  },
  iconShowHide: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});
export default Input;
