import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {BtnMinOpacity, EventList, HandleNullItem} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const ManageEvent = ({navigation}) => {
  const [eventByMe, setEventByMe] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [eventIds, setEventIds] = React.useState('');
  const [indicator, setIndicator] = React.useState(false);

  const getEventByMe = React.useCallback(async () => {
    const {data} = await http(token).get('/event/manage');
    setEventByMe(data.results);
  }, [token]);

  React.useEffect(() => {
    getEventByMe();
  }, [getEventByMe]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/event/manage');
        setEventByMe(data.results);
      };
      fetchData();
    }, [token]),
  );

  const handleDeleteEvent = async id => {
    try {
      setIndicator(true);
      setModalVisible(false);
      const {data} = await http(token).delete(`/event/manage/${id}`);
      console.log(data);
      setEventIds(null);
      getEventByMe();
      setIndicator(false);
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.log(message);
      }
    }
  };
  const handlePressEvent = () => {
    navigation.navigate('Home');
  };
  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };
  const handleEventDetail = id => {
    navigation.navigate('Details', {id});
  };
  const handleEventUpdate = id => {
    navigation.navigate('UpdateEvent', {id});
  };
  const openModalDelete = eventId => {
    setEventIds(eventId);
    setModalVisible(true);
  };

  console.log(eventIds);

  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.sectionHeader}>
        <View style={style.contentHeader}>
          <TouchableOpacity onPress={handlePressEvent}>
            <FeatherIcon name="arrow-left" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          {indicator ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={style.textHeader}>Manage Event</Text>
          )}
        </View>
        <View style={style.contentHeader} />
      </View>
      <ScrollView style={style.containerWishlist}>
        <BtnMinOpacity
          icon="plus-circle"
          text="Create"
          createEventFunc={() => handleCreateEvent()}
        />
        <View style={style.wrapperWishlist}>
          {eventByMe.length < 1 && (
            <HandleNullItem noItem="event found" noItemSub="event" />
          )}
          {eventByMe.map(item => {
            return (
              <EventList
                key={`booiking-manage-${item.id}`}
                dateBoxDate={item?.date}
                dateBoxDay={item?.date}
                eventSpecId={item.eventId}
                title={item.title}
                location={item.location}
                date={item?.date}
                day={item?.date}
                forManageEvent
                funcEventDelete={() => openModalDelete(item.id)}
                funcEventDetail={() => handleEventDetail(item.id)}
                funcEventUpdate={() => handleEventUpdate(item.id)}
              />
            );
          })}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Confirm Delete ?</Text>
            <View style={style.wrapModalBtn}>
              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => handleDeleteEvent(eventIds)}>
                <Text style={style.textStyleYes}>Yes</Text>
              </Pressable>
              <Pressable
                style={[style.button, style.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={style.textStyleNo}>No</Text>
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
    width: 70,
  },
  buttonOpen: {
    backgroundColor: '#b6e5a8',
  },
  buttonClose: {
    backgroundColor: '#ffdcb3',
  },
  textStyleYes: {
    color: '#FF8900',
    fontWeight: 'bold',
    textAlign: 'center',
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
  container: {
    paddingTop: 30,
    backgroundColor: '#4c3f91',
    flex: 1,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 50,
  },
  contentHeader: {
    flex: 1,
  },
  containerWishlist: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    gap: 35,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  wrapperWishlist: {
    marginTop: 20,
    gap: 30,
    marginBottom: 120,
  },
  wishlistContainer: {
    flexDirection: 'row',
    justifyContent: 'start',
    width: '100%',
    gap: 30,
  },

  sectionWishlistLeft: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionWishlistRight: {
    gap: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  eventTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    textTransform: 'capitalize',
    width: 250,
    color: 'black',
  },
  eventSubTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textTransform: 'capitalize',
  },
});
export default ManageEvent;
