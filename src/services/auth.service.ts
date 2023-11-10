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
  try {
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
    return null;
  } catch (error) {
    console.log('eerr', error);
    return null;
  }
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
    await refreshTokensThenResetDeviceData(userWithTokens);
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

  if (!refreshedTokens) {
    return null;
  }

  await removeAuthDataFromStorage();
  await saveAuthDataToStorage(
    refreshedTokens.accessToken,
    refreshedTokens.refreshToken,
    userWithTokens.user,
  );
  return {
    accessToken: refreshedTokens.accessToken,
    refreshToken: refreshedTokens.refreshToken,
  } as PreparedTokensDto;
};
