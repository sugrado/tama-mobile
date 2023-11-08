import {AxiosResponse} from 'axios';
import {GetProfileFromAuthResponse} from '../dtos/patient-profle-response.dto';
import axiosInstance from './axios';

export const acceptConsent = async (): Promise<void> => {
  await axiosInstance.patch('patients/accept-consent');
};

export const profile = async (): Promise<
  AxiosResponse<GetProfileFromAuthResponse>
> => {
  return await axiosInstance.get<GetProfileFromAuthResponse>(
    'patients/profile',
  );
};
