import React, {useEffect, useState} from 'react'
import {Button, Container, Text} from 'native-base'
import {StackNavigationProp} from '@react-navigation/stack'
import {RouteProp} from '@react-navigation/native'
import {Image, StyleSheet} from 'react-native'
import {RootStackParamList} from '../../../App'
import ml from '@react-native-firebase/ml'
import analyzeInvoiceEntities from '../../api/invoice-processing';

type PreviewInvoiceNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PreviewInvoice'
>

type PreviewInvoiceRouteProp = RouteProp<RootStackParamList, 'PreviewInvoice'>

interface Props {
  navigation: PreviewInvoiceNavigationProp
  route: PreviewInvoiceRouteProp
}

export function PreviewInvoice ({navigation, route} : Props): JSX.Element {
  let [imageUri, setImageUri] = useState('')

  useEffect(() => {
    setImageUri(route.params.imageUri)
    const date = new Date().toISOString().split('T')[0]
    const time = new Date().toISOString().split('T')[1].split('.')[0]
    navigation.setOptions({
      title: `${date} ${time}`,
    })
  }, [])

  async function processInvoiceData(): Promise<void> {
    const processed = await ml().cloudDocumentTextRecognizerProcessImage(
      imageUri,
    )

    console.log('Found text in document: ', processed.text)
    const result = await analyzeInvoiceEntities(processed.text)
    console.log('result : ', result)
  }

  if (!imageUri) {
    return <Container />
  }

  return (
    <Container
      style={{
        flex: 1,
      }}>
      <Image
        source={{uri: imageUri}}
        style={{
          flex: 1,
        }}
      />
      <Button block style={styles.processInvoiceButton} onPress={processInvoiceData}>
        <Text>Process Invoice</Text>
      </Button>
    </Container>
  )
}

const styles = StyleSheet.create({
  processInvoiceButton: {
    backgroundColor: '#78ed68',
  },
})
