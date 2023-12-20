import {refreshTokens, validateSession} from '../api/auths/auth';
import {
  LoggedUserType,
  PreparedTokensDto,
  UserWithTokensDto,
} from '../api/auths/dtos/auth.dto';
import {
  getAccessTokenFromStorage,
  getRefreshTokenFromStorage,
  getUserInfoFromStorage,
  removeAuthDataFromStorage,
  saveAuthDataToStorage,
} from '../utils/storage';

export const checkIsLoggedIn = async (): Promise<UserWithTokensDto | null> => {
  let user = await getUserInfoFromStorage();
  let accToken = await getAccessTokenFromStorage();
  let refToken = await getRefreshTokenFromStorage();
  if (user && accToken && refToken) {
    return {
      user,
      accessToken: accToken,
      refreshToken: refToken,
    } as UserWithTokensDto;
  }
  await removeAuthDataFromStorage();
  return null;
};

export const validateAuthSession = async (
  userWithTokens: UserWithTokensDto,
): Promise<LoggedUserType | null> => {
  const validateResult = await validateSession();
  if (!validateResult.error) {
    return userWithTokens.user;
  }

  await removeAuthDataFromStorage();
  return null;
};

export const refreshTokensThenResetDeviceData = async (
  userWithTokens: UserWithTokensDto,
): Promise<PreparedTokensDto | null> => {
  const refreshedTokens = await refreshTokens(
    userWithTokens.refreshToken.token,
  );
  await removeAuthDataFromStorage();

  if (refreshedTokens.error) {
    return null;
  }

  await saveAuthDataToStorage(
    refreshedTokens.data!.accessToken,
    refreshedTokens.data!.refreshToken,
    userWithTokens.user,
  );
  return {
    accessToken: refreshedTokens.data!.accessToken,
    refreshToken: refreshedTokens.data!.refreshToken,
  } as PreparedTokensDto;
};
