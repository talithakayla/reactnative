import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const token = AsyncStorage.getItem('userToken')
console.log(token)
const api = axios.create({
  baseURL: 'http://54.254.164.127/api/v1',
  headers: {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token
  }
});

export const fetchPosts = async () => {
const token = await AsyncStorage.getItem('accessToken')

  try {
    const response = await api.get('/users/me', {
       headers: {
        Authorization: 'Bearer ' + token
       } 
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch posts: ' + error.message);
  }
};

export const fetchTransactions = async () => {
    const token = await AsyncStorage.getItem('accessToken')
    
      try {
        const response = await api.get('/transactions/', {
           headers: {
            Authorization: 'Bearer ' + token
           } 
        });
        return response.data.data;
      } catch (error) {
        throw new Error('Failed to fetch posts: ' + error.message);
      }
    };
    
    export const createPost = async (postData) => {
      const token = await AsyncStorage.getItem('accessToken')
      
      if (!token) {
        throw new Error('Authentication token is missing or invalid');
      }
    
      try {
        const response = await api.post('/transactions', postData, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        });
        return response.data;
      } catch (error) {
        throw new Error('Failed to create post: ' + error.message);
      }
    };

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { 
        email : email, 
        password : password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
};

export const register = async (fullname, email, password, avatar_url) => {
  try {
    const response = await api.post('/auth/register', { 
        full_name : fullname, 
        email : email, 
        password :password, 
        avatar_url :avatar_url
    });
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message);
  }
};


export default api;