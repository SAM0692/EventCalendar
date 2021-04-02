import './App.css';

import { useState, useEffect, FC } from "react"
import Calendar, { CalendarItem } from "./components/calendar/Calendar";
import EventForm from "./components/events/EventForm";
import Event, { DefaultEventValues } from "./types/Event";
import FormButtons from './components/events/FormButtons';

const App: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthEvents, setMonthEvents] = useState<CalendarItem[]>();
  const [selectedEvent, setSelectedEvent] = useState<Event>(DefaultEventValues);
  const [canSave, setCanSave] = useState(false);
  const [canCancel, setCanCancel] = useState(false);

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
    if (selectedEvent.id != undefined) {
      updateEvent();
    } else {
      createEvent();
    }

    clearEvent();
    updateEventList();
  }

  const handleCancelClick = () => {
    deleteEvent();
    clearEvent();
    updateEventList();
  }

  const clearEvent = () => {
    setSelectedEvent(DefaultEventValues);
  }

  const updateEventList = () => {
    loadCurrentMonthEvents();
  }

  return (
    <div className="App">
      <header>
        <p>
          Calendar Code Challenge
        </p>
      </header>
      <main>
        <EventForm selectedEvent={selectedEvent} onEventChange={handleEventChange} />
        <FormButtons canSave={canSave} canCancel={canCancel} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} onClearClick={clearEvent} />
        <Calendar monthEvents={monthEvents} onMonthChange={handleMonthChange} onEventClick={handleEventClick} />
      </main>
    </div>
  );
}

export default App;
