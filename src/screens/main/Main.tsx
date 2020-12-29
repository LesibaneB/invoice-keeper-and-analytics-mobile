import React from 'react'
import {Button, Container, Content, Text} from 'native-base'
import {StyleSheet} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../../App'

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>

interface Props {
  navigation: MainScreenNavigationProp
}

export default function Main({navigation}: Props): JSX.Element {
  function navigateToScanInvoiceScreen(): void {
    navigation.navigate('ScanInvoice')
  }

  return (
    <Container
      style={{
        flex: 1,
      }}>
      <Content
        style={{
          flex: 1,
        }}>
        <Button
          block
          style={styles.scanInvoiceButton}
          onPress={navigateToScanInvoiceScreen}>
          <Text>Scan Invoice</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  scanInvoiceButton: {
    marginTop: 650,
    backgroundColor: '#78ed68',
  },
})
