export class LoginDto {
  credential: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  Patient = 'Patient',
  PatientRelative = 'PatientRelative',
  Doctor = 'Doctor',
}
export type LoggedUserType =
  | LoggedPatientDto
  | LoggedPatientRelativeDto
  | LoggedDoctorDto;
export class LoggedResponse {
  patient: LoggedPatientDto | null;
  patientRelative: LoggedPatientRelativeDto | null;
  doctor: LoggedDoctorDto | null;
  tokens: PreparedTokensDto;
}

export class PreparedTokensDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
}

export class LoggedUserInfo {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
}

export class LoggedPatientDto extends LoggedUserInfo {
  username: string;
  consentAccepted: boolean;
}

export class LoggedDoctorDto extends LoggedUserInfo {}

export class LoggedPatientRelativeDto extends LoggedUserInfo {}

export class TokenDto {
  token: string;
  expiration: Date;
}

export class UserWithTokensDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: LoggedUserType;
}
