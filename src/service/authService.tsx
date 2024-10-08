import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';
import {Alert} from 'react-native';

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    // Destructure tokens and delivery partner data
    const {accessToken, refreshToken, deliveryPartner} = res.data;
    // Store tokens
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    // Set user state
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
    // Return success response
    return {success: true, data: deliveryPartner} as any;
  } catch (error: any) {
    let errorResponse = {
      success: false,
      message: 'An error occurred',
      status: 0,
      errorData: null,
    };
    if (error.response) {
      // Server responded with a status code other than 2xx
      errorResponse.status = error.response.status;
      errorResponse.errorData = error.response.data;
      errorResponse.message = error.response.data.message || 'Server Error';
    } else if (error.request) {
      // The request was made but no response was received
      errorResponse.message = 'Network Error: No response from server';
    } else {
      // Something else happened
      errorResponse.message = `Request error: ${error.message}`;
    }
    // Ensure error details are returned
    return {errorResponse: errorResponse} as any;
  }
};

export const customerLogin = async (phone: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/customer/login`, {phone});
    // Destructure tokens and customer data
    const {accessToken, refreshToken, customer} = res.data;
    // Store tokens in your tokenStorage
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    // Set user state
    const {setUser} = useAuthStore.getState();
    setUser(customer);
    return {success: true, data: customer} as any;
  } catch (error: any) {
    let errorResponse = {
      success: false,
      message: 'An error occurred',
      status: 0,
      errorData: null,
    };
    if (error.response) {
      // Server responded with a status code other than 2xx
      errorResponse.status = error.response.status;
      errorResponse.errorData = error.response.data;
      errorResponse.message = error.response.data.message || 'Server Error';
    } else if (error.request) {
      // The request was made but no response was received
      errorResponse.message = 'Network Error: No response from server';
    } else {
      // Something else happened
      errorResponse.message = `Request error: ${error.message}`;
    }
    // Ensure error details are returned
    return {errorResponse: errorResponse} as any;
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const res = await appAxios.get('/user');
    // console.log('Response data: ', res.data); // Log the response data
    if (res.data && res.data.user) {
      setUser(res.data.user);
    } else {
      console.log('User data not found in the response');
    }
  } catch (error: any) {
    console.log('Login error: ', error); // Keep logging the error
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
