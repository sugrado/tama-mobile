export class GetHomeScreenDataResponse {
  countOfDailyQuestionForAnswer: number;
  dailyMedicinesToUse: PatientHomeDailyMedicine[];
}

export class PatientHomeDailyMedicine {
  name: string;
  usageTimes: string;
}
