import "./App.css";
import { Day } from "./Components/Day";
import { Empty } from "./Components/Empty";
import { Event } from "./Components/Event";
import {
  createTimelineWithDays,
  insertEventsIntoTimeline,
  numDaysPassed,
  parseInput,
} from "./Utils/utils";
import { Year } from "./Components/Year";
import React from "react";
import { DayPassed } from "./Components/DayPassed";

const defaultInput = `## Example Trips
Aspen: Jan 5 to Jan 10
New Orleans: Feb 8 to Feb 12  
Sedona: Mar 20 to Mar 25  
Tokyo: Apr 5 to Apr 15  
Yellowstone: May 10 to May 15  
Maui: Jun 1 to Jun 7  
Banff: Jul 18 to Jul 25  
Barcelona: Aug 10 to Aug 20  
New York City: Sep 3 to Sep 7
Rome: Oct 14 to Oct 22  
Chicago: Nov 3 to Nov 7  
Sydney: Dec 1 to Dec 10
`;

// const _testingInput = `Japan: January 1 to January 15
// Daylight Savings: March 4 to March 11
// One Day: Apr 1 to April 1
// Two Days: Apr 15 to April 16
// Three Days: Apr 28 to April 30
// Four Days: may 11 to may 14
// Between Months: August 31 to September 4
// Two Weeks: Feb 8 to Feb 23`;

const setTextToUrl = (text: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set("text", encodeURIComponent(text));
  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newURL);
};

function App() {
  const [showInput, setShowInput] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    setTextToUrl(newValue);
  };

  React.useEffect(() => {
    const getInitState = () => {
      const params = new URLSearchParams(window.location.search);
      const initalValue = params.get("text");
      if (initalValue) setInput(decodeURIComponent(initalValue));
      return initalValue;
    };

    const initState = getInitState();
    if (!initState) {
      setTextToUrl(defaultInput);
      getInitState();
    }
  }, []);

  // Item 1 will always be the day, items 2+ are events. right now only dealing with one event. No overlaps.
  // 0: [{day}, {events}]
  const timeline = createTimelineWithDays();

  try {
    const events = parseInput(input);
    insertEventsIntoTimeline(timeline, events);
  } catch (e) {
    console.error(e);
  }
  const emptySpacesInFront = 2;

  const emptiesDays = Array(emptySpacesInFront)
    .fill(null)
    .map(() => <Empty />);
  emptiesDays.pop();
  emptiesDays.push(<Year />);

  const emptiesEvents = Array(emptySpacesInFront)
    .fill(null)
    .map(() => <Empty hidden />);

  const [days] = React.useState(() => numDaysPassed());
  const daysPassed = Array(days)
    .fill(null)
    .map(() => <DayPassed />);

  return (
    <>
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
        <div className="calendar-days-passed">
          {emptiesEvents}
          {daysPassed}
        </div>
      </div>
      <p>
        How to use: This app encodes your data into the URL. Input events, save
        the URL, and reopen it to view your calendar.
      </p>
      <button onClick={() => setShowInput((prev) => !prev)}>
        Toggle input
      </button>
      {showInput && (
        <textarea className="input" value={input} onChange={handleChange} />
      )}
    </>
  );
}

export default App;
