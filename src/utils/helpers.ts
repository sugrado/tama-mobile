export const formatDate = (date: string | Date): string => {
  function formatTwoDigits(value: number) {
    return value < 10 ? '0' + value : value;
  }
  const dateObject = new Date(date);
  const day = formatTwoDigits(dateObject.getDate());
  const month = formatTwoDigits(dateObject.getMonth() + 1);
  const year = dateObject.getFullYear();
  const hours = formatTwoDigits(dateObject.getHours());
  const minutes = formatTwoDigits(dateObject.getMinutes());
  const dateString = `${day}.${month}.${year} ${hours}:${minutes}`;
  return dateString;
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
