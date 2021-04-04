import Event from "../types/Event";
import TmpBase from "../types/TmpBase";
import { isSameMonth } from "date-fns";

const storage: TmpBase = { events: [] };

export const getAllEvents = () => storage.events;

export const getEventById = (id: number) => storage.events.find((event) => event.id === id);

export const getMonthEvents = (date: Date) => storage.events.filter((event) => isSameMonth(new Date(event.date), date));

export const createEvent = (event: Event) => storage.events.push({ ...event, id: new Date().getTime() });

export const updateEvent = (id: number, event: Event) => {
    const eventIndex = storage.events.findIndex((event) => event.id === id);

    storage.events[eventIndex] = {
        ...storage.events[eventIndex],
        ...event,
        id
    };
};

export const deleteEvent = (id: number) => {
    const eventIndex = storage.events.findIndex((event) => event.id === id);

    storage.events.splice(eventIndex, 1);
}