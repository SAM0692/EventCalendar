import "../../css/eventPages.css";
import { FC } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CalendarItem } from "../calendar/Calendar";
import { Button } from "@material-ui/core";

type EventListProps = {
    monthEvents: CalendarItem[],
    onViewClick: Function,
    onCancelClick: Function,
}

const EventList: FC<EventListProps> = ({ monthEvents, onViewClick, onCancelClick }) => {

    const renderEventRows = () => {
        const rows = monthEvents.map((event: CalendarItem) => (
            <TableRow key={event.id}>
                <TableCell component="th" scope="row">
                    {event.displayText}
                </TableCell>
                <TableCell align="right">{event.description}</TableCell>
                <TableCell align="right">{event.date}</TableCell>
                <TableCell align="right">{<Button onClick={() => { onViewClick(event.id) }} >View</Button>}</TableCell>
                {/* <TableCell align="right">{<Button onClick={() => { onCancelClick(event.id) }} >Cancel</Button>}</TableCell> */}
            </TableRow>
        ))

        return rows
    }

    return (
        <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Decription</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">View</TableCell>
                        {/* <TableCell align="right">Delete</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderEventRows()}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default EventList;