import React from 'react';
import Main from './src/screens/main/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScanInvoice from './src/screens/scan-invoice/ScanInvoice';
import {PreviewInvoice} from './src/screens/preview-invoice/PreviewInvoice';
import {SignIn} from './src/screens/sign-in/SignIn';
import {Root} from 'native-base';
import { SignUp } from './src/screens/sign-up/SignUp';

export type RootStackParamList = {
  Main: undefined;
  ScanInvoice: undefined;
  PreviewInvoice: {imageUri: string};
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const isSignedIn = false;
  return (
    <NavigationContainer>
      <Root>
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
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
              name="SignIn"
              options={{
                headerShown: false,
              }}
              component={SignIn}
            />
            <Stack.Screen
              name="SignUp"
              options={{
                headerShown: false,
              }}
              component={SignUp}
            />
          </Stack.Navigator>
        )}
      </Root>
    </NavigationContainer>
  );
}
