import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/reducers/auth';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
