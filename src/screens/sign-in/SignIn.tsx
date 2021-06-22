import React, { useContext, useState } from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { RootStackParamList } from '../../../App';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputError } from '../../components/InputError';
import {
  EMAIL_FORMAT_NOT_VALID,
  PASSWORD_LENGTH_NOT_VALID,
} from '../../utils/messages';
import Logo from '../../images/Invoice Scanner Logo.svg';
import { SignInData } from '../../models/SignIn';
import { signIn } from '../../api/auth';
import { Loader } from '../../components/Loader';
import { save } from '../../secure-store/secure-store';
import { AUTH_TOKEN_KEY } from '../../utils/consts';
import UserStore from '../../store/user';
import { observer } from 'mobx-react';
import sharedStyles from '../../styles/styles';

type SignInNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

interface Props {
  navigation: SignInNavigationProp;
}

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_FORMAT_NOT_VALID),
  password: yup.string().min(6, PASSWORD_LENGTH_NOT_VALID),
});

const SignIn = ({ navigation }: Props): JSX.Element => {
  const { control, handleSubmit, errors } = useForm<SignInData>({
    resolver: yupResolver(schema),
  });
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const userStore = useContext(UserStore);

  async function submit(data: SignInData) {
    try {
      setShowLoader(true);
      const authToken = await signIn(data);
      await save(AUTH_TOKEN_KEY, JSON.stringify(authToken));
      userStore.setIsSignedIn(true);
      setShowLoader(false);
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

  function navigateToForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  function navigateToSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <Container style={{ flex: 1 }}>
      <Content style={sharedStyles.contentContainer}>
        <Loader visible={showLoader} />
        <View style={sharedStyles.logo}>
          <Logo width={100} height={100} />
        </View>
        <Text style={sharedStyles.instruction}>Sign in to your Account.</Text>
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
          <Text
            style={styles.forgotPasswordText}
            onPress={navigateToForgotPassword}>
            Forgot password?
          </Text>
          <Button
            block
            style={sharedStyles.actionButton}
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
};

const styles = StyleSheet.create({
  forgotPasswordText: {
    flex: 1,
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(2),
    color: '#0000EE',
  },
  noAccountTextFirstPart: {
    marginTop: responsiveHeight(2),
    color: '#000000',
  },
  noAccountTextSecondPart: {
    color: '#0000EE',
  },
});

export default observer(SignIn);
