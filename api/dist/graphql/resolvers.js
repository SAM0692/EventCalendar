"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventController_1 = require("../controllers/EventController");
const resolver = {
    event: ({ id }) => { return EventController_1.getEventById(Number(id)); },
    events: () => { return EventController_1.getAllEvents(); },
    createEvent: ({ input }) => {
        const newEvent = {
            name: input.name,
            description: input.description,
            date: new Date(input.date)
        };
        EventController_1.createEvent(newEvent);
        return true;
    },
    updateEvent: ({ id, input }) => {
        const updatedEvent = {
            name: input.name,
            description: input.description,
            date: new Date(input.date)
        };
        EventController_1.updateEvent(Number(id), updatedEvent);
        return true;
    },
    deleteEvent: ({ id }) => {
        EventController_1.deleteEvent(Number(id));
        return true;
    }
};
exports.default = resolver;
//# sourceMappingURL=resolvers.js.map