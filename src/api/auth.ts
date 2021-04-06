import axios from 'axios';

export default async function signIn(
  email: string,
  password: string,
): Promise<void> {
  try {
    await axios.post<void>('http://192.168.0.101:7000/auth/sign-in', {
      emailAddress: email,
      password,
    });
  } catch (error) {
    throw error.response.data;
  }
}
