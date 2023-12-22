export class GetProfileFromAuthResponse {
  titleName: string;
  workAddress: string;
  user: DoctorUserProfile;
}

export class DoctorUserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
