import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  Toast,
} from 'native-base';
import React, { useState } from 'react';
import { RootStackParamList } from '../../../App';
import * as yup from 'yup';
import { EMAIL_FORMAT_NOT_VALID } from '../../utils/messages';
import { ForgotPasswordData } from '../../models/ForgotPassword';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputError } from '../../components/InputError';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { StyleSheet } from 'react-native';
import { sendVerification } from '../../api/auth';
import { Loader } from '../../components/Loader';

type ForgotPasswordNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

interface Props {
  navigation: ForgotPasswordNavigationProp;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email(EMAIL_FORMAT_NOT_VALID)
    .required(EMAIL_FORMAT_NOT_VALID),
});

export function ForgotPassword({ navigation }: Props): JSX.Element {
  const { control, handleSubmit, errors } = useForm<ForgotPasswordData>({
    resolver: yupResolver(schema),
  });
  const [showLoader, setShowLoader] = useState<boolean>(false);

  async function submit(data: ForgotPasswordData) {
    try {
      setShowLoader(true);
      await sendVerification(data);
      setShowLoader(false);
      navigation.navigate('VerifyCode', { email: data.email });
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

  return (
    <Container style={{ flex: 1 }}>
      <Content style={styles.contentContainer}>
        <Loader visible={showLoader} />
        <Text style={styles.instruction}>Reset Password.</Text>
        <Text style={styles.explanationText}>
          Enter the email associated with your Account and we'll send an email
          with a verification code.
        </Text>
        <Form>
          <Controller
            control={control}
            render={({ onBlur, value, onChange }) => (
              <>
                <Item regular last style={styles.input}>
                  <Input
                    placeholder="Email"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                  />
                </Item>
                {errors.email && <InputError message={errors.email?.message} />}
              </>
            )}
            name="email"
            defaultValue=""
          />
          <Button
            block
            style={styles.sendCodeButton}
            onPress={handleSubmit(submit)}>
            <Text uppercase={false}>Send Code</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginLeft: responsiveWidth(8),
    marginRight: responsiveWidth(8),
    flex: 1,
  },
  instruction: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.3),
  },
  input: {
    borderRadius: 5,
    marginTop: responsiveHeight(3),
  },
  explanationText: {
    flex: 1,
    marginTop: responsiveHeight(1),
    color: '#000000',
    textAlign: 'justify',
    fontSize: responsiveFontSize(1.8),
  },
  sendCodeButton: {
    backgroundColor: '#321AC6',
    marginTop: responsiveHeight(3),
    borderRadius: 5,
  },
});
