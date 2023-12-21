export class GetProfileFromAuthResponse {
  user: RelativeUserProfile;
}

export class RelativeUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
