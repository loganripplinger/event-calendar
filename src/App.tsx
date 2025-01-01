import "./App.css";

function daysinmonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function Year() {
  return (
    <div className="cell year">
      <div>20</div>
      <div>24</div>
    </div>
  );
}

function Empty({ hidden }: { hidden?: boolean }) {
  return <div className={`cell ${hidden ? "event" : undefined}`} />;
}

function Day({ day, month }: { day: number; month: number }) {
  const date = new Date(2024, month, day);
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

function Event({
  text,
  start,
  end,
}: {
  text: string;
  start: boolean;
  end: boolean;
}) {
  return (
    <div className="cell event">
      <div className="event-text">{text ? text : "\u00A0"}</div>
      <div
        className={`line${start ? " line-start" : ""}${end ? " line-end" : ""}`}
      />
    </div>
  );
}

const input = "New York: April 1 to April 15";

type Day = { id: number; month: number; day: number };
type EventDefinition = { start: number; end: number; text: string };
type Event = { text: string; start: boolean; end: boolean };

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
    const currentYear = new Date().getFullYear();
    return new Date(`${monthDayString} ${currentYear}`);
  };

  const getNumberDayOfYear = (date: Date): number => {
    const currentYear = new Date().getFullYear();
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    const startOfYear = new Date(currentYear, 0, 1); // January 1st
    if (isNaN(startOfYear.getTime())) {
      throw new Error("Invalid start of year");
    }
    const dayOfYear =
      Math.floor(
        (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    return dayOfYear + 1;
  };

  for (const input of inputs!) {
    if (!input) continue;
    const [text, startDate, endDate] = input;
    const start = getNumberDayOfYear(convertStringToDate(startDate));
    const end = getNumberDayOfYear(convertStringToDate(endDate));

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
    const daysInMonth = daysinmonth(2024, month);
    for (let day = 1; day <= daysInMonth; day++) {
      timeline.push([{ id, month, day }]);
    }
    id++;
  }

  const events = parseInput(input);
  // insert events
  for (const event of events) {
    const m = Math.floor((event.end - event.start) / 2) + event.start;
    console.log(m);
    for (let i = event.start; i < event.end; i++) {
      timeline[i].push({
        text: i === m ? event.text : "",
        start: i === event.start,
        end: i === event.end - 1,
      });
    }
  }

  return (
    <div className="wrapper">
      <div className="calendar">
        <Year />
        {timeline.map(([{ id, month, day }]) => (
          <Day key={id} month={month} day={day} />
        ))}
        <Empty />
      </div>
      <div className="calendar-events">
        <Empty hidden />
        {timeline.map(([_, event]) =>
          event ? <Event {...event} /> : <Empty hidden />
        )}
        <Empty hidden />
      </div>
    </div>
  );
}

export default App;
