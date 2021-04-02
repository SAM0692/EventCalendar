import "../../css/calendar.css"
import { FC } from "react";
import {
    format,
    addDays,
    startOfWeek
} from "date-fns";

type CalendarWeekDaysProps = {
    selectedDate: Date
}

const CalendarWeekDays: FC<CalendarWeekDaysProps> = ({ selectedDate }) => {
    const dateFormat = "cccc";
    const days = [];

    const startDate = startOfWeek(selectedDate);

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

export default CalendarWeekDays;