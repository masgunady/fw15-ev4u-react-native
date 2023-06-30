import React from 'react';
import {
  SplashScreen,
  SignIn,
  Register,
  ForgotPassword,
  ResetPassword,
  Home,
  Profile,
} from './index';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import {useDispatch} from 'react-redux';
import {logout} from '../redux/reducers/auth';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => dispatch(logout())}
        icon={({focused, color, size}) => (
          <FeatherIcon name="log-out" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#eaeaea',
          width: 240,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{drawerLabel: () => null}}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color, size}) => (
            <FontAwesome5Icon name="home" color={color} size={size} />
          ),
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color, size}) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),
          drawerLabel: 'Profile',
        }}
      />
    </Drawer.Navigator>
  );
}

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {!token && (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </AuthStack.Navigator>
      )}
      {token && (
        <>
          <MyDrawer />
        </>
      )}
    </NavigationContainer>
  );
};

export default Main;
