import "./App.css";
import { Day } from "./Components/Day";
import { Empty } from "./Components/Empty";
import { Event } from "./Components/Event";
import {
  createTimelineWithDays,
  insertEventsIntoTimeline,
  parseInput,
} from "./Utils/utils";
import { Year } from "./Components/Year";

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

function App() {
  // Item 1 will always be the day, items 2+ are events. right now only dealing with one event. No overlaps.
  // 0: [{day}, {events}]
  const timeline = createTimelineWithDays();

  const events = parseInput(input);
  insertEventsIntoTimeline(timeline, events);

  const emptySpacesInFront = 2;

  const emptiesDays = Array(emptySpacesInFront)
    .fill(null)
    .map(() => <Empty />);
  emptiesDays.pop();
  emptiesDays.push(<Year />);

  const emptiesEvents = Array(emptySpacesInFront)
    .fill(null)
    .map(() => <Empty hidden />);

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
