import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={style.wrapper}>
      <View>
        <View style={style.drawerContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="list" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FeatherIcon name="message-square" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={style.textInput}
          placeholderTextColor="white"
          placeholder="Search Event..."
        />
      </View>
      <ScrollView style={style.contsiner} horizontal={false}>
        <View>
          <Text style={style.containerText}>Events For You</Text>
        </View>
        <ScrollView horizontal={true} style={style.wrapperBox}>
          <View style={style.containerTextNew}>
            <View style={style.warapperTextCont}>
              <Text style={style.textNew}>Wed, 15 Nov, 4:00 PM</Text>
              <Text style={style.textContaninerNew}>
                Sights & Sounds Exhibition
              </Text>
            </View>
            <TouchableOpacity
              style={style.button1}
              onPress={() => navigation.navigate('Events')}>
              {/* <Text>Next</Text> */}
            </TouchableOpacity>
          </View>
          <View style={style.containerTextNew}>
            <View style={style.warapperTextCont}>
              <Text style={style.textNew}>Wed, 15 Nov, 4:00 PM</Text>
              <Text style={style.textContaninerNew}>
                Sights & Sounds Exhibition
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={style.button1}>
              {/* <Text>Next</Text> */}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>
          <Text style={style.containerText}>Discover</Text>
        </View>
        <ScrollView style={style.wrapperBox} horizontal={true}>
          <View style={style.wrapperBoxNew}>
            <TouchableOpacity
              style={style.wrapperBoxDiscover}
              onPress={() => navigation.navigate('MyBooking')}>
              <View style={style.iconDiscover}>
                <Text>0</Text>
              </View>
              <Text style={style.textDiscover}>YOUR AREA</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyWishlist')}
            style={style.wrapperBoxNew}>
            <View style={style.wrapperBoxDiscover}>
              <View style={style.iconDiscover}>
                <Text>0</Text>
              </View>
              <Text style={style.textDiscover}>YOUR AREA</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ManageEvent')}
            style={style.wrapperBoxNew}>
            <View style={style.wrapperBoxDiscover}>
              <View style={style.iconDiscover}>
                <Text>0</Text>
              </View>
              <Text style={style.textDiscover}>YOUR AREA</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View style={style.containerUpcoming}>
          <Text style={style.containerTextUpcoming}>Upcoming</Text>
          <Text>See all</Text>
        </View>
        <View style={style.monthTextCont}>
          <Text style={style.monthText}>SEP</Text>
        </View>
        <View style={style.upcomingBox}>
          <View style={style.upcomingTextCont}>
            <View style={style.textContDay}>
              <Text style={style.textDay}>15</Text>
              <Text>Wed</Text>
            </View>
          </View>
          <View style={style.contentUpcoming}>
            <View style={style.containerTextNew}>
              <View style={style.warapperTextCont}>
                <Text style={style.textNew}>Wed, 15 Nov, 4:00 PM</Text>
                <Text style={style.textContaninerNew}>
                  Sights & Sounds Exhibition
                </Text>
              </View>
              <TouchableOpacity style={style.button1}>
                {/* <Text>Next</Text> */}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={style.buttonUpcoming}>
              <Text style={style.textButton}>Show All 5 Events</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.upcomingBox}>
          <View style={style.upcomingTextCont}>
            <View style={style.textContDay}>
              <Text style={style.textDay}>16</Text>
              <Text>Thu</Text>
            </View>
          </View>
          <View style={style.contentUpcoming}>
            <View style={style.containerTextNew}>
              <View style={style.warapperTextCont}>
                <Text style={style.textNew}>Wed, 15 Nov, 4:00 PM</Text>
                <Text style={style.textContaninerNew}>
                  Sights & Sounds Exhibition
                </Text>
              </View>
              <TouchableOpacity style={style.button1}>
                {/* <Text>Next</Text> */}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={style.buttonUpcoming}>
              <Text style={style.textButton}>Show All 5 Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  drawerContainer: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    backgroundColor: '#4c3f91',
    gap: 30,
  },
  contsiner: {
    backgroundColor: 'white',
    border: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 10,
  },
  textColor: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    opacity: 0.8,
    color: 'white',
    borderColor: 'white',
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
  },
  containerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    padding: 30,
  },
  containerTextNew: {
    width: 260,
    height: 376,
    backgroundColor: 'black',
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    gap: 10,
  },
  textContaninerNew: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textNew: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },
  warapperTextCont: {
    backgroundColor: 'black',
    marginTop: 200,
  },
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
  button1: {
    backgroundColor: 'red',
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  textDiscover: {
    fontSize: 16,
    color: '#884DFF',
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
  containerTextUpcoming: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  containerUpcoming: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingBox: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  upcomingTextCont: {
    width: 60,
    height: 85,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3D72',
  },
  monthTextCont: {
    paddingHorizontal: 40,
  },
  textContDay: {
    alignItems: 'center',
  },
  textDay: {
    color: '#FF8900',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonUpcoming: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
    width: '80%',
    height: 50,
    borderTopColor: '#FF8900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  contentUpcoming: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
