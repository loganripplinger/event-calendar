import "./App.css";

const year = new Date().getUTCFullYear();

function daysinmonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function Year() {
  return (
    <div className="cell year">
      <div>20</div>
      <div>25</div>
    </div>
  );
}

function Empty({ hidden }: { hidden?: boolean }) {
  return <div className={`cell ${hidden ? "event" : undefined}`} />;
}

function Day({ day, month }: { day: number; month: number }) {
  const date = new Date(year, month, day);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const monthText =
    day === 1
      ? new Intl.DateTimeFormat("en-US", { month: "short" })
          .format(date)
          .toUpperCase()
      : null;

  return (
    <div className={`cell month-${month}`}>
      <>
        {isWeekend ? <strong>{day}</strong> : <div>{day}</div>}
        {monthText && <div className="month-text">{monthText}</div>}
      </>
    </div>
  );
}

function Event({ text, offset, start, end }: Event) {
  return (
    <div className="cell event">
      <div className={`event-text ${offset ? "" : "event-text-offset"}`}>
        {text ? text : "\u00A0"}
      </div>
      <div
        className={`line${start ? " line-start" : ""}${end ? " line-end" : ""}`}
      />
    </div>
  );
}

const input = `
Japan: January 1 to January 15
DayLight bug free: March 4 to March 11
one: Apr 1 to April 1
two: Apr 15 to April 16
three: Apr 28 to April 30
four: may 11 to may 14
fourasdfasdfanda: may 25 to may 28 
between months: August 31 to September 4
two lines: Feb 8 to Feb 23
fourasdfasdfanda: January 31 to Feburary 3
`;

type Day = { id: number; month: number; day: number };
type EventDefinition = { start: number; end: number; text: string };
type Event = { text: string; offset: boolean; start: boolean; end: boolean };

const parseInput = (inputRaw: string): EventDefinition[] => {
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

function App() {
  // Item 1 will always be the day, items 2+ are events. right now only dealing with one event. No overlaps.
  // 0: [{day}, {events}]
  const timeline: [Day, Event?][] = [];

  // create days
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

  const events = parseInput(input);
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

  const emptySpacesInFront = 2;

  const emptiesDays = Array(emptySpacesInFront)
    .fill(null)
    .map((_) => <Empty />);
  emptiesDays.pop();
  emptiesDays.push(<Year />);

  const emptiesEvents = Array(emptySpacesInFront)
    .fill(null)
    .map((_) => <Empty hidden />);

  return (
    <div className="wrapper">
      <div className="calendar">
        {emptiesDays}
        {timeline.map(([{ id, month, day }]) => (
          <Day key={`${id} `} month={month} day={day} />
        ))}
      </div>
      <div className="calendar-events">
        {emptiesEvents}
        {timeline.map(([_, event]) =>
          event ? (
            <Event key={`${_.id} `} {...event} />
          ) : (
            <Empty key={`${_.id}`} hidden />
          )
        )}
      </div>
    </div>
  );
}

export default App;
