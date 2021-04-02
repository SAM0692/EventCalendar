import "../../css/calendar.css"
import { useState, useEffect, FC } from "react";
import {
    addMonths,
    subMonths,
    addYears,
    subYears
} from "date-fns";
import CalendarControls from "./CalendarControls";
import CalendarWeekDays from "./CalendarWeekDays";
import CalendarMonthDays from "./CalendarMonthDays";

export type CalendarItem = {
    id?: number,
    displayText: String
    date: Date
}

type CalendarProps = {
    onMonthChange?: Function,
    onEventClick?: Function,
    monthEvents?: CalendarItem[]
}

const Calendar: FC<CalendarProps> = ({ onMonthChange = () => { }, onEventClick = () => { }, monthEvents = [] }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentDate] = useState(new Date());

    useEffect(() => {
        onMonthChange(selectedDate);
    }, [selectedDate, monthEvents]);

    const onArrowClick = (direction: String) => {
        switch (direction) {
            case "PreviousMonth":
                setSelectedDate(subMonths(selectedDate, 1));
                break;
            case "NextMonth":
                setSelectedDate(addMonths(selectedDate, 1));
                break;
            case "PreviousYear":
                setSelectedDate(subYears(selectedDate, 1));
                break;
            case "NextYear":
                setSelectedDate(addYears(selectedDate, 1));
        }

        onMonthChange(selectedDate);
    }

    return (
        <div className="calendar">
            <CalendarControls onArrowClick={onArrowClick} selectedDate={selectedDate} />
            <CalendarWeekDays selectedDate={selectedDate} />
            <CalendarMonthDays selectedDate={selectedDate} currentDate={currentDate} monthEvents={monthEvents} onEventClick={onEventClick} />
        </div>
    );
}

export default Calendar;