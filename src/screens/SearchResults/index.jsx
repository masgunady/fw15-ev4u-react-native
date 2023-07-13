import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {ImageTemplate} from '../../components';
import {IMGEventDummy} from '../../assets';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';

const SearchResults = ({route, navigation}) => {
  const searctQuery = route.params;
  const [seacrhItem, setSearchItem] = React.useState('');
  const [indicator, setIndicator] = React.useState(false);
  const [events, setEvent] = React.useState([]);
  const [sortEvent, setSortEvent] = React.useState('id');
  const [sortEventBy, setSortEventBy] = React.useState('DESC');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limitData, setLimitData] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setSearchItem(searctQuery);
  }, [searctQuery]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const {data} = await http().get(
          `/event?searchName=${seacrhItem}&page=${currentPage}&limit=${limitData}&sort=${sortEvent}&sortBy=${sortEventBy}`,
        );
        // setEvent(data.results);
        // if (data.results.length < limitData) {
        //   setEvent(data.results);
        // } else {
        //   setEvent([...events, ...data.results]);
        // }
        setEvent([...events, ...data.results]);
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, sortEvent, seacrhItem, sortEventBy]),
  );

  const renderItem = ({item}) => {
    return (
      <View style={style.itemWrapperStyle}>
        <Image style={style.itemImageStyle} source={{uri: item?.picture}} />
        <View style={style.contentWrapperStyle}>
          <Text style={style.txtNameStyle}>{`${item?.title} `}</Text>
          <Text style={style.txtEmailStyle}>
            Location : {`${item?.location} `}
          </Text>
          <Text style={style.txtEmailStyle}>
            Category : {`${item?.category} `}
          </Text>
          <Text style={style.txtEmailStyle}>
            Date : {moment(item?.date).format('LLLL').slice(0, 3)}
            {', '}
            {moment(item?.date).format('LLL')}
          </Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={style.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log(seacrhItem);
  console.log(currentPage + 'page');

  const handlePressEvent = () => {
    navigation.navigate('Home');
    setEvent([]);
    setCurrentPage(1);
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
            <Text style={style.textHeader}>Search Event</Text>
          )}
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerProfile}>
        <View>
          {/* <View style={style.profileWrapper}>
            <View style={style.photosContent}>
              <View style={style.photoIcons}>
                <ImageTemplate
                  src={detailEvent?.picture || null}
                  defaultImg={IMGEventDummy}
                  style={style.IMGProfiles}
                />
              </View>
            </View>
          </View> */}
          <View style={style.dataProfileWrapper}>
            <FlatList
              data={events}
              renderItem={renderItem}
              keyExtractor={item => `search-results-${item.id}`}
              ListFooterComponent={renderLoader}
              onEndReached={loadMoreItem}
              onEndReachedThreshold={0}
            />
          </View>
        </View>
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

  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 100,
    height: 140,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  txtEmailStyle: {
    color: '#777',
    width: 220,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default SearchResults;
