import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  BackHandler,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {IMGCard, IMGCard2, IMGProfile} from '../../assets';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {ImageTemplate} from '../../components';
import {useFocusEffect} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getProfile = async () => {
        const {data} = await http(token).get('/profile');
        setProfile(data.results);
      };
      getProfile();
    }, [token]),
  );

  const handlePressEvent = () => {
    navigation.navigate('Home');
  };
  console.log(profile.profession);

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
          <Text style={style.textHeader}>Profile</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.contProfile}>
        <View style={style.contProfileName}>
          <View style={style.foto}>
            <View style={style.fotoIcon}>
              <ImageTemplate
                src={profile?.picture || null}
                defaultImg={IMGProfile}
                style={style.IMGProfiles}
              />
            </View>
          </View>
          <View style={style.contProfileName}>
            <Text style={style.name}>{profile?.fullName}</Text>
            <Text style={style.profesi}>
              {profile?.profession ? profile?.profession : 'Profession : -'}
            </Text>
          </View>
        </View>
        <View style={style.cardContainer}>
          <View style={style.CardOptipn}>
            <Text style={style.cardText}>Card</Text>
            <View>
              <TouchableOpacity style={style.plusCont}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View style={style.ccContainer}>
              <View style={style.cardOutput}>
                <Image style={style.IMGCards} source={IMGCard} />
              </View>
              <View style={style.cardOutput}>
                <Image style={style.IMGCards} source={IMGCard2} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={style.editProf}>
          <View style={style.contTextEdit}>
            <View>
              <Text>+</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileEdit')}>
              <Text style={style.textEdit}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={style.editPass}>
          <View style={style.contTextEdit}>
            <View>
              <Text>+</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={style.textEdit}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text>+</Text>
          </TouchableOpacity>
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
  contProfile: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    gap: 35,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  profileText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  profCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },

  contProfileName: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  foto: {
    width: 137,
    height: 137,
    borderWidth: 5,
    borderColor: '#4c3f91',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  fotoIcon: {
    width: 115,
    height: 115,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  contName: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    textTransform: 'capitalize',
    textAlign: 'center',
    width: 270,
  },
  profesi: {
    fontSize: 16,
    color: 'black',
    opacity: 0.7,
    fontFamily: 'Poppins-Medium',
  },
  cardContainer: {
    gap: 35,
  },
  IMGCards: {
    width: '100%',
    height: '100%',
  },
  CardOptipn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  plusCont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: 'blue',
    borderStyle: 'dashed',
    borderRadius: 10,
    marginLeft: 30,
  },
  cardOutput: {
    width: 288,
    height: 172,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  ccContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editPass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  textEdit: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  contTextEdit: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Profile;
