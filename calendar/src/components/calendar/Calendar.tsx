import "../../css/calendar.css"
import { useState, useEffect, FC } from "react";
import {
    format,
    addDays,
    isSameDay,
    startOfWeek,
    endOfWeek,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    isSameMonth,
    addYears,
    subYears
} from "date-fns";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Event from "../../types/Event"

type CalendarProps = {
    onMonthChange?: Function,
    onEventClicked?: Function,
    monthEvents?: Event[]
}

const Calendar: FC<CalendarProps> = ({ onMonthChange = () => { }, onEventClicked = () => { }, monthEvents = [] }) => {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate] = useState(new Date());

    useEffect(() => {
        onMonthChange(currentMonth);
    }, [currentMonth, monthEvents]);

    function renderControls() {
        const monthFormat = "MMMM";
        const yearFormat = "yyy"

        return (
            <div className="header row row-middle">
                <div className="date-controls">
                    <div onClick={() => { onArrowClick("NextMonth"); }} >
                        <KeyboardArrowUpIcon className="icon" />
                    </div>
                    <span>
                        {format(currentMonth, monthFormat)}
                    </span>
                    <div onClick={() => { onArrowClick("PreviousMonth"); }} >
                        <KeyboardArrowDownIcon className="icon" />
                    </div>
                </div>
                <div className="date-controls">
                    <div onClick={() => { onArrowClick("NextYear"); }} >
                        <KeyboardArrowUpIcon className="icon" />
                    </div>
                    <span>
                        {format(currentMonth, yearFormat)}
                    </span>
                    <div onClick={() => { onArrowClick("PreviousYear"); }} >
                        <KeyboardArrowDownIcon className="icon" />
                    </div>
                </div>
            </div>
        );
    }

    function renderDaysOfWeek() {
        const dateFormat = "cccc";
        const days = [];

        const startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return (
            <div className="days row">
                {days}
            </div>
        );
    }

    const renderDayEvents = (dayEvents: Event[]) => {
        const eventList: JSX.Element[] = [];

        dayEvents.forEach((event) => {
            eventList.push(
                <div className="event" key={event.id} onClick={() => onEventClicked(event)}>
                    {event.name}
                </div>
            )
        })

        return (
            <div className="event-list">
                {eventList}
            </div>
        )
    }

    function renderDaysOfMonth() {
        const dateFormat = "d";

        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const weeks = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const dayStatus = isSameDay(day, selectedDate) ? "selected" : !isSameMonth(day, monthStart) ? "disabled" : "";
                const dayToAdd = day;

                const dayEvents = monthEvents.filter((event) => isSameDay(new Date(event.date), dayToAdd))

                days.push(
                    <div className={`col cell ${dayStatus}`} key={day.getTime()} >
                        <span className="number">{formattedDate}</span>
                        {dayEvents.length > 0 ? renderDayEvents(dayEvents) : <div />}
                    </div>
                );

                day = addDays(day, 1);
            }
            weeks.push(
                <div className="row" key={day.getTime()}>
                    {days}
                </div>
            );
            days = [];
        }

        return (
            <div className="body">
                {weeks}
            </div>
        );
    }

    function onArrowClick(direction: String) {
        switch (direction) {
            case "PreviousMonth":
                setCurrentMonth(subMonths(currentMonth, 1));
                break;
            case "NextMonth":
                setCurrentMonth(addMonths(currentMonth, 1));
                break;
            case "PreviousYear":
                setCurrentMonth(subYears(currentMonth, 1));
                break;
            case "NextYear":
                setCurrentMonth(addYears(currentMonth, 1));
        }

        onMonthChange(currentMonth);
    }

    return (
        <div className="calendar">
            {renderControls()}
            {renderDaysOfWeek()}
            {renderDaysOfMonth()}
        </div>
    );
}

export default Calendar;