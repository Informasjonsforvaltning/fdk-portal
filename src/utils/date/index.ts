export const formatISO = (
  isoDate: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
) => {
  if (!isoDate) {
    return null;
  }

  const d = new Date(isoDate);
  return d.toLocaleString('no-NO', options);
};
