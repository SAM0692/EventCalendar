import React, { FC, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import {
    Switch,
    Route,
    useHistory,
    useRouteMatch
} from "react-router-dom";
import { Button } from "@material-ui/core";
import Calendar, { CalendarItem } from "../components/calendar/Calendar";
import EventList from "../components/event/EventList";
import Event, { DefaultEventValues } from "../types/Event";
import { isSameMonth } from 'date-fns'

const GET_ALL_EVENTS = gql`
query GetAllEvents($date: String){
    events(date: $date) {
        id
        name
        description
        date
    }
}
`


const EventsPage: FC = () => {

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const history = useHistory();

    const { loading, error, data } = useQuery(GET_ALL_EVENTS, {
        variables: { date: null }
    });

    useEffect(() => {
        if (data !== undefined) {
            setAllEvents(data.events.map((event: any) => ({
                id: Number(event.id),
                name: event.name,
                description: event.description,
                date: new Date(event.date)
            })));
        }
    }, []);

    if (loading) return <p>Loading Events...</p>;
    if (error) return <p>Error during data fetch</p>;

    const changeView = () => {
        setShowCalendar(!showCalendar);
    }

    const loadCurrentMonthEvents = async () => {
        console.log('loadCurrentMonthEvents')
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
                        <Calendar onEventClick={handleViewClick} monthEvents={calendarItems} onMonthChange={handleMonthChange} />
                    ) : (
                        <EventList events={allEvents} onViewClick={handleViewClick} />
                    )
            }
        </div>
    )
}

export default EventsPage;