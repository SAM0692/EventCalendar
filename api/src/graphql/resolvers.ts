import {
    getAllEvents,
    getEventById,
    getMonthEvents,
    createEvent,
    updateEvent,
    deleteEvent
} from "../controllers/EventController";
import Event from "../types/Event";

const resolver = {
    event: ({ id }: { id: string }) => { return getEventById(Number(id)) },
    events: ({ date }: { date: string }) => { return date ? getMonthEvents(new Date(date)) : getAllEvents() },
    createEvent: ({ input }: { input: any }) => {
        const newEvent: Event = {
            name: input.name,
            description: input.description,
            date: new Date(input.date)
        };
        createEvent(newEvent);
        return true;
    },
    updateEvent: ({ id, input }: { id: string, input: any }) => {
        const updatedEvent: Event = {
            name: input.name,
            description: input.description,
            date: new Date(input.date)
        };
        updateEvent(Number(id), updatedEvent);
        return true;
    },
    deleteEvent: ({ id }: { id: string }) => {
        deleteEvent(Number(id))
        return true;
    }
};

export default resolver;