import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'rnx-gradient';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const EventBox = ({dates, title, eventImage, eventId, ...rest}) => {
  const navigation = useNavigation();
  const handlePressEvent = id => {
    navigation.navigate('DetailEvent', {id});
  };
  return (
    <View style={style.containerTextNew}>
      <Image style={style.eventImages} source={{uri: eventImage}} />

      <View style={style.wrapAllContent}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          colors={['#000000', 'rgba(0, 0, 0, 0)']}
          style={style.dissolveContainer}
        />
        <View style={style.warapperTextCont}>
          <Text style={style.textNew}>
            {moment(dates).format('LLLL').slice(0, 3)}
            {', '}
            {moment(dates).format('LLL')}
          </Text>
          <Text style={style.textContaninerNew}>
            {title.slice(0, 14) + ' ...'}
          </Text>
          <TouchableOpacity
            style={style.button1}
            onPress={() => handlePressEvent(eventId)}>
            <Icon name="arrow-right" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerTextNew: {
    width: 260,
    height: 376,
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  wrapAllContent: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  dissolveContainer: {flex: 1},
  eventImages: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textContaninerNew: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  textNew: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    width: 200,
  },
  warapperTextCont: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },

  button1: {
    backgroundColor: '#FF3D71',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default EventBox;
