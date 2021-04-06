import React, { FC, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Calendar, { CalendarItem } from "../components/calendar/Calendar";
import EventList from "../components/event/EventList";
import Event from "../types/Event";
import { isSameMonth } from 'date-fns'
import { GET_ALL_EVENTS } from "../graphql/queries"


const EventsPage: FC = () => {

    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const history = useHistory();

    const { loading, error, data } = useQuery(GET_ALL_EVENTS, {
        variables: { date: null },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (data !== undefined) {
            setAllEvents(data.events.map((event: any) => ({
                id: Number(event.id),
                name: event.name,
                description: event.description,
                date: new Date(Number(event.date))
            })));
        }
    }, [data]);

    if (loading) return <p>Loading Events...</p>;
    if (error) return <p>Error during data fetch</p>;

    const changeView = () => {
        setShowCalendar(!showCalendar);
    }

    const handleMonthChange = (date: Date) => {
        setCalendarItems(allEvents.filter((event) => isSameMonth(event.date, date)).map((event) => ({
            id: event.id,
            displayText: event.name,
            date: event.date
        })))
    }

    const handleViewClick = (eventId: number) => {
        history.push(`/view/${eventId}`);
    }

    return (
        <div>
            <Button onClick={() => { history.push("/new") }} >New Event</Button>
            <Button onClick={() => { changeView() }} >Change View</Button>

            {
                showCalendar
                    ? (
                        <Calendar onEventClick={handleViewClick} calendarItems={calendarItems} onMonthChange={handleMonthChange} />
                    ) : (
                        <EventList events={allEvents} onViewClick={handleViewClick} />
                    )
            }
        </div>
    )
}

export default EventsPage;