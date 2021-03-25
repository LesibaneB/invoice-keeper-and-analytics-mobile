import { StackNavigationProp } from '@react-navigation/stack';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { RootStackParamList } from '../../../App';

type SignInNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

interface Props {
    navigation: SignInNavigationProp;
}

export function SignIn({}: Props): JSX.Element {
  return (
    <Container>
      <Content style={styles.contentContainer}>
        <Text style={styles.logo}> Logo Here</Text>
        <Text style={styles.instruction}>Login to your account</Text>
        <Form>
          <Item regular last style={styles.input}>
            <Input placeholder="Email" />
          </Item>
          <Item regular last style={styles.input}>
            <Input placeholder="Password" />
          </Item>
          <Text
            style={styles.forgotPasswordText}
            onPress={() => console.log('hello there')}>
            Forgot password?
          </Text>
          <Button block style={styles.signInButton}>
            <Text uppercase={false}>Sign In</Text>
          </Button>
          <Text style={styles.noAccountTextFirstPart}>
            Don't have an account?{' '}
            <Text style={styles.noAccountTextSecondPart}>Sign up.</Text>
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
  },
  logo: {
    marginTop: responsiveHeight(15),
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
    backgroundColor: 'blue',
    marginTop: responsiveHeight(3),
    borderRadius: 5,
  },
  noAccountTextFirstPart: {
    marginTop: responsiveHeight(2),
  },
  noAccountTextSecondPart: {
    color: '#0000EE',
  },
});
