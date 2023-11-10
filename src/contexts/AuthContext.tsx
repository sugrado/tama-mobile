import React, {createContext, useState, useEffect} from 'react';
import {
  UserRoles,
  TokenDto,
  LoggedResponse,
  LoggedUserType,
  LoggedPatientDto,
  LoggedDoctorDto,
  LoggedPatientRelativeDto,
  UserWithTokensDto,
} from '../dtos/auth.dto';
import {
  removeAuthDataFromStorage,
  removeUserInfoFromStorage,
  saveAuthDataToStorage,
  setUserInfoToStorage,
} from '../utils/storage';
import {login, revokeToken} from '../api/auth';
import {acceptConsent} from '../api/patient';
import {
  checkIsLoggedIn,
  refreshTokensIfExpired,
} from '../services/auth.service';

type AuthContextType = {
  isLoading: boolean;
  userInfo: LoggedUserType | null;
  setUserInfo: React.Dispatch<React.SetStateAction<LoggedUserType | null>>;
  doctorLogin: (email: string, password: string) => Promise<void>;
  patientLogin: (username: string, password: string) => Promise<void>;
  patientRelativeLogin: (email: string, password: string) => Promise<void>;
  setPatientConsentStatus: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
  onCheckCompleted: () => void;
};

export const AuthProvider = ({
  children,
  onCheckCompleted,
}: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<LoggedUserType | null>(null);

  useEffect(() => {
    console.log('auth effect çalışıyor');
    setIsLoading(true);
    checkIsLoggedIn().then(async res => {
      if (res == null) {
        setUserInfo(null);
        await removeAuthDataFromStorage();
        setIsLoading(false);
        onCheckCompleted();
        return;
      }
      const refreshUserResult = await refreshTokensIfExpired({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user,
      } as UserWithTokensDto);
      setUserInfo(refreshUserResult);
      setIsLoading(false);
      onCheckCompleted();
    });
  }, [onCheckCompleted]);

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
    await setStatesAndStorageItems(
      loginRes.tokens.accessToken,
      loginRes.tokens.refreshToken,
      loginRes.doctor as LoggedDoctorDto,
    );
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
    await setStatesAndStorageItems(
      loginRes.tokens.accessToken,
      loginRes.tokens.refreshToken,
      loginRes.patient as LoggedPatientDto,
    );
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
    await setStatesAndStorageItems(
      loginRes.tokens.accessToken,
      loginRes.tokens.refreshToken,
      loginRes.patientRelative as LoggedPatientRelativeDto,
    );
    setIsLoading(false);
  };

  const setPatientConsentStatus = async (): Promise<void> => {
    await acceptConsent();
    const updatedUserInfo: LoggedPatientDto = {
      ...userInfo,
      consentAccepted: true,
    } as LoggedPatientDto;
    setUserInfo(updatedUserInfo);
    await removeUserInfoFromStorage();
    await setUserInfoToStorage(updatedUserInfo);
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await revokeToken();
    await clearAuthDataFromDevice();
    setIsLoading(false);
  };

  const clearAuthDataFromDevice = async (): Promise<void> => {
    setUserInfo(null);
    await removeAuthDataFromStorage();
  };

  const setStatesAndStorageItems = async (
    accToken: TokenDto,
    refToken: TokenDto,
    user: LoggedUserType,
  ): Promise<void> => {
    setUserInfo(user);
    await saveAuthDataToStorage(accToken, refToken, user);
  };

  return (
    <AuthContext.Provider
      value={
        {
          isLoading,
          userInfo,
          setUserInfo,
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
