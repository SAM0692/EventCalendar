import "../../css/calendar.css"
import { FC } from "react";
import { format } from "date-fns";

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

type CalendarControlProps = {
    onArrowClick: Function,
    selectedDate: Date
}

const CalendarControls: FC<CalendarControlProps> = ({ onArrowClick, selectedDate }) => {
    const monthFormat = "MMMM";
    const yearFormat = "yyy"

    return (
        <div className="header row row-middle">
            <div className="date-controls">
                <div onClick={() => { onArrowClick("NextMonth"); }} >
                    <KeyboardArrowUpIcon className="icon" />
                </div>
                <span>
                    {format(selectedDate, monthFormat)}
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
                    {format(selectedDate, yearFormat)}
                </span>
                <div onClick={() => { onArrowClick("PreviousYear"); }} >
                    <KeyboardArrowDownIcon className="icon" />
                </div>
            </div>
        </div>
    );
}

export default CalendarControls;