import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import {
  STORAGE_REFRESH_TOKEN_KEY,
  STORAGE_TOKEN_KEY,
  STORAGE_USER_INFO_KEY,
} from '../constants';
import axiosInstance from '../api/axios';
import {
  LoginDto,
  UserRoles,
  TokenDto,
  LoggedResponse,
  LoggedUserType,
  LoggedDoctorDto,
  LoggedPatientDto,
  LoggedPatientRelativeDto,
} from '../dtos/auth.dto';

type AuthContextType = {
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: LoggedUserType;
  doctorLogin: (email: string, password: string) => Promise<void>;
  patientLogin: (username: string, password: string) => Promise<void>;
  patientRelativeLogin: (email: string, password: string) => Promise<void>;
  setPatientConsentStatus: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<LoggedUserType | null>(
    {} as LoggedUserType,
  );

  const doctorLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      email,
      password,
      UserRoles.Doctor,
    );
    setUserInfo(loginRes.doctor as LoggedDoctorDto);
    setIsLoading(false);
  };

  const patientLogin = async (
    username: string,
    password: string,
  ): Promise<void> => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      username,
      password,
      UserRoles.Patient,
    );
    setUserInfo(loginRes.patient as LoggedPatientDto);
    setIsLoading(false);
  };

  const patientRelativeLogin = async (
    email: string,
    password: string,
  ): Promise<void> => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      email,
      password,
      UserRoles.PatientRelative,
    );
    setUserInfo(loginRes.patientRelative as LoggedPatientRelativeDto);
    setIsLoading(false);
  };

  const login = async (
    credential: string,
    password: string,
    role: UserRoles,
  ): Promise<LoggedResponse> => {
    const loginResponse = await axiosInstance.post<LoggedResponse>(
      'auth/login',
      {credential, password, role} as LoginDto,
    );
    setAccessToken(loginResponse.data.tokens.accessToken.token);
    setRefreshToken(loginResponse.data.tokens.refreshToken.token);
    await setStorageItems(
      loginResponse.data.tokens.accessToken,
      loginResponse.data.tokens.refreshToken,
    );
    return loginResponse.data;
  };

  const setPatientConsentStatus = async (): Promise<void> => {
    await axiosInstance.patch('patients/accept-consent');
    const updatedUserInfo: LoggedPatientDto = {
      ...userInfo,
      consentAccepted: true,
    } as LoggedPatientDto;
    setUserInfo(updatedUserInfo);
    await AsyncStorage.removeItem(STORAGE_USER_INFO_KEY);
    await AsyncStorage.setItem(
      STORAGE_USER_INFO_KEY,
      JSON.stringify(updatedUserInfo),
    );
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await axiosInstance.put('auth/revoke-token');
    setUserInfo(null);
    setAccessToken(null);
    setRefreshToken(null);
    await removeStorageItems();
    setIsLoading(false);
  };

  const isLoggedIn = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let info = await AsyncStorage.getItem(STORAGE_USER_INFO_KEY);
      let accessTokenStorage = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
      let refreshTokenStorage = await AsyncStorage.getItem(
        STORAGE_REFRESH_TOKEN_KEY,
      );

      if (info && accessTokenStorage && refreshTokenStorage) {
        setAccessToken(accessTokenStorage);
        setRefreshToken(refreshTokenStorage);
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

  async function setStorageItems(
    accToken: TokenDto,
    refToken: TokenDto,
  ): Promise<void> {
    await AsyncStorage.setItem(STORAGE_USER_INFO_KEY, JSON.stringify(userInfo));
    await AsyncStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(accToken));
    await AsyncStorage.setItem(
      STORAGE_REFRESH_TOKEN_KEY,
      JSON.stringify(refToken),
    );
  }

  async function removeStorageItems(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_USER_INFO_KEY);
    await AsyncStorage.removeItem(STORAGE_TOKEN_KEY);
    await AsyncStorage.removeItem(STORAGE_REFRESH_TOKEN_KEY);
  }

  return (
    <AuthContext.Provider
      value={
        {
          isLoading,
          accessToken,
          refreshToken,
          userInfo,
          doctorLogin,
          patientLogin,
          patientRelativeLogin,
          logout,
          setPatientConsentStatus,
        } as AuthContextType
      }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
