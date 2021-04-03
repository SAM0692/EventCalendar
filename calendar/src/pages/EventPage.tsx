import "../css/eventPages.css";
import { FC } from "react";
import Event from "../types/Event";
import EventView from "../components/event/EventView";
import ViewButtons from "../components/buttons/ViewButtons";

type EventPageProps = {
    selectedEvent: Event,
    handleEditClick: Function
}

const EventPage: FC<EventPageProps> = ({ selectedEvent, handleEditClick }) => {

    return (
        <div>
            <EventView selectedEvent={selectedEvent} />
            <ViewButtons onEditClick={handleEditClick} />
        </div>
    )
}

export default EventPage;