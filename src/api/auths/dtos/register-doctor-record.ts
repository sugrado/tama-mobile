export class CreateUserRecord {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export class RegisterRelativeRecord {
  user: CreateUserRecord;
}

export class RegisterDoctorRecord {
  user: CreateUserRecord;
  titleId: number;
  workAddress: string;
  availableForAppointment: boolean;
}
