export interface GetQRSummaryResponse {
  id: number;
  fullName: string;
  username: string;
  identityNumber: string;
  birthAt: string;
  genderName: string;
  height: number;
  weight: number;
  dailyTeaConsumption: number;
  dailyCoffeeConsumption: number;
  smoke: boolean;
  alcohol: boolean;
  drugs: boolean;
  usingMedicinesAndFrequency: string | null;
  previousSurgery: string | null;
  allergy: string | null;
}
