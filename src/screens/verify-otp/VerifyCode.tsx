import React, { createRef, RefObject, useEffect, useState } from 'react';
import { Button, Container, Content, Text, Toast, View } from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { RouteProp } from '@react-navigation/native';
import { sendVerification, verifyOTPCode } from '../../api/auth';
import { Loader } from '../../components/Loader';
import sharedStyles from '../../styles/styles';

type VerifyCodeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VerifyCode'
>;

type VerifyCodeRouteProp = RouteProp<RootStackParamList, 'VerifyCode'>;

interface Props {
  navigation: VerifyCodeNavigationProp;
  route: VerifyCodeRouteProp;
}

const NUMBER_OF_INPUTS = 6;

export function VerifyCode({ navigation, route }: Props): JSX.Element {
  let inputRefs: Array<RefObject<TextInput>> = new Array(NUMBER_OF_INPUTS)
    .fill(0)
    .map(() => createRef());
  const [currentInputIndex, setCurrentInputIndex] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  async function resendCode() {
    try {
      const email = route?.params?.email;
      setShowLoader(true);
      await sendVerification({ email });
      setShowLoader(false);
      Toast.show({
        text: 'Another email with a new code has been sent.',
        buttonText: 'Okay',
        duration: 5000,
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {
      setShowLoader(false);
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 5000,
        position: 'bottom',
        type: 'danger',
      });
    }
  }

  async function verifyCode() {
    try {
      const email = route?.params?.email;
      await verifyOTPCode({ otp: Number(code), email });
      const originalRoute = route?.params?.originalRoute;
      if (originalRoute === 'ForgotPassword') {
        navigation.navigate('ResetPassword', { email });
      } else {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      Toast.show({
        text: error.message,
        buttonText: 'Okay',
        duration: 5000,
        position: 'bottom',
        type: 'danger',
      });
    }
  }

  useEffect(() => {
    if (code?.length === NUMBER_OF_INPUTS) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [currentInputIndex]);

  function handleChangeText(text: string): void {
    if (text) {
      if (currentInputIndex !== NUMBER_OF_INPUTS) {
        setCurrentInputIndex((prevInputIndex) => prevInputIndex + 1);
        let nextIndex = currentInputIndex + 1;
        if (code.length) {
          setCode(`${code}${text}`);
        } else if (!code.length) {
          setCode(text);
        }
        inputRefs[nextIndex]?.current?.focus();
      }
    }
  }

  function handleKeyboardBackSpace(
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ): void {
    if (event.nativeEvent?.key && event.nativeEvent?.key === 'Backspace') {
      if (currentInputIndex > 0) {
        setCurrentInputIndex((currentInputIndex) => currentInputIndex - 1);
        let nextIndex = currentInputIndex - 1;
        inputRefs[nextIndex]?.current?.focus();
        setCode(code.substr(0, nextIndex));
      }
    }
  }

  return (
    <Container style={{ flex: 1 }}>
      <Content style={sharedStyles.contentContainer}>
        <Loader visible={showLoader} />
        <Text style={sharedStyles.instruction}>Enter Verification Code.</Text>
        <Text style={sharedStyles.explanationText}>
          We sent an email to {route?.params?.email} with a verification code to
          verify your account.
        </Text>
        <View style={styles.textInputContainer}>
          {new Array(NUMBER_OF_INPUTS).fill(0).map((_, index) => {
            return (
              <TextInput
                ref={inputRefs[index]}
                onKeyPress={handleKeyboardBackSpace}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={handleChangeText}
                key={`input-${index}`}
                style={styles.textInput}
              />
            );
          })}
        </View>
        <Button
          disabled={buttonDisabled}
          block
          style={
            !buttonDisabled
              ? styles.activeVerifyCodeButton
              : styles.disabledVerifyCodeButton
          }
          onPress={verifyCode}>
          <Text uppercase={false}>Verify Code</Text>
        </Button>
        <Text style={styles.noEmailReceivedTextFirstPart}>
          Did not receive email?{' '}
          <Text
            onPress={resendCode}
            style={styles.noEmailReceivedTextSecondPart}>
            Resend code.
          </Text>
        </Text>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  noEmailReceivedTextFirstPart: {
    marginTop: responsiveHeight(2),
    color: '#000000',
  },
  noEmailReceivedTextSecondPart: {
    color: '#0000EE',
  },
  textInput: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    width: responsiveWidth(12),
    borderRadius: 3,
    textAlign: 'center',
  },
  textInputContainer: {
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(3),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  keyboardButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    flexBasis: 'auto',
    flexWrap: 'wrap',
  },
  keyboardButtons: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    width: responsiveWidth(28),
  },
  keyboardButtonContent: {
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  activeVerifyCodeButton: {
    backgroundColor: '#321AC6',
    borderRadius: 5,
  },
  disabledVerifyCodeButton: {
    backgroundColor: '#cccccc',
    borderRadius: 5,
  },
});
