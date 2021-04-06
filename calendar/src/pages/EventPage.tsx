import "../css/eventPages.css";
import { FC, useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { DefaultEventValues } from "../types/Event";
import EventView from "../components/event/EventView";
import ViewButtons from "../components/buttons/ViewButtons";
import { GET_EVENT } from "../graphql/queries";

interface EventParams {
    id: string
}

const EventPage: FC = () => {
    const [selectedEvent, setSelectedEvent] = useState(DefaultEventValues);
    const { id } = useParams<EventParams>();
    const history = useHistory();

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

    return (
        <div>
            <EventView selectedEvent={selectedEvent} />
            <ViewButtons onEditClick={() => { history.push(`/edit/${id}`) }} />
        </div>
    )
}

export default EventPage;