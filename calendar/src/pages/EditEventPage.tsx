import "../css/eventPages.css";
import { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import FormFields from "../components/form/FormFields";
import FormButtons from "../components/buttons/FormButtons";
import Event, { DefaultEventValues } from "../types/Event";

interface EditEventParams {
    id: string
}

const EditEventPage: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event>(DefaultEventValues);
    const [canSave, setCanSave] = useState(false);
    const [canCancel, setCanCancel] = useState(false);
    const { id } = useParams<EditEventParams>();



    useEffect(() => {
        setCanSave(selectedEvent.name !== "");
        setCanCancel(selectedEvent.id ? true : false);
    }, [selectedEvent]);

    const clearEvent = () => {
        setSelectedEvent(DefaultEventValues);
    }

    const handleEventChange = (event: Event) => {
        setSelectedEvent(event);
    }

    const handleSaveClick = () => {
        // updateEvent();
        console.log("updateEvent")
    }

    const handleCancelClick = () => {
        //   deleteEvent();
        console.log("deleteEvent")
        clearEvent();
    }

    return (
        <div>
            <FormFields selectedEvent={selectedEvent} onEventChange={handleEventChange} />
            <FormButtons isCreating={false} canSave={canSave} canCancel={canCancel} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} onClearClick={clearEvent} />
        </div>
    )
}

export default EditEventPage;