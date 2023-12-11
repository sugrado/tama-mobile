export class MyPastListItemDto {
  id: number;
  doctorFullName: string;
  statusId: AppointmentStatus | string;
  takenDate: string;
  probableStartTime: string;
  probableEndTime: string;
}

export enum AppointmentStatus {
  Active = 1,
  InProgress = 2,
  Completed = 3,
  Cancelled = 4,
}

export const AppointmentStatusDataSource = [
  {id: AppointmentStatus[AppointmentStatus.Active], name: 'Aktif'},
  {id: AppointmentStatus[AppointmentStatus.InProgress], name: 'Devam Ediyor'},
  {id: AppointmentStatus[AppointmentStatus.Completed], name: 'Tamamlandı'},
  {id: AppointmentStatus[AppointmentStatus.Cancelled], name: 'İptal Edildi'},
];
