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
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
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

  async function submit(data: SignUpData) {
    try {
      await signUp(data);
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

  function navigateToSignIn() {
    navigation.goBack();
  }

  return (
    <Container style={{ flex: 1 }}>
      <Content style={styles.contentContainer}>
        <View style={styles.logo}>
          <Logo width={100} height={100} />
        </View>
        <Text style={styles.instruction}>Create your Account.</Text>
        <Form>
          <Controller
            control={control}
            render={({ onBlur, value, onChange }) => (
              <>
                <Item regular last style={styles.input}>
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
                <Item regular last style={styles.input}>
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
            style={styles.signUpButton}
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
  contentContainer: {
    marginLeft: responsiveWidth(8),
    marginRight: responsiveWidth(8),
    flex: 1,
  },
  logo: {
    marginTop: responsiveHeight(10),
    flex: 1,
    alignSelf: 'center',
  },
  instruction: {
    marginTop: responsiveHeight(5),
    fontSize: responsiveFontSize(2.3),
  },
  input: {
    borderRadius: 5,
    marginTop: responsiveHeight(2),
  },
  signUpButton: {
    backgroundColor: '#321AC6',
    marginTop: responsiveHeight(2),
    borderRadius: 5,
  },
  haveAnAccountTextFirstPart: {
    marginTop: responsiveHeight(2),
    color: '#000000',
  },
  haveAnAccountTextSecondPart: {
    color: '#0000EE',
  },
});
