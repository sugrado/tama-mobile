import React, {createContext, useState, useEffect} from 'react';
import {
  UserRoles,
  TokenDto,
  LoggedUserType,
  LoggedPatientDto,
  LoggedDoctorDto,
  LoggedRelativeDto,
  UserWithTokensDto,
} from '../api/auths/dtos/auth.dto';
import {
  removeAuthDataFromStorage,
  removeUserInfoFromStorage,
  saveAuthDataToStorage,
  setUserInfoToStorage,
} from '../utils/storage';
import {
  login,
  registerDoctor,
  registerRelative,
  revokeToken,
} from '../api/auths/auth';
import {acceptConsent} from '../api/patients/patient';
import {checkIsLoggedIn, validateAuthSession} from '../services/auth.service';
import {CustomError} from '../utils/customErrors';
import {
  RegisterDoctorRecord,
  RegisterRelativeRecord,
} from '../api/auths/dtos/register-doctor-record';

export type AuthContextType = {
  userInfo: LoggedUserType | null;
  setUserInfo: React.Dispatch<React.SetStateAction<LoggedUserType | null>>;
  doctorLogin: (email: string, password: string) => Promise<CustomError | null>;
  patientLogin: (
    username: string,
    password: string,
  ) => Promise<CustomError | null>;
  relativeLogin: (
    email: string,
    password: string,
  ) => Promise<CustomError | null>;
  doctorRegister: (body: RegisterDoctorRecord) => Promise<CustomError | null>;
  relativeRegister: (
    body: RegisterRelativeRecord,
  ) => Promise<CustomError | null>;
  setPatientConsentStatus: () => Promise<void>;
  logout: () => Promise<CustomError | null>;
  isCheckProgress: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
  onCheckCompleted: () => void;
};

export const AuthProvider = ({
  children,
  onCheckCompleted,
}: AuthProviderProps): JSX.Element => {
  const [userInfo, setUserInfo] = useState<LoggedUserType | null>(null);
  const [isCheckProgress, setIsCheckProgress] = useState<boolean>(false);

  useEffect(() => {
    const checkLoggedStatus = async (): Promise<void> => {
      setIsCheckProgress(true);
      let userToSet: LoggedUserType | null;
      const loggedStatus = await checkIsLoggedIn();
      if (loggedStatus === null) {
        userToSet = null;
      } else {
        userToSet = await validateAuthSession({
          accessToken: loggedStatus.accessToken,
          refreshToken: loggedStatus.refreshToken,
          user: loggedStatus.user,
        } as UserWithTokensDto);
      }
      setUserInfo(userToSet);
      setIsCheckProgress(false);
      onCheckCompleted();
    };
    checkLoggedStatus();
  }, [onCheckCompleted]);

  const doctorRegister = async (
    body: RegisterDoctorRecord,
  ): Promise<CustomError | null> => {
    const registerRes = await registerDoctor(body);
    if (registerRes?.error) {
      return registerRes.error;
    }
    await setStatesAndStorageItems(
      registerRes.data!.tokens.accessToken,
      registerRes.data!.tokens.refreshToken,
      registerRes.data!.doctor as LoggedDoctorDto,
    );
    return null;
  };

  const relativeRegister = async (
    body: RegisterRelativeRecord,
  ): Promise<CustomError | null> => {
    const registerRes = await registerRelative(body);
    if (registerRes?.error) {
      return registerRes.error;
    }
    await setStatesAndStorageItems(
      registerRes.data!.tokens.accessToken,
      registerRes.data!.tokens.refreshToken,
      registerRes.data!.relative as LoggedRelativeDto,
    );
    return null;
  };

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

  const relativeLogin = async (
    email: string,
    password: string,
  ): Promise<CustomError | null> => {
    const loginRes = await login(email, password, UserRoles.Relative);
    if (loginRes?.error) {
      return loginRes.error;
    }
    await setStatesAndStorageItems(
      loginRes.data!.tokens.accessToken,
      loginRes.data!.tokens.refreshToken,
      loginRes.data!.relative as LoggedRelativeDto,
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

  const logout = async (): Promise<CustomError | null> => {
    const loggedStatus = await checkIsLoggedIn();
    if (loggedStatus === null) {
      setUserInfo(null);
      return null;
    }
    const res = await revokeToken(loggedStatus.refreshToken.token);
    if (res.error) {
      return res.error;
    }
    await clearAuthDataFromDevice();
    return null;
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
          relativeLogin,
          doctorRegister,
          relativeRegister,
          logout,
          setPatientConsentStatus,
          isCheckProgress,
        } as AuthContextType
      }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => React.useContext(AuthContext);
