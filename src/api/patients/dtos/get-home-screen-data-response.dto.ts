export class GetHomeScreenDataResponse {
  countOfDailyQuestionForAnswer: number;
  dailyMedicinesToUse: PatientHomeDailyMedicine[];
  appointmentReminder: PatientHomeAppointment | null;
}

export class PatientHomeDailyMedicine {
  name: string;
  usageTimes: string;
}

export class PatientHomeAppointment {
  date: string;
  doctorFullName: string;
}
