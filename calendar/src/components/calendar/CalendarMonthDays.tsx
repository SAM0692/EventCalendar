import "../../css/calendar.css"
import { FC } from "react";
import {
    format,
    addDays,
    isSameDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameMonth
} from "date-fns";
import { CalendarItem } from "./Calendar";

type CalendarMonthDaysProps = {
    selectedDate: Date,
    currentDate: Date
    monthEvents: CalendarItem[],
    onEventClick: Function
}

const CalendarMonthDays: FC<CalendarMonthDaysProps> = ({ selectedDate, currentDate, monthEvents, onEventClick }) => {
    const dateFormat = "d";

    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const weeks = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    const renderDayEvents = (dayEvents: CalendarItem[]) => {
        const eventList: JSX.Element[] = [];

        dayEvents.forEach((event) => {
            eventList.push(
                <div className="event" key={event.id} onClick={() => onEventClick(event.id)}>
                    {event.displayText}
                </div>
            )
        })

        return (
            <div className="event-list">
                {eventList}
            </div>
        )
    }

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const dayStatus = isSameDay(day, currentDate) ? "selected" : !isSameMonth(day, monthStart) ? "disabled" : "";
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

export default CalendarMonthDays;