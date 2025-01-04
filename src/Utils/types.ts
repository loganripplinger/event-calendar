export type Day = { id: number; month: number; day: number };
export type EventDefinition = { start: number; end: number; text: string };
export type Event = {
  text: string;
  offset: boolean;
  start: boolean;
  end: boolean;
};

export type Timeline = [Day, Event?][];
