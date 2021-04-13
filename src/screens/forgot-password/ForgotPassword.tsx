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
import { sendVerification } from '../../api/auth';
import { Loader } from '../../components/Loader';
import sharedStyles from '../../styles/styles';

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
      navigation.navigate('VerifyCode', {
        email: data.email,
        originalRoute: 'ForgotPassword',
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

  return (
    <Container style={{ flex: 1 }}>
      <Content style={sharedStyles.contentContainer}>
        <Loader visible={showLoader} />
        <Text style={sharedStyles.instruction}>Reset Password.</Text>
        <Text style={sharedStyles.explanationText}>
          Enter the email associated with your Account and we'll send an email
          with a verification code.
        </Text>
        <Form>
          <Controller
            control={control}
            render={({ onBlur, value, onChange }) => (
              <>
                <Item regular last style={sharedStyles.input}>
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
            style={sharedStyles.actionButton}
            onPress={handleSubmit(submit)}>
            <Text uppercase={false}>Send Code</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
