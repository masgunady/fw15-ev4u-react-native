import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {IMGSplash} from '../../assets';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 3000);
  }, [navigation]);
  return (
    <View style={style.container}>
      <View>
        <Text style={style.titleApp}>Find Events You Love</Text>
      </View>
      <View style={style.imgContainer}>
        <Image source={IMGSplash} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#4c3f91',
    flex: 1,
    gap: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 150,
  },
  titleApp: {
    maxWidth: 380,
    fontSize: 48,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
