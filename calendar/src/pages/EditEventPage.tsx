import "../css/eventPages.css";
import { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import FormFields from "../components/form/EventForm";
import FormButtons from "../components/buttons/FormButtons";
import Event, { DefaultEventValues } from "../types/Event";
import { GET_EVENT } from "../graphql/queries";
import { UPDATE_EVENT, DELETE_EVENT } from "../graphql/mutations";

interface EditEventParams {
    id: string
}

const EditEventPage: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event>(DefaultEventValues);
    const [canSave, setCanSave] = useState(false);
    const { id } = useParams<EditEventParams>();
    const history = useHistory();
    const goToHome = () => {
        history.push("/")
    }

    const [updateEventMutation] = useMutation(UPDATE_EVENT, {
        onCompleted: () => { goToHome() }
    });
    const [deleteEventMutation] = useMutation(DELETE_EVENT, {
        onCompleted: () => { goToHome() }
    });

    useEffect(() => {
        setCanSave(selectedEvent.name !== "");
    }, [selectedEvent]);

    const { loading, error, data } = useQuery(GET_EVENT, {
        variables: { id: id }
    });

    useEffect(() => {
        if (data !== undefined) {
            setSelectedEvent({
                name: data.event.name,
                description: data.event.description,
                date: new Date(Number(data.event.date))
            });
        }
    }, [data]);

    if (loading) return <p>Loading Events...</p>;
    if (error) return <p>Error during data fetch</p>;

    const clearEvent = () => {
        setSelectedEvent(DefaultEventValues);
    }

    const handleEventChange = (event: Event) => {
        setSelectedEvent(event);
    }

    const handleSaveClick = () => {
        updateEventMutation({
            variables: {
                id: id,
                input: {
                    name: selectedEvent.name,
                    description: selectedEvent.description,
                    date: selectedEvent.date.toString()
                }
            }
        })

        history.push("/");
    }

    const handleCancelClick = () => {
        deleteEventMutation({
            variables: {
                id: id
            }
        })

        history.push("/");
    }

    return (
        <div>
            <FormFields selectedEvent={selectedEvent} onEventChange={handleEventChange} />
            <FormButtons isCreating={false} canSave={canSave} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} onClearClick={clearEvent} />
        </div>
    )
}

export default EditEventPage;