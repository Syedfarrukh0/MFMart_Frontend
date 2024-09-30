import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';

export const customerLogin = async (phone: string) => {
  try {
    console.log(phone);
    const res = await axios.post(`${BASE_URL}/customer/login`, {phone});
    // Destructure tokens and customer data
    const {accessToken, refreshToken, customer} = res.data;
    // Store tokens in your tokenStorage
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    // Set user state
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error: any) {
    // Type assertion for better error logging
    console.log('Login error: ', error);
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const res = await appAxios.get('/user');
    setUser(res.data.user);
  } catch (error: any) {
    // Type assertion for better error logging
    console.log('Login error: ', error);
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken') as string;
    const res = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = res.data.accessToken;
    const new_refresh_token = res.data.refreshToken;
    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error: any) {
    console.log('Refresh token error: ', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};
