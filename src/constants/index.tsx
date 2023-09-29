import {Dimensions} from 'react-native';

export const PAGE_NAMES = {
  home: 'home',
  myMedicines: 'myMedicines',
  appointments: 'appointments',
  profile: 'profile',
};

export const DIMENSIONS = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const COLORS = {
  THEME_GREEN: '#4D7E3E',
};

export const STORAGE_TOKEN_KEY = 'userToken';
export const STORAGE_REFRESH_TOKEN_KEY = 'userRefreshToken';
export const STORAGE_USER_INFO_KEY = 'userInfo';
