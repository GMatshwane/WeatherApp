/**
 * A function that takes a datetime in milliseconds and returns a day of the week
 * @param date - The datetime in milliseconds
 * @returns The formatted string
 */
export const getDayOfWeek = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
};
