/**
 * Formats a given date as a string in the `dd.mm.yyyy` format.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string in `dd.mm.yyyy` format.
 *
 * @example
 * const date = new Date(2025, 4, 14); // May 14, 2025
 * console.log(getFormattedDateString(date)); // "14.05.2025"
 */
export const getFormatedDateString = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0'); // Ensures two-digit format
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

/**
 * Returns a Date object representing the next day with time set to midnight.
 *
 * @returns {Date} - The Date object for the next day at 00:00:00.
 *
 * The function creates a new Date instance, increments the day by one,
 * and resets the time to midnight (00:00:00).
 */
export const getNextDay = () => {
  const res = new Date();
  res.setDate(res.getDate() + 1);
  res.setHours(0, 0, 0, 0);
  return res;
};
