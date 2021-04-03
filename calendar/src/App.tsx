import './App.css';

import { useState, useEffect, FC } from "react"
import {
  Switch,
  Route,
  useHistory,
  withRouter,
  useRouteMatch
} from "react-router-dom";
import { CalendarItem } from "./components/calendar/Calendar";
import Event, { DefaultEventValues } from "./types/Event";
import EventsPage from './pages/EventsPage';
import EventForm from './pages/EventForm';
import React from 'react';
import EventPage from './pages/EventPage';



const App: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthEvents, setMonthEvents] = useState<CalendarItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>(DefaultEventValues);
  const [canSave, setCanSave] = useState(false);
  const [canCancel, setCanCancel] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    loadCurrentMonthEvents();
  }, [selectedDate]);

  useEffect(() => {
    setCanSave(selectedEvent.name !== "");
    setCanCancel(selectedEvent.id ? true : false);
  }, [selectedEvent]);

  const getSelectedEvent = async (eventId: number) => {
    const response = await fetch(`/event/${eventId}`);
    const event = await response.json();

    return event;
  }

  const getCurrentMonthEvents = async () => {
    const response = await fetch(`/events/month?date=${selectedDate}`);
    const events: Event[] = await response.json();

    return events;
  }

  const createEvent = async () => {
    const response = await fetch("/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": selectedEvent.name,
        "description": selectedEvent.description,
        "date": selectedEvent.date
      })
    });

    console.log(response.status);
  }

  const updateEvent = async () => {
    const response = await fetch(`/events/${selectedEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": selectedEvent.name,
        "description": selectedEvent.description,
        "date": selectedEvent.date
      })
    });

    console.log(response.status);
  }

  const deleteEvent = async () => {
    const response = await fetch(`/events/${selectedEvent.id}`, {
      method: "DELETE"
    });

    console.log(response.status);
  }

  const goToPage = (path: string) => {
    history.push(path);
  }

  const loadCurrentMonthEvents = async () => {
    const events = await getCurrentMonthEvents();

    setMonthEvents(events.map((event: Event) => ({
      id: event.id,
      displayText: event.name,
      date: event.date
    })));
  }

  const handleMonthChange = (date: Date) => {
    setSelectedDate(date);
  }

  const handleEventClick = async (eventId: number) => {
    setSelectedEvent(await getSelectedEvent(eventId));
  }

  const handleEventChange = (event: Event) => {
    setSelectedEvent(event);
  }

  const handleSaveClick = () => {
    if (selectedEvent.id !== undefined) {
      updateEvent();
    } else {
      createEvent();
    }

    clearEvent();
    updateEventList();
    goToPage("/");
  }

  const handleNewClick = () => {
    goToPage("/new");
  }

  const handleViewClick = (eventId: number) => {
    handleEventClick(eventId);
    goToPage("/view");
  }

  const handleEditClick = () => {
    goToPage("/edit");
  }

  const handleCancelClick = () => {
    deleteEvent();
    clearEvent();
    updateEventList();

    goToPage("/");
  }

  const clearEvent = () => {
    setSelectedEvent(DefaultEventValues);
  }

  const updateEventList = () => {
    loadCurrentMonthEvents();
  }


  return (
    <div>
      <Switch>
        <Route path={"/new"} >
          <EventForm selectedEvent={selectedEvent} canSave={canSave} canCancel={canCancel} isCreating={true} handleEventChange={handleEventChange} handleSaveClick={handleSaveClick} handleCancelClick={handleCancelClick} clearEvent={clearEvent} />
        </Route>
        <Route path={"/edit"} >
          <EventForm selectedEvent={selectedEvent} canSave={canSave} canCancel={canCancel} isCreating={false} handleEventChange={handleEventChange} handleSaveClick={handleSaveClick} handleCancelClick={handleCancelClick} clearEvent={clearEvent} />
        </Route>
        <Route path="/view">
          <EventPage selectedEvent={selectedEvent} handleEditClick={handleEditClick} />
        </Route>
        <Route path="/">
          <EventsPage monthEvents={monthEvents} handleNewClick={handleNewClick} handleViewClick={handleViewClick} handleCancelClick={handleCancelClick} handleMonthChange={handleMonthChange} />
        </Route>
      </Switch>
    </div>
  )
}

export default withRouter(App);
