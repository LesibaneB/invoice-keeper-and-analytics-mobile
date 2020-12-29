import React from 'react'
import Main from './src/screens/main/Main'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import ScanInvoice from './src/screens/scan-invoice/ScanInvoice'
import {PreviewInvoice} from './src/screens/preview-invoice/PreviewInvoice'

export type RootStackParamList = {
  Main: undefined
  ScanInvoice: undefined
  PreviewInvoice: { imageUri: string }
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App(): JSX.Element {
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
          options={{
            headerShown: false,
          }}
          name="ScanInvoice"
          component={ScanInvoice}
        />
        <Stack.Screen name="PreviewInvoice" component={PreviewInvoice} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
