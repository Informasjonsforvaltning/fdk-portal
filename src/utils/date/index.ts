/**
 * Format ISO date string to locale string
 * @param isoDate ISO date string
 * @param options available format options
 *     weekday: 'long',
 *     year: 'numeric',
 *     month: 'long',
 *     day: 'numeric',
 *     hour: '2-digit',
 *     minute: '2-digit'
 * @returns formatted date string
 */
export const formatISO = (
  isoDate: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
) => {
  if (!isoDate) {
    return null;
  }

  const d = new Date(isoDate);
  return d.toLocaleString('no-NO', options);
};
