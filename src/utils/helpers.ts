export enum FormatType {
  DATE = 1,
  DATE_TIME = 2,
  TIME = 3,
}

export const formatDate = (date: string | Date, type: FormatType): string => {
  function formatTwoDigits(value: number) {
    return value < 10 ? '0' + value : value;
  }
  const dateObject = new Date(date);
  const day = formatTwoDigits(dateObject.getDate());
  const month = formatTwoDigits(dateObject.getMonth() + 1);
  const year = dateObject.getFullYear();
  let hours = formatTwoDigits(dateObject.getHours());
  let minutes = formatTwoDigits(dateObject.getMinutes());
  const elements = String(date).split(':');
  if (Number.isNaN(hours)) {
    hours = elements[0];
  }
  if (Number.isNaN(minutes)) {
    minutes = elements[1];
  }
  switch (type) {
    case FormatType.DATE:
      return `${day}.${month}.${year}`;
    case FormatType.TIME:
      return `${hours}:${minutes}`;
    case FormatType.DATE_TIME:
      return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
};

export const calculateAge = (birthDate: string | Date): Number => {
  const dateObject = new Date(birthDate);
  const birthYear = dateObject.getFullYear();
  const now = new Date();
  const currentYear = now.getFullYear();
  return currentYear - birthYear;
};

export const generateId = (): number => Math.round(Math.random() * 1000000);

export const getEndOfTheDayCountdown = (): string => {
  const now = new Date();
  const endOfTheDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
  );
  const diff = endOfTheDay.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) {
    return '1 saatten az';
  }
  return `${hours} saat`;
};
