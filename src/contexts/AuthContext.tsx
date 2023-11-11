import React, {createContext, useState, useEffect} from 'react';
import {
  UserRoles,
  TokenDto,
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
import {CustomError} from '../utils/customErrors';

type AuthContextType = {
  userInfo: LoggedUserType | null;
  setUserInfo: React.Dispatch<React.SetStateAction<LoggedUserType | null>>;
  doctorLogin: (email: string, password: string) => Promise<CustomError | null>;
  patientLogin: (
    username: string,
    password: string,
  ) => Promise<CustomError | null>;
  patientRelativeLogin: (
    email: string,
    password: string,
  ) => Promise<CustomError | null>;
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
  const [userInfo, setUserInfo] = useState<LoggedUserType | null>(null);

  useEffect(() => {
    const checkLoggedStatus = async (): Promise<void> => {
      let userToSet: LoggedUserType | null;
      const loggedStatus = await checkIsLoggedIn();
      if (loggedStatus === null) {
        userToSet = null;
      } else {
        userToSet = await refreshTokensIfExpired({
          accessToken: loggedStatus.accessToken,
          refreshToken: loggedStatus.refreshToken,
          user: loggedStatus.user,
        } as UserWithTokensDto);
      }
      setUserInfo(userToSet);
      onCheckCompleted();
    };
    checkLoggedStatus();
  }, [onCheckCompleted]);

  const doctorLogin = async (
    email: string,
    password: string,
  ): Promise<CustomError | null> => {
    const loginRes = await login(email, password, UserRoles.Doctor);
    if (loginRes?.error) {
      return loginRes.error;
    }
    await setStatesAndStorageItems(
      loginRes.data!.tokens.accessToken,
      loginRes.data!.tokens.refreshToken,
      loginRes.data!.doctor as LoggedDoctorDto,
    );
    return null;
  };

  const patientLogin = async (
    username: string,
    password: string,
  ): Promise<CustomError | null> => {
    const loginRes = await login(username, password, UserRoles.Patient);
    if (loginRes?.error) {
      return loginRes.error;
    }
    await setStatesAndStorageItems(
      loginRes.data!.tokens.accessToken,
      loginRes.data!.tokens.refreshToken,
      loginRes.data!.patient as LoggedPatientDto,
    );
    return null;
  };

  const patientRelativeLogin = async (
    email: string,
    password: string,
  ): Promise<CustomError | null> => {
    const loginRes = await login(email, password, UserRoles.PatientRelative);
    if (loginRes?.error) {
      return loginRes.error;
    }
    await setStatesAndStorageItems(
      loginRes.data!.tokens.accessToken,
      loginRes.data!.tokens.refreshToken,
      loginRes.data!.patientRelative as LoggedPatientRelativeDto,
    );
    return null;
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
    await revokeToken();
    await clearAuthDataFromDevice();
  };

  // Private functions
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
