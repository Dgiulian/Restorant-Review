import axios from 'axios';
import { IAddResponseParams, IAddReviewParams, IUser } from '../types';

const SERVER_URL = 'http://localhost:5000/v1';
const UPLOADS_URL = 'http://localhost:5000/uploads';
export interface ILoginBody {
  email: string;
  password: string;
}
export interface IRegisterBody {
  email: string;
  name: string;
  role: 'user' | 'owner' | 'admin';
  password: string;
}
interface IRefreshTokenBody {
  email: string;
  password: string;
}
export interface ILoginResponse {
  tokens: {
    access: {
      expires: string;
      token: string;
    };
    refresh: {
      expires: string;
      token: string;
    };
  };

  user: IUser;
}
interface ILoginError {
  code: number;
  text: string;
  stack: string;
}
//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem('refreshToken');
    if (
      refreshToken &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${SERVER_URL}/auth/refresh-tokens`, {
          refreshToken: JSON.parse(refreshToken),
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem(
              'accessToken',
              JSON.stringify(res.data.access.token)
            );
            console.log('Access token refreshed!');
            return axios(originalRequest);
          }
        })
        .catch(console.error);
    }
    return Promise.reject(error);
  }
);
//functions to make api calls

export const register = async (body: IRegisterBody) => {
  try {
    const response = await axios.post<ILoginError | ILoginResponse>(
      `${SERVER_URL}/auth/register`,
      body
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (body: ILoginBody) => {
  try {
    const response = await axios.post<ILoginError | ILoginResponse>(
      `${SERVER_URL}/auth/login`,
      body
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const refreshToken = (body: IRefreshTokenBody) => {
  return axios.post(`${SERVER_URL}/auth/refresh-tokens`, body);
};

export const logout = (token: string) => {
  return axios.post(`${SERVER_URL}/auth/logout`, { refreshToken: token });
};

export const getProtected = () => {
  return axios.get(`${SERVER_URL}/protected_resource`);
};

export async function getRestaurantList(filter: number) {
  const resp = await axios.get(`${SERVER_URL}/restaurant?rating=${filter}`);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.data;
}
export async function getRestaurantByOnwer() {
  const resp = await axios.get(`${SERVER_URL}/restaurant/manage`);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.data;
}

export async function getRestaurantById(restaurantId: string) {
  const resp = await axios.get(`${SERVER_URL}/restaurant/${restaurantId}`);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  return resp.data;
}
interface ICreateRestaurantBody {
  name: string;
  description: string;
  address: string;
  image: FileList;
}
async function createRestaurant(body: ICreateRestaurantBody) {
  const formData = new FormData();
  const [file] = Array.from(body.image);
  if (file) {
    formData.append('image', file);
  }
  for (let [key, value] of Object.entries(body)) {
    if (key !== 'image') formData.append(key, value);
  }
  return axios.post(`${SERVER_URL}/restaurant`, formData);
}

async function addReview(body: IAddReviewParams) {
  return axios.post(`${SERVER_URL}/review`, body);
}
async function addResponse(reviewId: string, body: IAddResponseParams) {
  return axios.post(`${SERVER_URL}/review/response/${reviewId}`, body);
}
async function removeReview(reviewId: string) {
  return axios.delete(`${SERVER_URL}/review/${reviewId}`);
}
export function getImagesUrl() {
  return UPLOADS_URL;
}
const Api = {
  register,
  login,
  logout,
  refreshToken,
  getRestaurantList,
  getRestaurantById,
  createRestaurant,
  addReview,
  addResponse,
  removeReview,
  getImagesUrl,
};

export default Api;
