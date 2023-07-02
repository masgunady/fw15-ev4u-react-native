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
import {BtnMinOpacity, EventList, HandleNullItem} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const ManageEvent = ({navigation}) => {
  const [eventByMe, setEventByMe] = React.useState([]);
  const token = useSelector(state => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/event/manage');
        setEventByMe(data.results);
      };
      fetchData();
    }, [token]),
  );

  const handlePressEvent = () => {
    navigation.navigate('Profile');
  };

  // React.useEffect(() => {
  //   async function getEventByMe() {
  //     const {data} = await http(token).get('/event/manage');
  //     setEventByMe(data.results);
  //   }
  //   if (token) {
  //     getEventByMe();
  //   }
  // }, [token, setEventByMe]);
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
          <Text style={style.textHeader}>Manage Event</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <ScrollView style={style.containerWishlist}>
        <BtnMinOpacity icon="plus-circle" text="Create" />
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
                // addRemoveWishlist={() => addRemoveWishlist(`${item.eventId}`)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
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
