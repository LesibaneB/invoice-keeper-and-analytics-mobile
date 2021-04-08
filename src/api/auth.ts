import { ForgotPasswordData } from './../models/ForgotPassword';
import axios from 'axios';
import { SignInData } from '../models/SignIn';
import { SignUpData } from '../models/SignUp';

export async function signIn({ email, password }: SignInData): Promise<void> {
  try {
    await axios.post<void>('http://192.168.0.101:7000/auth/sign-in', {
      emailAddress: email,
      password,
    });
  } catch (error) {
    throw error.response.data;
  }
}

export async function signUp({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: SignUpData): Promise<void> {
  try {
    await axios.post<void>('http://192.168.0.101:7000/auth/account', {
      firstName,
      lastName,
      emailAddress: email,
      password,
      confirmPassword,
    });
  } catch (error) {
    throw error.response.data;
  }
}

export async function forgotPassword({
  email,
}: ForgotPasswordData): Promise<void> {
  try {
    await axios.post<void>(
      'http://192.168.0.101:7000/auth/account/send-verification',
      {
        emailAddress: email,
      },
    );
  } catch (error) {
    throw error.response.data;
  }
}
