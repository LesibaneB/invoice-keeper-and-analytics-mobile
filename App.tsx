import React from 'react';
import Main from './src/screens/main/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScanInvoice from './src/screens/scan-invoice/ScanInvoice';
import {PreviewInvoice} from './src/screens/preview-invoice/PreviewInvoice';
import {SignIn} from './src/screens/sign-in/SignIn';

export type RootStackParamList = {
  Main: undefined;
  ScanInvoice: undefined;
  PreviewInvoice: {imageUri: string};
  SignIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const isSignedIn = false;
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Main"
            component={Main}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ScanInvoice"
            component={ScanInvoice}
          />
          <Stack.Screen name="PreviewInvoice" component={PreviewInvoice} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="SignIn"
            options={{
              headerShown: false,
            }}
            component={SignIn}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
