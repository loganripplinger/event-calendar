import { Event as EventType } from "../Utils/types";

export function Event({ text, offset, start, end }: EventType) {
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
