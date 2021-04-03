import "../../css/eventPages.css";
import { FC } from "react";
import { Typography } from '@material-ui/core';
import Event from "../../types/Event";

type EventViewProps = {
    selectedEvent: Event
}

const EventView: FC<EventViewProps> = ({ selectedEvent }) => {
    return (
        <div>
            <div>
                <Typography variant="h6" >Name</Typography>
                <Typography >{selectedEvent.name.toString()}</Typography>
            </div>
            <div>
                <Typography variant="h6" >Date</Typography>
                <Typography >{selectedEvent.date.toString()}</Typography>
            </div>
            <div>
                <Typography variant="h6" >Description</Typography>
                <Typography >{selectedEvent.description.toString()}</Typography>
            </div>
        </div>
    )
}

export default EventView;