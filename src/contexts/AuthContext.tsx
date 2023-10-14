import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {
  STORAGE_REFRESH_TOKEN_KEY,
  STORAGE_TOKEN_KEY,
  STORAGE_USER_INFO_KEY,
} from '../constants';
import axiosInstance from '../api/axios';
import {LoginDto, UserInfoDto} from '../dtos/auth.dto';

type AuthContextType = {
  isLoading: boolean;
  userToken: string | null;
  userInfo: UserInfoDto;
  login: (username: string, password: string) => void;
  setConsentStatus: () => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoDto>({} as UserInfoDto);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    // TODO: Login request
    // const loginResponse = await axiosInstance.post(
    //   'auth/login',
    //   new LoginDto(username, password),
    // );
    const loginResponse = {
      data: {
        userInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          username: 'johndoe',
          consentAccepted: false,
        } as UserInfoDto,
        token: 'myToken',
        refreshToken: 'myRefreshToken',
      },
    };
    setUserInfo(loginResponse.data.userInfo);
    setUserToken(loginResponse.data.token);
    await setStorageItems(loginResponse.data);

    setIsLoading(false);
  };

  const setConsentStatus = async () => {
    // axiosInstance
    //   .patch('users/set-consent-status', {accepted: true})
    //   .then(res => {
    //     setUserInfo({...userInfo, consentAccepted: true} as UserInfoDto);
    //   })
    //   .catch(err => {});
    const updatedUserInfo: UserInfoDto = {
      ...userInfo,
      consentAccepted: true,
    };
    setUserInfo(updatedUserInfo);
    await AsyncStorage.removeItem(STORAGE_USER_INFO_KEY);
    await AsyncStorage.setItem(
      STORAGE_USER_INFO_KEY,
      JSON.stringify(updatedUserInfo),
    );
  };

  const logout = async () => {
    setIsLoading(true);
    // TODO: Logout request
    // const loginResponse = await axiosInstance.post(
    //   'auth/logout',
    // );
    setUserToken(null);
    await removeStorageItems();
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let info = await AsyncStorage.getItem(STORAGE_USER_INFO_KEY);
      let token = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);

      if (info && token) {
        setUserToken(token);
        setUserInfo(JSON.parse(info));
      }

      setIsLoading(false);
    } catch (error) {
      console.log('eerr', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  async function setStorageItems(responseData: any) {
    await AsyncStorage.setItem(STORAGE_TOKEN_KEY, responseData.token);
    await AsyncStorage.setItem(
      STORAGE_USER_INFO_KEY,
      JSON.stringify(responseData.userInfo),
    );
    await AsyncStorage.setItem(
      STORAGE_REFRESH_TOKEN_KEY,
      responseData.refreshToken,
    );
  }

  async function removeStorageItems() {
    await AsyncStorage.removeItem(STORAGE_TOKEN_KEY);
    await AsyncStorage.removeItem(STORAGE_USER_INFO_KEY);
    await AsyncStorage.removeItem(STORAGE_REFRESH_TOKEN_KEY);
  }

  return (
    <AuthContext.Provider
      value={
        {
          isLoading,
          userToken,
          userInfo,
          login,
          logout,
          setConsentStatus,
        } as AuthContextType
      }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
