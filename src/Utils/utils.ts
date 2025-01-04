import { EventDefinition, Timeline } from "./types";

export const year = new Date().getUTCFullYear();

function daysinmonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export const numDaysPassed = (): number => {
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(currentYear, 0, 1)); // January 1st in UTC

  const daysPassed =
    Math.floor(
      (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  return daysPassed - 1;
};

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

export const createTimelineWithDays = (): Timeline => {
  const timeline: Timeline = [];
  let id = 0; // id will match the index in timeline
  for (let month = 0; month < 12; month++) {
    const daysInMonth = daysinmonth(year, month);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(year, month, day));
      timeline.push([
        { id, month: date.getUTCMonth(), day: date.getUTCDate() },
      ]);
      id++;
    }
  }
  return timeline;
};

export const insertEventsIntoTimeline = (
  timeline: Timeline,
  events: EventDefinition[]
) => {
  for (const event of events) {
    const m = Math.floor((event.end - event.start) / 2) + event.start;
    const offset = (event.end - event.start) % 2 === 0;
    for (let i = event.start; i <= event.end; i++) {
      timeline[i - 1].push({
        text: i === m ? event.text : "",
        offset,
        start: i === event.start,
        end: i === event.end,
      });
    }
  }
};
