import "../css/eventPages.css";
import { FC, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import Event, { DefaultEventValues } from "../types/Event";
import EventView from "../components/event/EventView";
import ViewButtons from "../components/buttons/ViewButtons";

interface EventParams {
    id: string
}

const EventPage: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState(DefaultEventValues);
    const { id } = useParams<EventParams>();
    const history = useHistory();

    return (
        <div>
            <EventView selectedEvent={selectedEvent} />
            <ViewButtons onEditClick={() => { history.push(`/edit/${id}`) }} />
        </div>
    )
}

export default EventPage;