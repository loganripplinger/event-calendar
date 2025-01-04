import { year } from "../Utils/utils";

export function Day({ day, month }: { day: number; month: number }) {
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
