import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceToken from './deviceToken';
import eventId from './eventId';
import transaction from './transaction';
import profileData from './profileData';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  deviceToken,
  eventId,
  transaction,
  profileData,
});

export default reducer;
