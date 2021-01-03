import React from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../../../App'
import {StyleSheet} from 'react-native'
import {Icon} from 'native-base'
import {RNCamera} from 'react-native-camera'
import {CameraButton} from '../../components/CameraButton'
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen'

type ScanInvoiceNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScanInvoice'
>

interface Props {
  navigation: ScanInvoiceNavigationProp
}

export default function ScanInvoice({ navigation }: Props): JSX.Element {
  let camera: any

  async function scanInvoice(): Promise<void> {
    try {
      if (camera) {
        const data = await camera.takePictureAsync({
          orientation: 'portrait',
        });
        navigation.navigate('PreviewInvoice', {imageUri: data.uri});
      }
    } catch (e) {
      console.log('error result : ', e)
    }
  }

  function goBackToMainScreen(): void {
    navigation.goBack()
  }

  return (
    <RNCamera
      ref={(ref) => {
        camera = ref
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
        type="MaterialIcons"
        color="white"
      />
      <CameraButton onPress={scanInvoice} />
    </RNCamera>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    marginTop: heightPercentageToDP(5),
    alignSelf: 'flex-end',
    marginRight: widthPercentageToDP(8),
    fontSize: heightPercentageToDP(5),
    color: 'white',
  },
})
