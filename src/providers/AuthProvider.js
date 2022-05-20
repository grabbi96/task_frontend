import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonAxios from '../components/CommonAxios';
import UserAxios from '../components/UserAxios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const router = useNavigate();

  const removeAlert = () => {
    setAlert({
      isOpen: false,
      message: '',
      type: '',
    });
  };

  const signupHandler = async (values) => {
    try {
      setSignUpLoading(true);
      const result = await CommonAxios.post('/v1/auth/signup', values);
      router(
        `/signup-confirmation/${result.data.code}/${result.data.verificationToken}`
      );
      setSignUpLoading(false);
    } catch (err) {
      setSignUpLoading(false);
      setAlert({
        isOpen: true,
        message: err?.response?.data?.message,
        type: 'error',
      });
    }
  };

  const signUpConfirmationHandler = async (values, id) => {
    try {
      setSignUpLoading(true);
      const result = await CommonAxios.post(
        '/v1/auth/activeAccount/' + id,
        values
      );
      router(`/login`);
      setSignUpLoading(false);
    } catch (err) {
      setSignUpLoading(false);
      setAlert({
        isOpen: true,
        message: err?.response?.data?.message,
        type: 'error',
      });
    }
  };

  const loginHandler = async (values) => {
    try {
      setSignUpLoading(true);
      const result = await CommonAxios.post('/v1/auth/signin', values);
      const { token } = result.data;
      const bearerToken = `Bearer ${token}`;
      localStorage.setItem('user_login_jwt', bearerToken);
      console.log(result);
      profileHandler(bearerToken);
      router(`/profile`);
      setSignUpLoading(false);
    } catch (err) {
      setSignUpLoading(false);
      setAlert({
        isOpen: true,
        message: err?.response?.data?.message,
        type: 'error',
      });
    }
  };

  const profileHandler = async (token) => {
    try {
      if (token) {
        UserAxios.defaults.headers.Authorization = token;
      }
      let result = await UserAxios.get('/v1/auth/me');

      setUserInfo(result.data);
      setUserLoading(false);
    } catch (err) {
      setUserLoading(false);
      logoutHandler();
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('user_login_jwt');
    setUserInfo(null);
    router('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        signupHandler,
        alert,
        setAlert,
        removeAlert,
        signUpLoading,
        signUpConfirmationHandler,
        loginHandler,
        profileHandler,
        userLoading,
        logoutHandler,
      }}
    >
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContext');
  }

  return context;
}
