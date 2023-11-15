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
