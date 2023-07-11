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
import {EventList, HandleNullItem} from '../../components';
import {useFocusEffect} from '@react-navigation/native';

const MyWishlist = ({navigation}) => {
  const [myWishlist, setMyWishlist] = React.useState([]);
  const token = useSelector(state => state.auth.token);

  const getWishlists = React.useCallback(async () => {
    const {data} = await http(token).get('/wishlist');
    setMyWishlist(data.results);
  }, [token]);

  React.useEffect(() => {
    getWishlists();
  }, [getWishlists]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http(token).get('/wishlist');
        setMyWishlist(data.results);
      };
      fetchData();
    }, [token]),
  );

  const addRemoveWishlist = async eventId => {
    try {
      const id = {eventId: eventId};
      const qString = new URLSearchParams(id).toString();
      const {data} = await http(token).post('wishlist', qString);
      if (data.results) {
        console.log(data.results);
      }
      getWishlists();
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
          <Text style={style.textHeader}>My Wishlist</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerWishlist}>
        <View style={style.wrapperWishlist}>
          {myWishlist.length < 1 && (
            <HandleNullItem noItem="wishlist found" noItemSub="wishlist" />
          )}
          {myWishlist.map(item => {
            return (
              <EventList
                key={`wishlist-manage-${item.wishlistId}`}
                dateBoxDate={item?.date}
                dateBoxDay={item?.date}
                eventSpecId={item.eventId}
                title={item.title}
                location={item.location}
                date={item?.date}
                day={item?.date}
                addRemoveWishlist={() => addRemoveWishlist(`${item.eventId}`)}
                forWishlist
              />
            );
          })}
        </View>
      </View>
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
export default MyWishlist;
