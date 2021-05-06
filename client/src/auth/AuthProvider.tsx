import { createContext, useEffect, useState } from 'react';
import { useLocalState } from '../utils/useLocalState';
import Api from '../api';

const AuthContext = createContext({
  isLogged: false,
  login: ({ email, password }: { email: string; password: string }) => {},
  logout: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalState<string | undefined>(
    'accessToken',
    ''
  );
  const [refreshToken, setRefreshToken] = useLocalState<string | undefined>(
    'refreshToken',
    ''
  );
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
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
