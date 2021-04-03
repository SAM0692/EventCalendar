import { Express } from "express";
import {
    getAllEvents,
    getEventById,
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

    app.get("/events/:id", (req, res) => {
        const event = getEventById(Number(req.params.id));

        res.status(200).json(event).end();
    });

    app.get("/events/month", (req, res) => {
        const events = getMonthEvents(new Date(req.query.date.toString()));

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