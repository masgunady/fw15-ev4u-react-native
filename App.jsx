import React from 'react';
import Main from './src/screens/Main';
import PushNotification from 'react-native-push-notification';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {setToken} from './src/redux/reducers/deviceToken';
import {PermissionsAndroid} from 'react-native';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
    store.dispatch(setToken(token));
  },
});
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
