import React, {Component} from 'react'
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

interface State {}

interface Props {
  navigation: ScanInvoiceNavigationProp
}

export default class ScanInvoice extends Component<Props, State> {
  private camera: any
  constructor(props: Props, state: State) {
    super(props, state)
    this.goBackToMainScreen = this.goBackToMainScreen.bind(this)
  }

  private scanInvoice = async (): Promise<void> => {
    try {
      if (this.camera) {
        const data = await this.camera.takePictureAsync({
          orientation: 'portrait',
        });
        this.props.navigation.navigate('PreviewInvoice', {imageUri: data.uri})
        // console.warn('takePictureResponse ', data);
        // const classificationResult = await AutoMLVisionModule.classifyImage(
        //   data.uri,
        // );
        // console.log('classificationResult : ', classificationResult);
        // const detectedImageResult = await AutoMLObjectDetection.detectObjectInImage(
        //   data.uri,
        // );
        // console.log('detectedImageResult : ', detectedImageResult);
      }
    } catch (e) {
      console.log('error result : ', e)
    }
  };

  private goBackToMainScreen(): void {
    this.props.navigation.goBack()
  }

  render(): JSX.Element {
    return (
      <Container style={{flex: 1}}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref
          }}
          style={{flex: 1}}
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
            onPress={this.goBackToMainScreen}
            name="close"
            style={styles.closeButton}
            type="Ionicons"
            color="white"
          />
          <CameraButton onPress={this.scanInvoice} />
        </RNCamera>
      </Container>
    );
  }
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
