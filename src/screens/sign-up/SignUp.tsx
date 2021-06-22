import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  Toast,
  View,
} from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { InputError } from '../../components/InputError';
import Logo from '../../images/Invoice Scanner Logo.svg';
import {
  EMAIL_FORMAT_NOT_VALID,
  PASSWORDS_DO_NOT_MATCH,
  PASSWORD_LENGTH_NOT_VALID,
} from '../../utils/messages';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { SignUpData } from '../../models/SignUp';
import { signUp } from '../../api/auth';
import { Loader } from '../../components/Loader';
import sharedStyles from '../../styles/styles';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: SignUpNavigationProp;
}

const schema = yup.object().shape({
  firstname: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(EMAIL_FORMAT_NOT_VALID),
  password: yup.string().min(6, PASSWORD_LENGTH_NOT_VALID),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], PASSWORDS_DO_NOT_MATCH)
    .min(6, PASSWORD_LENGTH_NOT_VALID),
});

export function SignUp({ navigation }: Props): JSX.Element {
  const { control, handleSubmit, errors } = useForm<SignUpData>({
    resolver: yupResolver(schema),
  });
  const [showLoader, setShowLoader] = useState<boolean>(false);

  async function submit(data: SignUpData) {
    try {
      setShowLoader(true);
      await signUp(data);
      setShowLoader(false);
      navigation.navigate('VerifyCode', {
        email: data.email,
        originalRoute: 'SignUp',
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

  function navigateToSignIn() {
    navigation.navigate('SignIn');
  }

  return (
    <Container style={{ flex: 1 }}>
      <Content style={sharedStyles.contentContainer}>
        <Loader visible={showLoader} />
        <View style={sharedStyles.logo}>
          <Logo width={100} height={100} />
        </View>
        <Text style={sharedStyles.instruction}>Create your Account.</Text>
        <Form>
          <Controller
            control={control}
            render={({ onBlur, value, onChange }) => (
              <>
                <Item regular last style={sharedStyles.input}>
                  <Input
                    placeholder="First Name"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                  />
                </Item>
                {errors.firstName && (
                  <InputError message={errors.firstName?.message} />
                )}
              </>
            )}
            name="firstName"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ onBlur, value, onChange }) => (
              <>
                <Item regular last style={sharedStyles.input}>
                  <Input
                    placeholder="Last Name"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                  />
                </Item>
                {errors.lastName && (
                  <InputError message={errors.lastName?.message} />
                )}
              </>
            )}
            name="lastName"
            defaultValue=""
          />
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
          <Controller
            control={control}
            render={({ onBlur, onChange, value }) => (
              <>
                <Item regular last style={sharedStyles.input}>
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
                <Item regular last style={sharedStyles.input}>
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
            style={sharedStyles.actionButton}
            onPress={handleSubmit(submit)}>
            <Text uppercase={false}>Sign Up</Text>
          </Button>
          <Text style={styles.haveAnAccountTextFirstPart}>
            Already have an account?{' '}
            <Text
              onPress={navigateToSignIn}
              style={styles.haveAnAccountTextSecondPart}>
              Sign In.
            </Text>
          </Text>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  haveAnAccountTextFirstPart: {
    marginTop: responsiveHeight(2),
    color: '#000000',
  },
  haveAnAccountTextSecondPart: {
    color: '#0000EE',
  },
});
