import axios from 'axios';

const SERVER_URL = 'http://localhost:5000/v1';
export interface ILoginBody {
  email: string;
  password: string;
}
interface IRegisterBody {
  email: string;
  name: string;
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

  user: {
    email: string;
    id: string;
    isEmailVerified: boolean;
    name: 'string';
    role: 'owner' | 'admin' | 'user';
  };
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
      config.headers['x-auth-token'] = accessToken;
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
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${SERVER_URL}/auth/refresh_token`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            console.log('Access token refreshed!');
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
//functions to make api calls

export const register = (body: IRegisterBody) => {
  return axios.post(`${SERVER_URL}/auth/register`, body);
};

export const login = async (body: ILoginBody) => {
  try {
    const response = await axios.post<ILoginError | ILoginResponse>(
      `${SERVER_URL}/auth/login`,
      body
    );
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export const refreshToken = (body: IRefreshTokenBody) => {
  return axios.post(`${SERVER_URL}/auth/refresh_tokens`, body);
};

export const logout = (token: string) => {
  return axios.post(`${SERVER_URL}/auth/logout`, { refreshToken: token });
};

export const getProtected = () => {
  return axios.get(`${SERVER_URL}/protected_resource`);
};

export async function getRestaurantList() {
  const resp = await axios.get(`${SERVER_URL}/restaurant`);
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

const Api = {
  login,
  logout,
  refreshToken,
  getRestaurantList,
  getRestaurantById,
};

export default Api;
