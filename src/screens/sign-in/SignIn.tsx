import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  View,
} from 'native-base';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {RootStackParamList} from '../../../App';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputError} from '../../components/InputError';
import {
  EMAIL_FORMAT_NOT_VALID,
  PASSWORD_LENGTH_NOT_VALID,
} from '../../utils/messages';
import Logo from '../../images/Invoice Scanner Logo.svg';

type SignInNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

interface Props {
  navigation: SignInNavigationProp;
}

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_FORMAT_NOT_VALID),
  password: yup.string().min(6, PASSWORD_LENGTH_NOT_VALID),
});

export function SignIn({}: Props): JSX.Element {
  const {control, handleSubmit, errors} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function submit(data: FormData) {
    console.log(data);
  }

  function navigateToForgotPassword() {
    console.log('Push to Forgot Password.');
  }

  function navigateToSignUp() {
    console.log('Push to Sign Up.');
  }

  return (
    <Container style={{flex: 1}}>
      <Content style={styles.contentContainer}>
        <View style={styles.logo}>
          <Logo width={100} height={100} />
        </View>
        <Text style={styles.instruction}>Sign in to your account.</Text>
        <Form>
          <Controller
            control={control}
            render={({onBlur, value, onChange}) => (
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
            render={({onBlur, onChange, value}) => (
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
          <Text
            style={styles.forgotPasswordText}
            onPress={navigateToForgotPassword}>
            Forgot password?
          </Text>
          <Button
            block
            style={styles.signInButton}
            onPress={handleSubmit(submit)}>
            <Text uppercase={false}>Sign In</Text>
          </Button>
          <Text style={styles.noAccountTextFirstPart}>
            Don't have an account?{' '}
            <Text
              onPress={navigateToSignUp}
              style={styles.noAccountTextSecondPart}>
              Sign Up.
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
  forgotPasswordText: {
    flex: 1,
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(2),
    color: '#0000EE',
  },
  signInButton: {
    backgroundColor: '#321AC6',
    marginTop: responsiveHeight(2),
    borderRadius: 5,
  },
  noAccountTextFirstPart: {
    marginTop: responsiveHeight(2),
    color: '#000000',
  },
  noAccountTextSecondPart: {
    color: '#0000EE',
  },
});
