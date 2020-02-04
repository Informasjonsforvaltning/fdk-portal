export const dateStringToDate = dateString => {
  const dateStringTimestamp = Date.parse(dateString);
  const date = new Date(dateStringTimestamp);
  date.setHours(0, 0, 0, 0);
  return !isNaN(dateStringTimestamp) ? date : null;
};

const isDateSameDayAsNow = date =>
  date.getFullYear() === new Date().getFullYear() &&
  date.getMonth() === new Date().getMonth() &&
  date.getDate() === new Date().getDate();

export const isDateBeforeToday = date =>
  date && date < Date.now() && !isDateSameDayAsNow(date);

export const isDateAfterToday = date =>
  date && date > Date.now() && !isDateSameDayAsNow(date);

export const formatDate = date =>
  date &&
  date instanceof Date &&
  date
    .toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .join('.');
