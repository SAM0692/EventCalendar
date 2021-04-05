import "../../css/eventPages.css";
import { FC } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import Event from "../../types/Event"

type EventListProps = {
    events: Event[],
    onViewClick: Function,
}

const EventList: FC<EventListProps> = ({ events, onViewClick }) => {
    const renderEventRows = () => {
        const rows = events.map((event: Event) => (
            <TableRow key={event.id}>
                <TableCell component="th" scope="row">
                    {event.name}
                </TableCell>
                <TableCell align="right">{event.description}</TableCell>
                <TableCell align="right">{event.date.toString()}</TableCell>
                <TableCell align="right">{<Button onClick={() => { onViewClick(event.id) }} >View</Button>}</TableCell>
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