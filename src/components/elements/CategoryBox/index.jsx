import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

const CategoryBox = () => {
  const category = [
    {
      id: 1,
      name: 'music',
      icon: 'music',
      background: '#FFB7CA',
    },
    {
      id: 2,
      name: 'arts',
      icon: 'loader',
      background: '#FFDAAF',
    },
    {
      id: 3,
      name: 'outdoors',
      icon: 'sunset',
      background: '#D0B8FF',
    },
    {
      id: 4,
      name: 'workshop',
      icon: 'tool',
      background: '#FFB7CA',
    },
    {
      id: 5,
      name: 'sport',
      icon: 'dribbble',
      background: '#D0B8FF',
    },
    {
      id: 6,
      name: 'festival',
      icon: 'umbrella',
      background: '#FFB7CA',
    },
    {
      id: 7,
      name: 'fashion',
      icon: 'github',
      background: '#D0B8FF',
    },
  ];
  return (
    <ScrollView style={style.wrapperBox} horizontal={true}>
      <View style={style.wrapperBoxNew}>
        <TouchableOpacity style={style.wrapperBoxDiscover}>
          <View style={style.iconDiscover}>
            <FeatherIcon name="map-pin" size={20} color="#FFF" />
          </View>
          <Text style={style.textDiscover}>YOUR AREA</Text>
        </TouchableOpacity>
      </View>
      {category.map(item => (
        <View key={`category-list-${item.id}`} style={style.wrapperBoxNew}>
          <TouchableOpacity style={style.wrapperBoxDiscover}>
            <View style={style.iconDiscover}>
              <FeatherIcon name={item.icon} size={20} color="#FFF" />
            </View>
            <Text style={style.textDiscover}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  wrapperBox: {
    flexDirection: 'row',
    gap: 10,
  },
  wrapperBoxNew: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 30,
    width: 165,
    height: 66,
    borderRadius: 30,
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  textDiscover: {
    fontSize: 14,
    color: '#884DFF',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
  },
  iconDiscover: {
    width: 45,
    height: 45,
    backgroundColor: '#D0B8FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBoxDiscover: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryBox;
