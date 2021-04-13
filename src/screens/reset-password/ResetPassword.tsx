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
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { RootStackParamList } from '../../../App';
import { InputError } from '../../components/InputError';
import { ResetPasswordData } from '../../models/ResetPasswordData';
import * as yup from 'yup';
import {
  PASSWORDS_DO_NOT_MATCH,
  PASSWORD_LENGTH_NOT_VALID,
} from '../../utils/messages';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp } from '@react-navigation/native';
import { resetPassword } from '../../api/auth';
import { Loader } from '../../components/Loader';

type ResetPasswordNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;

type ResetPasswordRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

interface Props {
  navigation: ResetPasswordNavigationProp;
  route: ResetPasswordRouteProp;
}

const schema = yup.object().shape({
  password: yup.string().min(6, PASSWORD_LENGTH_NOT_VALID),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], PASSWORDS_DO_NOT_MATCH)
    .min(6, PASSWORD_LENGTH_NOT_VALID),
});

export function ResetPassword({ navigation, route }: Props): JSX.Element {
  const { control, handleSubmit, errors } = useForm<ResetPasswordData>({
    resolver: yupResolver(schema),
  });
  const [showLoader, setShowLoader] = useState<boolean>(false);

  async function submit(data: ResetPasswordData) {
    try {
      const email = route?.params?.email;
      const { password, confirmPassword } = data;
      setShowLoader(true);
      await resetPassword(email, password, confirmPassword);
      setShowLoader(false);
      navigation.navigate('Main');
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
        <Text style={styles.instruction}>Create new Password.</Text>
        <Text style={styles.explanationText}>
          Your new password must be different from your previous password.
        </Text>
        <Form>
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <>
                <Item regular last style={styles.input}>
                  <Input
                    placeholder="Password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    secureTextEntry={true}
                  />
                </Item>
                {errors.password && (
                  <InputError message={errors.password?.message} />
                )}
              </>
            )}
            name="password"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <>
                <Item regular last style={styles.input}>
                  <Input
                    placeholder="Confirm Password"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    secureTextEntry={true}
                  />
                </Item>
                {errors.confirmPassword && (
                  <InputError message={errors.confirmPassword?.message} />
                )}
              </>
            )}
            name="confirmPassword"
            defaultValue=""
          />
          <Button
            block
            style={styles.resetPasswordButton}
            onPress={handleSubmit(submit)}>
            <Text uppercase={false}>Reset Password</Text>
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
  resetPasswordButton: {
    backgroundColor: '#321AC6',
    marginTop: responsiveHeight(3),
    borderRadius: 5,
  },
});
