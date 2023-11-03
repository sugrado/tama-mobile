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
  doctorLogin: (email: string, password: string) => void;
  patientLogin: (username: string, password: string) => void;
  patientRelativeLogin: (email: string, password: string) => void;
  setPatientConsentStatus: () => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<LoggedUserType>(
    {} as LoggedUserType,
  );

  const doctorLogin = async (email: string, password: string) => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      email,
      password,
      UserRoles.Doctor,
    );
    setUserInfo(loginRes.doctor as LoggedDoctorDto);
    console.log('apiye istek atıldı ve setlendi:', userInfo);
    setIsLoading(false);
  };

  const patientLogin = async (username: string, password: string) => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      username,
      password,
      UserRoles.Patient,
    );
    setUserInfo(loginRes.patient as LoggedPatientDto);
    setIsLoading(false);
  };

  const patientRelativeLogin = async (email: string, password: string) => {
    setIsLoading(true);
    const loginRes: LoggedResponse = await login(
      email,
      password,
      UserRoles.PatientRelative,
    );
    setUserInfo(loginRes.patientRelative as LoggedPatientRelativeDto);
    setIsLoading(false);
  };

  async function login(
    credential: string,
    password: string,
    role: UserRoles,
  ): Promise<LoggedResponse> {
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
  }

  const setPatientConsentStatus = async () => {
    await axiosInstance.patch('patients/accept-consent', null);
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

  const logout = async () => {
    setIsLoading(true);
    // TODO: Logout request
    // const logoutResponse = await axiosInstance.post(
    //   'auth/logout',
    // );
    setAccessToken(null);
    setRefreshToken(null);
    await removeStorageItems();
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let info = await AsyncStorage.getItem(STORAGE_USER_INFO_KEY);
      let accessTokenStorage = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
      let refreshTokenStorage = await AsyncStorage.getItem(
        STORAGE_REFRESH_TOKEN_KEY,
      );

      if (info && accessTokenStorage && refreshTokenStorage) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
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

  async function setStorageItems(accToken: TokenDto, refToken: TokenDto) {
    await AsyncStorage.setItem(STORAGE_USER_INFO_KEY, JSON.stringify(userInfo));
    await AsyncStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(accToken));
    await AsyncStorage.setItem(
      STORAGE_REFRESH_TOKEN_KEY,
      JSON.stringify(refToken),
    );
  }

  async function removeStorageItems() {
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
