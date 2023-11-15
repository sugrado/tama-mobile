import {Gender} from '../../enums/Gender';

export class GetSummaryResponse {
  height: number;
  weight: number;
  dailyTeaConsumption: number;
  dailyCoffeeConsumption: number;
  gender: Gender;
  identityNumber: string;
  address: string;
  username: string;
  usingMedicinesAndFrequency: string | null;
  previousSurgery: string | null;
  allergy: string | null;
  birthAt: Date | string;
  smoke: boolean;
  alcohol: boolean;
  drugs: boolean;
  consentAccepted: boolean;
}
