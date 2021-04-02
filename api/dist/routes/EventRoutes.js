"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEventRoutes = void 0;
const EventController_1 = require("../controllers/EventController");
const setEventRoutes = (app) => {
    app.get("/events", (req, res) => {
        const events = EventController_1.getAllEvents();
        res.status(200).json(events).end();
    });
    app.get("/events/:date", (req, res) => {
        const events = EventController_1.getMonthEvents(new Date(req.params.date));
        res.status(200).json(events).end();
    });
    app.post("/events", (req, res) => {
        EventController_1.createEvent(req.body);
        res.status(200).end();
    });
    app.put("/events/:id", (req, res) => {
        EventController_1.updateEvent(Number(req.params.id), req.body);
        res.status(200).end();
    });
    app.delete("/events/:id", (req, res) => {
        EventController_1.deleteEvent(Number(req.params.id));
        res.status(200).end();
    });
};
exports.setEventRoutes = setEventRoutes;
//# sourceMappingURL=EventRoutes.js.map