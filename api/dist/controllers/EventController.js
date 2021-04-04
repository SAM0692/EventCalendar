"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getMonthEvents = exports.getEventById = exports.getAllEvents = void 0;
const date_fns_1 = require("date-fns");
const storage = { events: [] };
const getAllEvents = () => storage.events;
exports.getAllEvents = getAllEvents;
const getEventById = (id) => storage.events.find((event) => event.id === id);
exports.getEventById = getEventById;
const getMonthEvents = (date) => storage.events.filter((event) => date_fns_1.isSameMonth(new Date(event.date), date));
exports.getMonthEvents = getMonthEvents;
const createEvent = (event) => storage.events.push(Object.assign(Object.assign({}, event), { id: new Date().getTime() }));
exports.createEvent = createEvent;
const updateEvent = (id, event) => {
    const eventIndex = storage.events.findIndex((event) => event.id === id);
    storage.events[eventIndex] = Object.assign(Object.assign(Object.assign({}, storage.events[eventIndex]), event), { id });
};
exports.updateEvent = updateEvent;
const deleteEvent = (id) => {
    const eventIndex = storage.events.findIndex((event) => event.id === id);
    storage.events.splice(eventIndex, 1);
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=EventController.js.map