import "../css/eventPages.css";
import { FC, useState, useEffect } from "react";
import FormFields from "../components/form/FormFields";
import FormButtons from "../components/buttons/FormButtons";
import Event, { DefaultEventValues } from "../types/Event";

const CreateEventPage: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event>(DefaultEventValues);
    const [canSave, setCanSave] = useState(false);

    useEffect(() => {
        setCanSave(selectedEvent.name !== "");
    }, [selectedEvent]);

    const clearEvent = () => {
        setSelectedEvent(DefaultEventValues);
    }

    const handleEventChange = (event: Event) => {
        setSelectedEvent(event);
    }

    const handleSaveClick = () => {
        // createEvent();
        console.log("createEvent")
    }

    return (
        <div>
            <FormFields selectedEvent={selectedEvent} onEventChange={handleEventChange} />
            <FormButtons isCreating={true} canSave={canSave} onSaveClick={handleSaveClick} onClearClick={clearEvent} />
        </div>
    )
}

export default CreateEventPage;