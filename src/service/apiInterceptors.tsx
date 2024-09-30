import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {refresh_tokens} from './authService';
import {Alert} from 'react-native';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  res => res,
  async error => {
    if (error.res && error.res.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorizaton = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log('Error refreshing token: ', error);
      }
    }

    if (error.res && error.res.status !== 401) {
      const errorMessage = error.res.data.message || 'Something went wrong';
      Alert.alert(errorMessage);
    }

    return Promise.resolve(error);
  },
);
