import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {EventList, BtnMinOpacity, HandleNullItem} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const MyBooking = ({navigation}) => {
  const [reservationByMe, setReservationByMe] = React.useState([]);
  const token = useSelector(state => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/history');
        setReservationByMe(data.results);
      };
      fetchData();
    }, [token]),
  );

  // React.useEffect(() => {
  //   async function getEventByMe() {
  //     const {data} = await http(token).get('/history');
  //     setReservationByMe(data.results);
  //   }
  //   if (token) {
  //     getEventByMe();
  //   }
  // }, [token, setReservationByMe]);

  const handlePressEvent = () => {
    navigation.navigate('Profile');
  };
  const handlePressDetail = id => {
    navigation.navigate('DetailTransaction', {id});
  };
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
          <Text style={style.textHeader}>My Booking</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <ScrollView style={style.containerWishlist}>
        <BtnMinOpacity icon="calendar" text="October" />
        <View style={style.wrapperWishlist}>
          {reservationByMe.length < 1 && (
            <HandleNullItem
              noItem="tickets bought"
              noItemSub="bought any ticket"
            />
          )}
          {reservationByMe.map(item => {
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
                forMyBooking
                transactionDetail={() => handlePressDetail(item.id)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  contBtnTopManage: {
    marginBottom: 20,
  },
  btnTopManage: {
    width: 140,
    height: 55,
    backgroundColor: '#F1EAFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    gap: 7,
  },
  textTopManage: {
    color: '#4c3f91',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
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
    paddingTop: 30,
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
export default MyBooking;
