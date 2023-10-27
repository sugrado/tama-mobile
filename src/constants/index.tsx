import {Dimensions} from 'react-native';

export const PAGE_NAMES = {
  PORTALS: {
    WELCOME: 'welcome',
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    PATIENT_RELATIVE: 'patientRelative',
  },
  DOCTOR: {
    AUTH: {
      LOGIN: 'doctorLogin',
    },
    HOME: 'home',
  },
  PATIENT_RELATIVE: {
    HOME: 'home',
    AUTH: {
      LOGIN: 'patientRelativeLogin',
    },
  },
  AUTH: {
    LOGIN: 'login',
    FORGOT_PASSWORD: 'forgotPassword',
    FIRST_APPOINTMENT: 'firstAppointment',
  },
  HOME: {
    HOME_STACK: 'homeStack',
    HOME: 'home',
    DAILY_QUESTIONS: 'dailyQuestions',
    DAILY_MEDICINES: 'dailyMedicines',
  },
  MY_MEDICINES: {
    MY_MEDICINES_TOP_TAB: 'myMedicinesTopTab',
    MY_MEDICINES: 'myMedicines',
    SIDE_EFFECTS: 'sideEffects',
  },
  APPOINTMENTS: {
    APPOINTMENT_TOP_TAB: 'appointmentTopTab',
    NEW_APPOINTMENT: 'newAppointment',
    PAST_APPOINTMENTS: 'pastAppointments',
  },
  PROFILE: 'profile',
  PSYCHOEDUCATION: 'psychoeducation',
};

export const DIMENSIONS = {
  HEIGHT: Dimensions.get('window').height,
  WIDTH: Dimensions.get('window').width,
  AVAILABLE_HEIGHT: Dimensions.get('window').height - 60,
};

export const COLORS = {
  CARD_SUCCESS_BACKGROUND: '#f4f1f3',
  CARD_UNSUCCESS_BACKGROUND: '#ffe6e6',
  THEME_COLOR: '#aa98a8',
  NAVIGATION_ACTIVE_COLOR: '#8B3C7F',
  BUTTON_COLOR: '#8B3C7F',
  THEME_TRANSPARENT_COLOR: '#f4f1f3',
  MODAL_BACKGROUND_COLOR: '#e8e3e7',
  DIALOG_BACKGROUND_COLOR: '#e8e3e7',
  TRANSPARENT_RED: '#ffe6e6',
  DARK_RED: '#880808',
  TEXT: 'white',
  PRIMARY_THEME: 'purple',
};

export const STORAGE_TOKEN_KEY = 'userToken';
export const STORAGE_REFRESH_TOKEN_KEY = 'userRefreshToken';
export const STORAGE_USER_INFO_KEY = 'userInfo';
