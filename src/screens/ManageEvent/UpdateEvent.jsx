import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {ImageTemplate, Input} from '../../components';
import {Formik} from 'formik';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {IMGEventDummy} from '../../assets';

const UpdateEvent = ({route, navigation}) => {
  const {id} = route.params;
  const token = useSelector(state => state.auth.token);
  const [category, setCategory] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [openDate, setOpenDate] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [categoryValue, setCategoryValue] = React.useState(null);
  const [locationValue, setLocationValue] = React.useState(null);
  const [fileResponse, setFileResponse] = React.useState([]);
  const [selectedPicture, setSelectedPicture] = React.useState('');
  const [indicator, setIndicator] = React.useState(false);
  const [detailEvent, setDetailEvent] = React.useState({});
  const [openEditCategory, setOpenEditCategory] = React.useState(false);
  const [openEditDate, setOpenEditDate] = React.useState(false);
  const [openEditLocation, setOpenEditLocation] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    setIndicator(true);
    const getDetailEvent = async () => {
      const {data} = await http(token).get(`/event/manage/${id}`);
      setDetailEvent(data.results);
      setIndicator(false);
    };

    getDetailEvent();
  }, [token, id]);

  React.useEffect(() => {
    const getCategory = async () => {
      const {data} = await http().get('/category');
      const arrCategory = data.results.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setCategory(arrCategory);
    };
    getCategory();
  }, []);

  React.useEffect(() => {
    const getLocation = async () => {
      const {data} = await http().get('/city');
      const arrCity = data.results.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setLocation(arrCity);
    };
    getLocation();
  }, []);

  const getImage = async source => {
    let results;
    if (!source) {
      results = await launchImageLibrary();
    } else {
      results = await launchCamera({
        quality: 0.5,
      });
    }
    const data = results.assets[0];
    console.log(data);
    if (data.uri) {
      setSelectedPicture({
        name: data.fileName,
        type: data.type,
        uri:
          Platform.OS === 'android'
            ? data.uri
            : data.uri.replace('file://', ''),
      });

      setFileResponse(data.uri);
    }
  };

  const doUpdateEvent = async (values, {resetForm}) => {
    setIndicator(true);
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    const fileImage = {
      uri: fileResponse,
      type: 'image/jpeg',
      name: 'image' + '-' + Date.now() + '.jpg',
    };

    if (fileResponse.length > 1) {
      form.append('picture', fileImage);
    }
    if (categoryValue) {
      form.append('categoryId', categoryValue);
    }
    if (locationValue) {
      form.append('cityId', locationValue);
    }
    if (date.toDateString() !== new Date().toDateString()) {
      form.append('date', moment(date).format('YYYY-MM-DD'));
    }

    const dateNow = new Date();
    console.log(date.toDateString());
    console.log(dateNow.toDateString());
    console.log(form._parts.length);
    if (form._parts.length === 0) {
      setIndicator(false);
      navigation.navigate('ManageEvent');
    } else {
      try {
        const {data} = await http(token).patch(`/event/manage/${id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (err) {
        console.warn(err);
      }
      setIndicator(false);
      setFileResponse([]);
      setSelectedPicture('');
      setLocationValue(null);
      setCategoryValue(null);
      resetForm();
      navigation.navigate('ManageEvent');
    }
  };

  const handleOpenEditCategory = () => {
    setOpenEditCategory(true);
  };
  const handleOpenEditDate = () => {
    setOpenEditDate(true);
  };
  const handleOpenEditLocation = () => {
    setOpenEditLocation(true);
  };
  const handlePressEvent = () => {
    navigation.navigate('ManageEvent');
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
          {indicator ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={style.textHeader}>Update Event</Text>
          )}
        </View>
        <View style={style.contentHeader} />
      </View>
      <Formik
        initialValues={{
          title: detailEvent?.title,
          date: detailEvent?.date,
          cityId: detailEvent?.cityId,
          descriptions: detailEvent?.descriptions,
          categoryId: detailEvent?.categoryId,
        }}
        onSubmit={doUpdateEvent}>
        {({values, handleBlur, handleChange, handleSubmit}) => {
          return (
            <View style={style.containerProfile}>
              <ScrollView>
                <View style={style.profileWrapper}>
                  <View style={style.photosContent}>
                    <View style={style.photoIcons}>
                      {selectedPicture ? (
                        <Image
                          style={style.fotoProfile}
                          src={selectedPicture.uri}
                          width={90}
                          height={90}
                        />
                      ) : (
                        <ImageTemplate
                          src={detailEvent?.picture || null}
                          defaultImg={IMGEventDummy}
                          style={style.IMGProfiles}
                        />
                      )}
                    </View>
                  </View>
                  <View style={style.textGap20}>
                    <TouchableOpacity onPress={() => getImage()}>
                      <Text>Choose Picture</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={style.dataProfileWrapper}>
                  <View style={style.formInput}>
                    <Text>Title</Text>
                    <View>
                      <Input
                        placeholder={detailEvent.title}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                      />
                    </View>
                  </View>

                  <View style={style.formInput}>
                    <Text>Category</Text>
                    {!openEditCategory ? (
                      <View style={style.editBetween}>
                        <Text>{detailEvent.eventCategory}</Text>
                        <TouchableOpacity onPress={handleOpenEditCategory}>
                          <Text>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <DropDownPicker
                          placeholder="Select Category"
                          dropDownContainerStyle={style.dropPicker}
                          textStyle={style.textPicker}
                          open={openCategory}
                          value={categoryValue}
                          items={category}
                          setOpen={setOpenCategory}
                          setValue={setCategoryValue}
                          setItems={setCategory}
                          zIndex={1000}
                          listMode="SCROLLVIEW"
                        />
                      </View>
                    )}
                  </View>

                  <View style={style.formInput}>
                    <Text>Date</Text>
                    {!openEditDate ? (
                      <View style={style.editBetween}>
                        <Text>{moment(detailEvent.date).format('LLLL')}</Text>
                        <TouchableOpacity onPress={handleOpenEditDate}>
                          <Text>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity onPress={() => setOpenDate(true)}>
                        <View style={style.textBetween}>
                          <Text>{moment(date).format('LLLL')}</Text>
                          <FeatherIcon name="calendar" size={25} color="grey" />
                        </View>
                        <DatePicker
                          modal
                          open={openDate}
                          mode="date"
                          date={date}
                          onConfirm={newDate => {
                            setOpenDate(false);
                            setDate(newDate);
                          }}
                          onCancel={() => {
                            setOpenDate(false);
                          }}
                        />
                        {/* <DatePicker
                          modal
                          open={openDate}
                          mode="date"
                          date={date}
                          onConfirm={date => {
                            setOpenDate(false);
                            setDate(date);
                          }}
                          onCancel={() => {
                            setOpenDate(false);
                          }}
                        /> */}
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={style.formInput}>
                    <Text>Location</Text>
                    {!openEditLocation ? (
                      <View style={style.editBetween}>
                        <Text>{detailEvent.location}</Text>
                        <TouchableOpacity onPress={handleOpenEditLocation}>
                          <Text>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <DropDownPicker
                          placeholder="Select Location"
                          dropDownContainerStyle={style.dropPicker}
                          textStyle={style.textPicker}
                          open={openLocation}
                          value={locationValue}
                          items={location}
                          setOpen={setOpenLocation}
                          setValue={setLocationValue}
                          setItems={setLocation}
                          zIndex={1000}
                          listMode="SCROLLVIEW"
                        />
                      </View>
                    )}
                  </View>

                  <View style={style.formInput}>
                    <Text>Description</Text>
                    <View>
                      <Input
                        placeholder={detailEvent.descriptions}
                        onChangeText={handleChange('descriptions')}
                        onBlur={handleBlur('descriptions')}
                        value={values.descriptions}
                      />
                    </View>
                  </View>
                </View>
                <View style={style.btnContainer}>
                  <TouchableOpacity
                    style={style.touchButton}
                    onPress={handleSubmit}>
                    <Text style={style.textTouch}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const style = StyleSheet.create({
  editBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dropPicker: {
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
  },

  textPicker: {
    color: '#003d3b',
  },
  fotoProfile: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  btnLoadImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  DateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  BirthDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  wrappGender: {
    flexDirection: 'row',
    gap: 30,
  },
  wrappRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectDropdowns: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    fontFamily: 'Poppins-Medium',
  },
  drStyle: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btStyle: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  rwStyle: {
    backgroundColor: '#FFF',
    borderBottomColor: '#FFF',
  },
  rtStyle: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
  },
  textBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textGap20: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
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
    width: 200,
    height: 280,
    borderWidth: 5,
    borderColor: '#4c3f91',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 30,
  },
  photoIcons: {
    width: 200,
    height: 280,
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
export default UpdateEvent;
