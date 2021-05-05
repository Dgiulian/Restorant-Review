import { createContext } from 'react';
import { useLocalState } from '../utils/useLocalState';
import Api, { ILoginResponse } from '../api';

const AuthContext = createContext({
  isLogged: false,
  login: ({ email, password }: { email: string; password: string }) => {},
  logout: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useLocalState<string>('accessToken', '');
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
        setToken(data.tokens.access.token);
      } else {
        console.log(data);
        throw new Error(data.message);
      }
    } catch (e) {
      throw e;
    }
  };
  const logout = async () => {
    const data = await Api.logout();
  };
  const isLogged = token !== '';
  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
