import React from 'react';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  View,
  Toast,
} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
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
import {SignInData} from '../../models/SignIn';
import {signIn} from '../../api/auth';

type SignInNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

interface Props {
  navigation: SignInNavigationProp;
}

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_FORMAT_NOT_VALID),
  password: yup.string().min(6, PASSWORD_LENGTH_NOT_VALID),
});

export function SignIn({navigation}: Props): JSX.Element {
  const {control, handleSubmit, errors} = useForm<SignInData>({
    resolver: yupResolver(schema),
  });

  async function submit(data: SignInData) {
    try {
      await signIn(data);
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

  function navigateToForgotPassword() {
    console.log('Push to Forgot Password.');
  }

  function navigateToSignUp() {
    navigation.navigate('SignUp');
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
