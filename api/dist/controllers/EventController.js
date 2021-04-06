"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getAllEvents = void 0;
const EventModel_1 = __importDefault(require("../mongodb/EventModel"));
const getAllEvents = () => { return EventModel_1.default.find({}); };
exports.getAllEvents = getAllEvents;
const getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield EventModel_1.default.findOne({ id: id }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            return {
                id: result.id,
                name: result.name,
                description: result.description,
                date: result.date
            };
        }
    });
    return event;
});
exports.getEventById = getEventById;
const createEvent = (event) => {
    EventModel_1.default.create({
        id: new Date().getTime(),
        name: event.name,
        description: event.description,
        date: event.date
    }, (err) => {
        if (err)
            console.log(err);
    });
};
exports.createEvent = createEvent;
const updateEvent = (id, event) => {
    EventModel_1.default.updateOne({ id: id }, {
        name: event.name,
        description: event.description,
        date: event.date
    }, null, (err) => {
        if (err)
            console.log(err);
    });
};
exports.updateEvent = updateEvent;
const deleteEvent = (id) => {
    EventModel_1.default.deleteOne({ id: id }, null, (err) => {
        if (err)
            console.log(err);
    });
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=EventController.js.map