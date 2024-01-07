export class GetMyMedicinesDto {
  id: number;
  startDate: string;
  endDate: string | null;
  medicineName: string;
  times: GetMyMedicinesTimeDto[];
}

export class GetMyMedicinesTimeDto {
  time: string;
}
