import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAwesome from 'react-native-vector-icons/FontAwesome';
import {EventBox, CategoryBox, DateBox} from '../../components';
import http from '../../helpers/http';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {store} from '../../redux/store';
import {setProfileData} from '../../redux/reducers/profileData';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {Booking, DetailEvent, MyBooking, Payment} from '../index';

// const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  const [events, setEvent] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const deviceToken = useSelector(state => state.deviceToken.data);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [sortEvent, setSortEvent] = React.useState('id');
  const [sortEventBy, setSortEventBy] = React.useState('DESC');
  const [search, setSearch] = React.useState('');

  const saveToken = React.useCallback(async () => {
    const form = new URLSearchParams({token: deviceToken.token});
    await http(token).post('/device-token', form.toString());
  }, [deviceToken, token]);

  React.useEffect(() => {
    async function getEvent() {
      const {data} = await http().get(
        `/event?sort=${sortEvent}&sortBy=${sortEventBy}`,
      );
      setEvent(data.results);
    }
    getEvent();
  }, [sortEvent, sortEventBy]);

  React.useEffect(() => {
    async function getProfile() {
      const {data} = await http(token).get('/profile');
      store.dispatch(setProfileData(data.results));
    }
    getProfile();
  }, [saveToken, token]);

  const handleSortEvent = (sort, sortBy) => {
    setModalVisible(false);
    setSortEvent(sort);
    setSortEventBy(sortBy);
  };

  const handleSearch = () => {
    navigation.navigate('SearchResults', search);
  };

  const openModalFilter = () => {
    setModalVisible(true);
  };

  React.useEffect(() => {
    saveToken();
  }, [saveToken]);

  React.useState(() => {
    SplashScreen.hide();
  }, []);

  const uniqueDates = [...new Set(events.map(item => item?.date))];

  return (
    <View style={style.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View>
        <View style={style.drawerContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FeatherIcon name="menu" size={35} color="#FFF" />
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
          onChangeText={event => setSearch(event)}
          onSubmitEditing={() => handleSearch(search)}
        />
      </View>
      <ScrollView style={style.container} horizontal={false}>
        <View style={style.wrapTitle}>
          <View>
            <Text style={style.containerText}>Events For You</Text>
          </View>
          <View>
            <TouchableOpacity onPress={openModalFilter}>
              <FAwesome name="sliders" size={35} color="#4c3f91" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal={true} style={style.wrapperBox}>
          {events.map(item => {
            return (
              <EventBox
                key={`event-${item?.id}`}
                dates={item?.date}
                title={item?.title}
                eventImage={item?.picture}
                eventId={item?.id}
              />
            );
          })}
        </ScrollView>
        <View>
          <Text style={style.containerText}>Discover</Text>
        </View>
        <CategoryBox />
        <View style={style.containerUpcoming}>
          <Text style={style.containerTextUpcoming}>Upcoming</Text>
          <Text>See all</Text>
        </View>
        <View style={style.monthTextCont}>
          <Text style={style.monthText}>OCT</Text>
        </View>
        <View>
          {uniqueDates.map(date => {
            const itemsByDate = events.filter(item => item?.date === date);
            const item = itemsByDate[0];
            return (
              <View key={`event-by-date-${item?.id}`} style={style.upcomingBox}>
                <DateBox dates={item?.date} days={item?.date} />
                <View style={style.contentUpcoming}>
                  <EventBox
                    key={`event-${item?.id}`}
                    dates={item?.date}
                    title={item?.title}
                    eventImage={item?.picture}
                    eventId={item?.id}
                  />
                  <TouchableOpacity style={style.buttonUpcoming}>
                    <Text style={style.textButton}>
                      Show All {itemsByDate.length} Events
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Sort Event By :</Text>
            <Pressable onPress={() => handleSortEvent('date', 'ASC')}>
              <Text style={style.textStyleItem}>Latest Event</Text>
            </Pressable>
            <Pressable onPress={() => handleSortEvent('title', 'ASC')}>
              <Text style={style.textStyleItem}>Event Name (A/Z)</Text>
            </Pressable>
            <Pressable onPress={() => handleSortEvent('title', 'DESC')}>
              <Text style={style.textStyleItem}>Event Name (Z/A)</Text>
            </Pressable>
            <View style={style.wrapModalBtn}>
              <Pressable
                style={[style.button, style.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={style.textStyleNo}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const style = StyleSheet.create({
  wrapModalBtn: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#b6e5a8',
  },
  buttonClose: {
    backgroundColor: '#ffdcb3',
  },
  textStyleItem: {
    color: '#000',
    fontWeight: 'bold',
    height: 30,
  },
  textStyleNo: {
    color: '#49be25',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  drawerContainer: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    backgroundColor: '#4c3f91',
    gap: 30,
    paddingTop: 30,
  },
  container: {
    backgroundColor: 'white',
    border: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 10,
    marginBottom: 200,
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
  textContainer: {
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
  wrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 25,
  },
  textNew: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },
  warapperDate: {
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

  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3D72',
  },
  monthTextCont: {
    paddingHorizontal: 40,
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

// const HomeStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="HomeMain" component={Home} />
//       <Stack.Screen name="DetailEvent" component={DetailEvent} />
//       <Stack.Screen name="Booking" component={Booking} />
//       <Stack.Screen name="Payment" component={Payment} />
//     </Stack.Navigator>
//   );
// };
export default Home;
