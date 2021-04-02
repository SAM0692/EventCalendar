import { Express } from "express";
import {
    getAllEvents,
    getMonthEvents,
    createEvent,
    updateEvent,
    deleteEvent
} from "../controllers/EventController";

export const setEventRoutes = (app: Express) => {
    app.get("/events", (req, res) => {
        const events = getAllEvents();

        res.status(200).json(events).end();
    });

    app.get("/events/:date", (req, res) => {
        const events = getMonthEvents(new Date(req.params.date));

        res.status(200).json(events).end();
    });

    app.post("/events", (req, res) => {
        createEvent(req.body);

        res.status(200).end();
    });

    app.put("/events/:id", (req, res) => {
        updateEvent(Number(req.params.id), req.body);

        res.status(200).end();
    });

    app.delete("/events/:id", (req, res) => {
        deleteEvent(Number(req.params.id));

        res.status(200).end();
    });
};