import { EventDefinition } from "./types";

export const year = new Date().getUTCFullYear();

export function daysinmonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export const parseInput = (inputRaw: string): EventDefinition[] => {
  const inputs = inputRaw
    .trim()
    .split("\n")
    .map((el) => {
      const match = el.match(/(.*): (.*) to (.*)/);
      return match ? match.slice(1) : null;
    })
    .filter(Boolean);

  // text, start Month day, end month day

  const res: EventDefinition[] = [];

  const convertStringToDate = (monthDayString: string) => {
    const currentYear = new Date().getUTCFullYear();
    const [month, day] = monthDayString.split(" ");
    const monthIndex = new Date(`${month} 1 ${currentYear} `).getMonth();
    const date = new Date(Date.UTC(currentYear, monthIndex, parseInt(day, 10)));

    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${monthDayString} `);
    }
    return date;
  };

  const getNumberDayOfYear = (date: Date): number => {
    const currentYear = date.getUTCFullYear();
    const startOfYear = new Date(Date.UTC(currentYear, 0, 1)); // January 1st in UTC

    const dayOfYear =
      Math.floor(
        (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    return dayOfYear;
  };

  for (const input of inputs!) {
    if (!input) continue;
    const [text, startDate, endDate] = input;
    const startNumber = convertStringToDate(startDate);
    const start = getNumberDayOfYear(startNumber);
    const endNumber = convertStringToDate(endDate);
    const end = getNumberDayOfYear(endNumber);

    res.push({ text, start, end });
  }

  return res;
};
