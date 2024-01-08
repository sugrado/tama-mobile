export class PatientUsageAnalysisResponse {
  medicines: PatientUsageAnalysisMedicine[];
}

export class PatientUsageAnalysisMedicine {
  name: string;
  weeklyPercentage: AnalysisMedicine;
  monthlyPercentage: AnalysisMedicine;
  yearlyPercentage: AnalysisMedicine;
  allTimePercentage: AnalysisMedicine;
}

export class AnalysisMedicine {
  usedPercentage: number;
  unusedPercentage: number;
  emptyPercentage: number;
}
