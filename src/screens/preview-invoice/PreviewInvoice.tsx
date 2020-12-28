import React, {Component} from 'react'
import {Button, Container, Text} from 'native-base'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {Image, StyleSheet} from 'react-native'

import {RootStackParamList} from '../../../App'

type PreviewInvoiceNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PreviewInvoice'
  >

type PreviewInvoiceRouteProp = RouteProp<RootStackParamList, 'PreviewInvoice'>

interface State {
  imageUri: string
  originalImageWidth: number
  originalImageHeight: number
}

interface Props {
  navigation: PreviewInvoiceNavigationProp
  route: PreviewInvoiceRouteProp
}

interface DetectedImageResult {
  left: number;
  top: number;
  width: number;
  height: number;
}

export class PreviewInvoice extends Component<Props, State> {
  async componentDidMount(): Promise<void> {
  }

  render(): JSX.Element {
    if (!this.state?.imageUri) {
      return <Container />
    }
    return (
      <Container style={{flex: 1}}>
        <Image
          source={{uri: this.props.route.params.imageUri}}
          style={{flex: 1}}
        />
        <Button block style={styles.processInvoiceButton}>
          <Text>Process Invoice</Text>
        </Button>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  processInvoiceButton: {
    backgroundColor: '#78ed68',
  },
})
