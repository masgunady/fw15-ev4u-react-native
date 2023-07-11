import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {store} from '../../redux/store';
import {setTransactionData} from '../../redux/reducers/transaction';
import {useFocusEffect} from '@react-navigation/native';

const DetailTransaction = ({route, navigation}) => {
  const {id} = route.params;
  const token = useSelector(state => state.auth.token);
  const [detailTransaction, setDetailTransaction] = React.useState({});

  useFocusEffect(
    React.useCallback(() => {
      const getDetailTransaction = async () => {
        const {data} = await http(token).get(`/history/${id}`);
        setDetailTransaction(data.results);
      };
      getDetailTransaction(id);
    }, [token, id]),
  );

  const handlePressEvent = () => {
    navigation.navigate('MyBooking');
  };
  const dataBooking = {
    eventId: detailTransaction?.eventId,
    eventName: detailTransaction?.title,
    reservationId: detailTransaction?.reservationId,
    sectionName: detailTransaction?.ticketSection,
    quantity: detailTransaction?.quantity,
    totalPayment: detailTransaction?.totalPrice,
  };
  const handlePressPayment = () => {
    store.dispatch(setTransactionData(dataBooking));
    navigation.navigate('Payment');
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
          <Text style={style.textHeader}>Transaction</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <ScrollView style={style.containerWishlist}>
        <View style={style.wrapperWishlist}>
          <View>
            <Text style={style.textDetaiBold}>
              Order ID : {detailTransaction?.reservationId}
            </Text>
          </View>
          <View style={style.containerInfoPayment}>
            <View style={style.sectInfoPayment}>
              <Text style={style.textLite}>Grand Total</Text>
              <Text style={style.textDetaiBold}>
                IDR {detailTransaction?.totalPrice}
              </Text>
            </View>
            <View style={style.sectInfoPayment}>
              <Text style={style.textLite}>Order Paid Date</Text>
              <Text style={style.textDetaiBold}>
                {detailTransaction?.paymentMethod === 'Not Defined'
                  ? '-'
                  : moment(detailTransaction?.paymentDate).format('DD/MM/YY')}
              </Text>
            </View>
          </View>

          <View style={style.sectInfoPayment}>
            <Text style={style.textDetaiBold}>Order Details</Text>
            <View style={style.containerInfoPaymentBetween}>
              <View style={style.sectInfoPayment}>
                <Text style={style.textLite}>
                  {detailTransaction?.title} - Tickets
                </Text>
                <Text style={style.textLite}>
                  {detailTransaction?.location}, Indonesia
                </Text>
                <Text style={style.textLite}>
                  {moment(detailTransaction?.date).format('LLLL').slice(0, 3)}
                  {', '}
                  {moment(detailTransaction?.date).format('LLL')}
                </Text>
              </View>
              <View style={style.itemEnd}>
                <Text style={style.textLite}>
                  x{detailTransaction?.quantity}
                </Text>
                <Text style={style.textLiteUpp}>
                  IDR {detailTransaction?.ticketPrice}
                </Text>
              </View>
            </View>
          </View>
          <View style={style.onlyHR} />
          <View style={style.sectInfoPayment}>
            <Text style={style.textDetaiBold}>Payment Details</Text>
            <View style={style.containerInfoPaymentBetweenList}>
              <Text style={style.textLite}>payment method</Text>
              <View style={style.itemEnd}>
                <Text style={style.textLite}>
                  {detailTransaction?.paymentMethod}
                </Text>
              </View>
            </View>
            <View style={style.containerInfoPaymentBetweenList}>
              <Text style={style.textLite}>section</Text>
              <View style={style.itemEnd}>
                <Text style={style.textLiteUpp}>
                  {detailTransaction?.ticketSection}
                </Text>
              </View>
            </View>
            <View style={style.containerInfoPaymentBetweenList}>
              <Text style={style.textLite}>ticket price</Text>
              <View style={style.itemEnd}>
                <Text style={style.textLiteUpp}>
                  IDR {detailTransaction?.ticketPrice}
                </Text>
              </View>
            </View>
            <View style={style.containerInfoPaymentBetweenList}>
              <Text style={style.textLite}>Quantity</Text>
              <View style={style.itemEnd}>
                <Text style={style.textLite}>
                  x {detailTransaction?.quantity}
                </Text>
              </View>
            </View>
            <View style={style.containerInfoPaymentBetweenList}>
              <Text style={style.textLiteBold}>Grand Total</Text>
              <View style={style.itemEnd}>
                <Text style={style.textLiteUppBold}>
                  IDR {detailTransaction?.totalPrice}
                </Text>
              </View>
            </View>
            {detailTransaction?.paymentMethod === 'Not Defined' && (
              <View style={style.btnContainer}>
                <TouchableOpacity
                  style={style.touchButton}
                  onPress={() => handlePressPayment()}>
                  <Text style={style.textTouch}>Change Payment Methods</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  textTouch: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
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
  btnContainer: {
    paddingTop: 50,
    width: '100%',
  },
  itemEnd: {
    alignItems: 'flex-end',
  },
  containerInfoPaymentBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  containerInfoPaymentBetweenList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  containerInfoPayment: {
    flexDirection: 'row',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 2,
    paddingBottom: 20,
  },
  onlyHR: {borderBottomColor: '#EAEAEA', borderBottomWidth: 2},
  sectInfoPayment: {
    flex: 1,
    gap: 5,
  },
  textDetaiBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'black',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  textLite: {
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize',
  },
  textLiteBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
    textTransform: 'capitalize',
  },
  textLiteUpp: {
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    color: 'black',
    textTransform: 'uppercase',
  },
  textLiteUppBold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
    textTransform: 'uppercase',
  },
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
    width: 230,
    textAlign: 'center',
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

export default DetailTransaction;
