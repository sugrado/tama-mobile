import {GetProfileFromAuthResponse} from '../dtos/patient-profle-response.dto';
import axiosInstance from '../contexts/AxiosInterceptor';

export const acceptConsent = async (): Promise<void> => {
  await axiosInstance.patch('patients/accept-consent');
};

export const profile = async (): Promise<GetProfileFromAuthResponse | null> => {
  try {
    const res = await axiosInstance.get<GetProfileFromAuthResponse>(
      'patients/profile',
    );
    return res.data;
  } catch (error) {
    return null;
  }
};
