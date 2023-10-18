import {Dimensions} from 'react-native';

export const PAGE_NAMES = {
  AUTH: {
    LOGIN: 'login',
  },
  HOME: {
    HOME_STACK: 'homeStack',
    HOME: 'home',
    DAILY_QUESTIONS: 'dailyQuestions',
    DAILY_MEDICINES: 'dailyMedicines',
  },
  MY_MEDICINES: 'myMedicines',
  APPOINTMENTS: {
    APPOINTMENT_TOP_TAB: 'appointmentTopTab',
    NEW_APPOINTMENT: 'newAppointment',
    PAST_APPOINTMENTS: 'pastAppointments',
  },
  PROFILE: 'profile',
};

export const DIMENSIONS = {
  HEIGHT: Dimensions.get('window').height,
  WIDTH: Dimensions.get('window').width,
  AVAILABLE_HEIGHT: Dimensions.get('window').height - 60,
};

export const COLORS = {
  THEME_GREEN: '#4D7E3E',
  THEME_TRANSPARENT_COLOR: '#f0f7ee',
  TRANSPARENT_RED: '#ffe6e6',
  DARK_RED: '#880808',
  TEXT: 'rgb(197, 240, 194)',
  PRIMARY_THEME: 'green',
};

export const STORAGE_TOKEN_KEY = 'userToken';
export const STORAGE_REFRESH_TOKEN_KEY = 'userRefreshToken';
export const STORAGE_USER_INFO_KEY = 'userInfo';
