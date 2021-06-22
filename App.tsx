import React, { useContext, useEffect } from 'react';
import Main from './src/screens/main/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanInvoice from './src/screens/scan-invoice/ScanInvoice';
import { PreviewInvoice } from './src/screens/preview-invoice/PreviewInvoice';
import SignIn from './src/screens/sign-in/SignIn';
import { Root } from 'native-base';
import { SignUp } from './src/screens/sign-up/SignUp';
import { ForgotPassword } from './src/screens/forgot-password/ForgotPassword';
import { VerifyCode } from './src/screens/verify-otp/VerifyCode';
import { ResetPassword } from './src/screens/reset-password/ResetPassword';
import { getValueFor } from './src/secure-store/secure-store';
import { AUTH_TOKEN_KEY } from './src/utils/consts';
import { observer } from 'mobx-react';
import UserStore from './src/store/user';
import { JwtToken } from './src/models/JwtToken';

export type RootStackParamList = {
  Main: undefined;
  ScanInvoice: undefined;
  PreviewInvoice: { imageUri: string };
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyCode: {
    email: string;
    originalRoute: 'SignUp' | 'ForgotPassword';
  };
  ResetPassword: { email: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  const userStore = useContext(UserStore);

  useEffect(() => {
    const getStoredToken = async () => {
      const stringifiedToken = await getValueFor(AUTH_TOKEN_KEY);
      if (stringifiedToken) {
        const jsonToken: JwtToken = JSON.parse(stringifiedToken);
        userStore.setIsSignedIn(true);
        userStore.setToken(jsonToken);
      }
    };

    getStoredToken();
  }, []);

  return (
    <NavigationContainer>
      <Root>
        {userStore.isSignedIn ? (
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              options={{
                headerTitle: 'Invoices',
                headerTitleAlign: 'center',
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
            <Stack.Screen
              name="ForgotPassword"
              options={{
                headerShown: true,
                title: '',
              }}
              component={ForgotPassword}
            />
            <Stack.Screen
              name="VerifyCode"
              options={{
                headerShown: true,
                title: '',
              }}
              component={VerifyCode}
            />
            <Stack.Screen
              name="ResetPassword"
              options={{
                headerShown: true,
                title: '',
              }}
              component={ResetPassword}
            />
          </Stack.Navigator>
        )}
      </Root>
    </NavigationContainer>
  );
};

export default observer(App);
