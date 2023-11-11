import {refreshTokens} from '../api/auth';
import {
  LoggedUserType,
  PreparedTokensDto,
  UserWithTokensDto,
} from '../dtos/auth.dto';
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

export const refreshTokensIfExpired = async (
  userWithTokens: UserWithTokensDto,
): Promise<LoggedUserType | null> => {
  const now = new Date();
  const accExpr = new Date(userWithTokens.accessToken.expiration);
  const refExpr = new Date(userWithTokens.refreshToken.expiration);

  if (accExpr > now && refExpr > now) {
    await saveAuthDataToStorage(
      userWithTokens.accessToken,
      userWithTokens.refreshToken,
      userWithTokens.user,
    );
    return userWithTokens.user;
  } else if (accExpr < now && refExpr > now) {
    const refreshResult = await refreshTokensThenResetDeviceData(
      userWithTokens,
    );
    if (refreshResult == null) {
      return null;
    }
    return userWithTokens.user;
  } else {
    await removeAuthDataFromStorage();
    return null;
  }
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