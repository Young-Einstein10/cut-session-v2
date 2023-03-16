import { EventInput } from "@fullcalendar/core";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
  {
    id: createEventId(),
    title: "Session 3",
    start: "2023-02-20" + "T12:00:00",
    end: "2023-02-20",
  },
  {
    id: createEventId(),
    title: "Timed event 4",
    start: "2023-02-21" + "T12:00:00",
    end: "2023-02-21",
  },
  {
    id: createEventId(),
    title: "Timed event 4",
    start: "2023-02-22" + "T12:00:00",
    end: "2023-02-22",
  },
  {
    id: createEventId(),
    title: "Timed event 5",
    start: "2023-02-23" + "T12:00:00",
    end: "2023-02-23",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
