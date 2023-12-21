import {Dimensions} from 'react-native';

export const PAGE_NAMES = {
  PORTALS: {
    WELCOME: 'welcome',
    PATIENT: 'patient',
    DOCTOR: 'doctor',
    RELATIVE: 'relative',
    FORGOT_PASSWORD: 'forgotPassword',
  },
  DOCTOR: {
    AUTH: {
      LOGIN: 'doctorLogin',
    },
    HOME: {
      HOME_STACK: 'doctorHomeStack',
      HOME: 'doctorHome',
      SEARCH_PATIENT: 'searchPatient',
    },
    SETTINGS: {
      SETTINGS_STACK: 'doctorSettingsStack',
      SETTINGS: 'doctorSettings',
      ACCOUNT: 'doctorAccount',
    },
  },
  RELATIVE: {
    HOME: 'home',
    AUTH: {
      LOGIN: 'relativeLogin',
      REGISTER: 'relativeRegister',
    },
    SETTINGS: {
      SETTINGS_STACK: 'patientSettingsStack',
      SETTINGS: 'patientSettings',
      ACCOUNT: 'patientAccount',
      CHANGE_PASSWORD: 'patientChangePassword',
      CHANGE_EMAIL: 'patientChangeEmail',
    },
  },
  PATIENT: {
    AUTH: {
      LOGIN: 'patientLogin',
    },
    HOME: {
      HOME_STACK: 'patientHomeStack',
      HOME: 'patientHome',
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
    SETTINGS: {
      SETTINGS_STACK: 'patientSettingsStack',
      SETTINGS: 'patientSettings',
      ACCOUNT: 'patientAccount',
      QR_CODE: 'patientQRCode',
      CHANGE_PASSWORD: 'patientChangePassword',
      CHANGE_EMAIL: 'patientChangeEmail',
      MY_RELATIVES: 'patientMyRelatives',
    },
    PSYCHOEDUCATION: 'psychoeducation',
  },
};

export const FORM_ERROR_MESSAGES = {
  REQUIRED: 'Bu alan zorunludur.',
  MIN_LENGTH: (length: Number) =>
    `Bu alan en az ${length} karakter uzunluğunda olmalıdır.`,
  MAX_LENGTH: (length: Number) =>
    `Bu alan en fazla ${length} karakter uzunluğunda olmalıdır.`,
  MIN_VALUE: (value: Number) => `Bu alan en az ${value} olmalıdır.`,
  MAX_VALUE: (value: Number) => `Bu alan en fazla ${value} olmalıdır.`,
  EMAIL: 'Geçerli bir e-posta adresi giriniz.',
  IDENTITY_NUMBER: 'Kimlik numarası geçerli ve 11 haneli olmalıdır.',
  DATE: 'Geçerli bir tarih formatı girin (örn. 19.10.2019)',
  PHONE_NUMBER: 'Geçerli bir telefon numarası girin.',
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
  WARNING: '#ffdb4d',
  SNACKBAR_SUCCESS: '#8B3C7F',
};

export const REGEXES = {
  DATE: /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[1,2])\.(19|20)\d{2}/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  TR_PHONE_NUMBER:
    /^(?:\+90.?5|0090.?5|905|0?5)(?:[0-9][0-9])\s?(?:[0-9]{3})\s?(?:[0-9]{2})\s?(?:[0-9]{2})$/,
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_INFO: 'userInfo',
};
