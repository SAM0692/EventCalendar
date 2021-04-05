import "../css/eventPages.css";
import { FC, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import EventForm from "../components/form/EventForm";
import FormButtons from "../components/buttons/FormButtons";
import Event, { DefaultEventValues } from "../types/Event";
import { CREATE_EVENT } from "../graphql/mutations";

const CreateEventPage: FC = () => {
    const [newEvent, setSelectedEvent] = useState<Event>(DefaultEventValues);
    const [canSave, setCanSave] = useState(false);
    const history = useHistory();

    const [createEventMutation] = useMutation(CREATE_EVENT);

    useEffect(() => {
        setCanSave(newEvent.name !== "");
    }, [newEvent]);

    const clearEvent = () => {
        setSelectedEvent(DefaultEventValues);
    }

    const handleEventChange = (event: Event) => {
        setSelectedEvent(event);
    }

    const handleSaveClick = () => {
        createEventMutation({
            variables: {
                input: {
                    name: newEvent.name,
                    description: newEvent.description,
                    date: newEvent.date.toString()
                }
            }
        })

        history.push("/");
    }

    return (
        <div>
            <EventForm selectedEvent={newEvent} onEventChange={handleEventChange} />
            <FormButtons isCreating={true} canSave={canSave} onSaveClick={handleSaveClick} onClearClick={clearEvent} />
        </div>
    )
}

export default CreateEventPage;