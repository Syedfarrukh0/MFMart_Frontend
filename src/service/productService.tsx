import {BASE_URL} from './config';
import axios from 'axios';

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/categories`);
    // Return success response
    return {success: true, data: res.data} as any;
    // return res.data;
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

export const getProductsByCategoryId = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${id}`);
    // Return success response
    return {success: true, data: res.data} as any;
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
