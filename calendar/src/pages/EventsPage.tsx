import { Button } from "@material-ui/core";
import React, { FC, useState } from "react";
import Calendar, { CalendarItem } from "../components/calendar/Calendar";
import EventList from "../components/event/EventList";


type EventsPageProps = {
    monthEvents: CalendarItem[],
    handleNewClick: Function,
    handleViewClick: Function,
    handleCancelClick: Function,
    handleMonthChange: Function
}

const EventsPage: FC<EventsPageProps> = ({ monthEvents, handleNewClick, handleViewClick, handleCancelClick, handleMonthChange }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    const changeView = () => {
        setShowCalendar(!showCalendar);
    }

    return (
        <div>
            <Button onClick={() => { handleNewClick() }} >New Event</Button>
            <Button onClick={() => { changeView() }} >Change Viewt</Button>

            {
                showCalendar
                    ? (
                        <Calendar onEventClick={handleViewClick} monthEvents={monthEvents} onMonthChange={handleMonthChange} />
                    ) : (
                        <EventList monthEvents={monthEvents} onViewClick={handleViewClick} onCancelClick={handleCancelClick} />
                    )
            }
        </div>
    )
}

export default EventsPage;