import { createContext, useEffect, useState } from 'react';
import { useLocalState } from '../utils/useLocalState';
import { IUser } from '../types';
import Api from '../api';
interface IAuthContext {
  isLogged: boolean;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  user: IUser | undefined;
}

const defaultContextValue = {
  isLogged: false,
  login: ({ email, password }: { email: string; password: string }) => {},
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
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
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
    <AuthContext.Provider value={{ isLogged, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
