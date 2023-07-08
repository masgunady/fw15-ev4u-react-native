import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {IMGProfile} from '../../assets';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {ImageTemplate, Input} from '../../components';
// import Dropdown from 'react-native-input-select';

const ProfileEdit = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState({});
  // const [country, setCountry] = React.useState('Indonesia');

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, [token]);

  const handlePressEvent = () => {
    navigation.navigate('Profile');
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
          <Text style={style.textHeader}>Edit Profile</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerProfile}>
        <View style={style.profileWrapper}>
          <View style={style.photosContent}>
            <View style={style.photoIcons}>
              <ImageTemplate
                src={profile?.picture || null}
                defaultImg={IMGProfile}
                style={style.IMGProfiles}
              />
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={style.dataProfileWrapper}>
            <View style={style.formInput}>
              <Text>Name</Text>
              <View>
                <Input placeholder="Name" />
              </View>
            </View>
            <View style={style.formInput}>
              <Text>Username</Text>
              <View>
                <Input placeholder="Username" />
              </View>
            </View>
            <View style={style.formInput}>
              <Text>Email</Text>
              <View>
                <Input placeholder="Email" />
              </View>
            </View>
            <View style={style.formInput}>
              <Text>Phone</Text>
              <View>
                <Input placeholder="Phone" />
              </View>
            </View>
            <View style={style.formInput}>
              <Text>Profession</Text>
              <View>
                {/* <Dropdown
                  placeholder={country}
                  options={[
                    {name: 'Indonesia', code: 'ID'},
                    {name: 'Åland Islands', code: 'AX'},
                    {name: 'Algeria', code: 'DZ'},
                  ]}
                  optionLabel={'name'}
                  optionValue={'code'}
                  selectedValue={country}
                  onValueChange={value => setCountry(value)}
                  primaryColor={'#4c3f91'}
                  dropdownStyle={{
                    borderRadius: 15,
                    backgroundColor: 'white',
                    borderColor: '#C1C5D0',
                  }}
                /> */}
              </View>
            </View>
            <View style={style.formInput}>
              <Text>Nationality</Text>
              <View>
                {/* <Dropdown
                  placeholder={country}
                  options={[
                    {name: 'Indonesia', code: 'ID'},
                    {name: 'Åland Islands', code: 'AX'},
                    {name: 'Algeria', code: 'DZ'},
                  ]}
                  optionLabel={'name'}
                  optionValue={'code'}
                  selectedValue={country}
                  onValueChange={value => setCountry(value)}
                  primaryColor={'#4c3f91'}
                  dropdownStyle={{
                    borderRadius: 15,
                    backgroundColor: 'white',
                    borderColor: '#C1C5D0',
                  }}
                /> */}
              </View>
            </View>
            <View style={style.formInput}>
              <Text>Birthday Date</Text>
              <View>
                <Input placeholder="Birthday Date" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={style.btnContainer}>
        <TouchableOpacity style={style.touchButton}>
          <Text style={style.textTouch}>Save</Text>
        </TouchableOpacity>
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
  containerProfile: {
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
  dataProfileWrapper: {
    marginTop: 20,
    gap: 20,
    marginBottom: 120,
  },
  photosContent: {
    width: 137,
    height: 137,
    borderWidth: 5,
    borderColor: '#4c3f91',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  photoIcons: {
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
  formInput: {
    width: '100%',
    gap: 15,
  },
  btnContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
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
export default ProfileEdit;
