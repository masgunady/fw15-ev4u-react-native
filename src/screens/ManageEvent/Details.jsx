import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SplashScreen from 'react-native-splash-screen';
import {ImageTemplate} from '../../components';
import {IMGEventDummy} from '../../assets';
import moment from 'moment';

const Details = ({route, navigation}) => {
  const {id} = route.params;
  const token = useSelector(state => state.auth.token);
  const [detailEvent, setDetailEvent] = React.useState({});
  const [indicator, setIndicator] = React.useState(false);

  React.useEffect(() => {
    setIndicator(true);
    const getDetailEvent = async () => {
      const {data} = await http(token).get(`/event/manage/${id}`);
      setDetailEvent(data.results);
      setIndicator(false);
    };

    getDetailEvent();
  }, [token, id]);

  console.log(detailEvent);

  const handlePressEvent = () => {
    navigation.navigate('ManageEvent');
  };

  React.useState(() => {
    SplashScreen.hide();
  }, []);
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
            <Text style={style.textHeader}>Detail Event</Text>
          )}
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerProfile}>
        <ScrollView>
          <View style={style.profileWrapper}>
            <View style={style.photosContent}>
              <View style={style.photoIcons}>
                <ImageTemplate
                  src={detailEvent?.picture || null}
                  defaultImg={IMGEventDummy}
                  style={style.IMGProfiles}
                />
              </View>
            </View>
          </View>
          <View style={style.dataProfileWrapper}>
            <View style={style.contentWrap}>
              <Text style={style.contentTextTitle}>Event</Text>
              <Text style={style.contentText}>:</Text>
              <Text style={style.contentTextContent}>{detailEvent.title}</Text>
            </View>
            <View style={style.contentWrap}>
              <Text style={style.contentTextTitle}>Date</Text>
              <Text style={style.contentText}>:</Text>
              <Text style={style.contentTextContent}>
                {' '}
                {moment(detailEvent.date).format('LLLL').slice(0, 3)}
                {', '}
                {moment(detailEvent.date).format('LLL')}
              </Text>
            </View>
            <View style={style.contentWrap}>
              <Text style={style.contentTextTitle}>Location</Text>
              <Text style={style.contentText}>:</Text>
              <Text style={style.contentTextContent}>
                {detailEvent.location}
              </Text>
            </View>
            <View style={style.contentWrap}>
              <Text style={style.contentTextTitle}>Description</Text>
              <Text style={style.contentText}>:</Text>
              <Text style={style.contentTextContent}>
                {detailEvent.descriptions}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contentTextContent: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: 200,
  },
  contentTextTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: 110,
  },
  contentText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  contentWrap: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    gap: 10,
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
  containerProfile: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    gap: 45,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  dataProfileWrapper: {
    marginTop: 20,
    gap: 20,
    marginBottom: 120,
  },
  photosContent: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 30,
  },
  photoIcons: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  formInput: {
    width: '100%',
    gap: 15,
  },
  btnContainer: {
    bottom: 30,
    width: '100%',
  },
  touchButton: {
    backgroundColor: '#4c3f91',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  textTouch: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Details;
