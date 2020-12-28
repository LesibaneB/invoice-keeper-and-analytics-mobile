import React, {Component} from 'react';
import {Button, Container, Content, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>

interface State {}

interface Props {
  navigation: MainScreenNavigationProp
}

export default class Main extends Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.navigateToScanInvoiceScreen = this.navigateToScanInvoiceScreen.bind(
      this,
    )
  }

  private navigateToScanInvoiceScreen(): void {
    this.props.navigation.navigate('ScanInvoice')
  }

  render(): JSX.Element {
    return (
      <Container style={{flex: 1}}>
        <Content style={{flex: 1}}>
          <Button
            block
            style={styles.scanInvoiceButton}
            onPress={this.navigateToScanInvoiceScreen}>
            <Text>Scan Invoice</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  scanInvoiceButton: {
    marginTop: 650,
    backgroundColor: '#78ed68',
  },
})
