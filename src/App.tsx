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

function Empty() {
  return <div className="cell" />;
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

function App() {
  const days: [number, number][] = [];

  for (let month = 0; month < 12; month++) {
    const daysInMonth = daysinmonth(2024, month);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push([month, day]);
    }
  }

  return (
    <div className="calendar">
      <Year />
      {days.map(([month, day]) => (
        <Day key={`${month}-${day}`} day={day} month={month} />
      ))}
      <Empty />
    </div>
  );
}

export default App;
