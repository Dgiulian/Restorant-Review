import { createContext, useEffect, useState } from 'react';
import { useLocalState } from '../utils/useLocalState';
import { ILoginBody, IRegisterBody } from '../api';
import { IUser } from '../types';
import Api from '../api';
interface IAuthContext {
  isLogged: boolean;
  login: (loginData: ILoginBody) => void;
  logout: () => void;
  register: (registerData: IRegisterBody) => void;
  user: IUser | undefined;
}

const defaultContextValue = {
  isLogged: false,
  login: ({ email, password }: ILoginBody) => {},
  register: (registerBody: IRegisterBody) => {},
  logout: () => {},
  user: undefined,
};

const AuthContext = createContext<IAuthContext>(defaultContextValue);

const AuthProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalState<string | undefined>(
    'accessToken',
    ''
  );
  const [refreshToken, setRefreshToken] = useLocalState<string | undefined>(
    'refreshToken',
    ''
  );
  const [user, setUser] = useLocalState<IUser | undefined>('user', undefined);
  const [isLogged, setIsLogged] = useState(() => !!accessToken);
  useEffect(() => {
    setIsLogged(!!accessToken);
  }, [accessToken]);

  const login = async ({ email, password }: ILoginBody) => {
    try {
      const data = await Api.login({
        email,
        password,
      });

      if (data && 'tokens' in data) {
        setAccessToken(data.tokens.access.token);
        setRefreshToken(data.tokens.refresh.token);
        setUser(data.user);
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      throw e;
    }
  };
  const register = async (registerBody: IRegisterBody) => {
    try {
      const data = await Api.register(registerBody);

      if (data && 'tokens' in data) {
        setAccessToken(data.tokens.access.token);
        setRefreshToken(data.tokens.refresh.token);
        setUser(data.user);
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      throw e;
    }
  };
  const logout = async () => {
    try {
      if (refreshToken) {
        await Api.logout(refreshToken);
      }
      setAccessToken(undefined);
      setRefreshToken(undefined);
      setUser(undefined);
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout, user, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
