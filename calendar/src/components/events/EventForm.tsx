import "../../css/eventForm.css";
import { useState, FC, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import DatePicker from "react-date-picker";
import Event from "../../types/Event"

type EventFormProps = {
    selectedEvent?: Event | null,
    clearEvent: Function
    updateEventList: Function
}

const EventForm: FC<EventFormProps> = ({ selectedEvent, clearEvent = () => { }, updateEventList = () => { } }) => {
    const [selectedDate, setSelectedDate] = useState<Date | Date[]>();
    const [name, setName] = useState<String>();
    const [description, setDescription] = useState<String>();
    const [canSubmit, setCanSubmit] = useState(false);
    const [canDelete, setCanDelete] = useState(false);

    useEffect(() => {
        if (name !== "" && description !== "") {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [name, description]);

    useEffect(() => {
        setSelectedDate(selectedEvent ? new Date(selectedEvent.date) : new Date());
        setName(selectedEvent ? selectedEvent.name : "");
        setDescription(selectedEvent ? selectedEvent.description : "");
        setCanDelete(selectedEvent ? true : false);
    }, [selectedEvent]);

    const clearFields = () => {
        setSelectedDate(new Date());
        setName("");
        setDescription("");
    }

    const clearForm = () => {
        if (!selectedEvent) {
            clearFields();
        } else {
            clearEvent();
        }
    }

    const createEvent = async () => {
        const response = await fetch("/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "date": selectedDate
            })
        });

        console.log(response.status);
        updateEventList();
        clearForm();
    }

    const updateEvent = async () => {
        const response = await fetch(`/events/${selectedEvent?.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "date": selectedDate
            })
        });

        console.log(response.status);
        updateEventList();
        clearForm();
    }

    const deleteEvent = async () => {
        const response = await fetch(`/events/${selectedEvent?.id}`, {
            method: "DELETE"
        });

        console.log(response.status);
        updateEventList();
        clearForm();
    }


    const handleSaveClick = () => {
        if (!selectedEvent) {
            createEvent();
        } else {
            updateEvent();
        }
    }

    const handleCancelClick = () => {
        deleteEvent();
    }

    return (
        <div className="container">
            <div className="form">
                <TextField className="form-field" label="Name" size="small" variant="outlined"
                    value={name} onChange={(event) => { setName(event.target.value) }} InputLabelProps={{ shrink: true }} />
                <TextField className="form-field" label="Description" size="small" variant="outlined" multiline rows={3} rowsMax={3}
                    value={description} onChange={(event) => { setDescription(event.target.value) }} InputLabelProps={{ shrink: true }} />
                <DatePicker className="form-field" value={selectedDate} onChange={(date) => { setSelectedDate(date) }} />

                <div className="form-button-group">
                    <Button className="form-button" variant="outlined" color="primary" size="small"
                        disabled={!canSubmit} onClick={() => { handleSaveClick() }} >Save</Button>
                    <Button className="form-button" variant="outlined" color="secondary" size="small"
                        disabled={!canDelete} onClick={() => { handleCancelClick() }} >Cancel</Button>
                    <Button className="form-button" variant="outlined" size="small"
                        onClick={() => { clearForm() }} >Clear</Button>
                </div>
            </div>
        </div>
    )
}

export default EventForm