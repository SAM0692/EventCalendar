import './App.css';

import { useState, useEffect, FC } from "react"
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import { CalendarItem } from "./components/calendar/Calendar";
import Event, { DefaultEventValues } from "./types/Event";
import EventsPage from './pages/EventsPage';
import EventForm from './pages/CreateEventPage';
import React from 'react';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';



const App: FC = () => {
  // const getSelectedEvent = async (eventId: number) => {
  //   const response = await fetch(`/event/${eventId}`);
  //   const event = await response.json();

  //   return event;
  // }

  // const getCurrentMonthEvents = async () => {
  //   const response = await fetch(`/events/month?date=${selectedDate}`);
  //   const events: Event[] = await response.json();

  //   return events;
  // }

  // const createEvent = async () => {
  //   const response = await fetch("/events", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       "name": selectedEvent.name,
  //       "description": selectedEvent.description,
  //       "date": selectedEvent.date
  //     })
  //   });

  //   console.log(response.status);
  // }

  // const updateEvent = async () => {
  //   const response = await fetch(`/events/${selectedEvent.id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       "name": selectedEvent.name,
  //       "description": selectedEvent.description,
  //       "date": selectedEvent.date
  //     })
  //   });

  //   console.log(response.status);
  // }

  // const deleteEvent = async () => {
  //   const response = await fetch(`/events/${selectedEvent.id}`, {
  //     method: "DELETE"
  //   });

  //   console.log(response.status);
  // }





  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path={"/new"} >
            <CreateEventPage />
          </Route>

          <Route path={"/edit/:id"} >
            <EditEventPage />
          </Route>

          <Route path={"/view/:id"} >
            <EventPage />
          </Route>

          <Route path="/">
            <EventsPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
