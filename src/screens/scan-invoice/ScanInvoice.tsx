import React from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../../App'
import {StyleSheet} from 'react-native'
import {Container, Icon} from 'native-base'
import {RNCamera} from 'react-native-camera'
import {CameraButton} from '../../components/CameraButton'

type ScanInvoiceNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScanInvoice'
>

interface Props {
  navigation: ScanInvoiceNavigationProp
}

export default function ScanInvoice({ navigation }: Props): JSX.Element {
  let camera: any

  async function scanInvoice (): Promise<void> {
    try {
      if (camera) {
        const data = await camera.takePictureAsync({
          orientation: 'portrait',
        })
        navigation.navigate('PreviewInvoice', {imageUri: data.uri})
      }
    } catch (e) {
      console.log('error result : ', e)
    }
  }

  function goBackToMainScreen(): void {
    navigation.goBack()
  }

  return (
    <Container
      style={{
        flex: 1,
      }}>
      <RNCamera
        ref={(ref) => {
          camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <Icon
          onPress={goBackToMainScreen}
          name="close"
          style={styles.closeButton}
          type="Ionicons"
          color="white"
        />
        <CameraButton onPress={scanInvoice} />
      </RNCamera>
    </Container>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 50,
    alignSelf: 'flex-end',
    marginRight: 40,
    fontSize: 40,
    color: 'white',
  },
})
