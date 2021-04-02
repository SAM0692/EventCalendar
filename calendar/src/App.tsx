import './App.css';

import { useState, useEffect, FC } from "react"
import Calendar from "./components/calendar/Calendar";
import EventForm from "./components/events/EventForm"
import Event from "./types/Event"

const App: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthEvents, setMonthEvents] = useState<Event[]>();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    getCurrentMonthEvents();
  }, [currentMonth]);

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  }

  const getCurrentMonthEvents = async () => {
    const response = await fetch(`/events/${currentMonth}`);
    const body = await response.json();

    console.log(body);

    setMonthEvents(body);
  }

  const clearEvent = () => {
    setSelectedEvent(null);
  }

  const updateEventList = () => {
    getCurrentMonthEvents();
  }

  return (
    <div className="App">
      <header>
        <p>
          Calendar Code Challenge
        </p>
      </header>
      <main>
        <EventForm selectedEvent={selectedEvent} clearEvent={clearEvent} updateEventList={updateEventList} />
        <Calendar monthEvents={monthEvents} onMonthChange={handleMonthChange} onEventClicked={handleEventClick} />
      </main>
    </div>
  );
}

export default App;
