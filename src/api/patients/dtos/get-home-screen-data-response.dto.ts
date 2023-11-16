export class GetHomeScreenDataResponse {
  countOfDailyQuestionForAnswer: number;
  countOfScaleToComplete: number;
  dailyMedicinesToUse: PatientHomeDailyMedicine[];
}

export class PatientHomeDailyMedicine {
  name: string;
  usageTimes: string;
}
