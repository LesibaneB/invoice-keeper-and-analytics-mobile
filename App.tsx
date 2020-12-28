import React, {Component} from 'react';
import Main from './src/screens/main/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScanInvoice from './src/screens/scan-invoice/ScanInvoice';
import {PreviewInvoice} from './src/screens/preview-invoice/PreviewInvoice';

interface State {
  isReady: boolean;
}

interface Props {}

export type RootStackParamList = {
  Main: undefined
  ScanInvoice: undefined
  PreviewInvoice: { imageUri: string }
};

const Stack = createStackNavigator<RootStackParamList>()

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Main"
            component={Main}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ScanInvoice"
            component={ScanInvoice}
          />
          <Stack.Screen
            name="PreviewInvoice"
            component={PreviewInvoice}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
