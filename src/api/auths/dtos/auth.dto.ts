export class LoginDto {
  credential: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  Patient = 'Patient',
  Relative = 'Relative',
  Doctor = 'Doctor',
}
export type LoggedUserType =
  | LoggedPatientDto
  | LoggedRelativeDto
  | LoggedDoctorDto;
export class LoggedResponse {
  patient: LoggedPatientDto | null;
  relative: LoggedRelativeDto | null;
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

export class LoggedRelativeDto extends LoggedUserInfo {}

export class TokenDto {
  token: string;
}

export class UserWithTokensDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;
  user: LoggedUserType;
}
