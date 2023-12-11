export class CreateAppointmentCommand {
  doctorId: number;
  takenDate: string;
  probableStartTime: string;
  probableEndTime: string;
}

export class CreatedAppointmentResponse {
  id: number;
  takenDate: string;
  probableStartTime: string;
  probableEndTime: string;
  doctorFullName: string;
}
