import "../../css/eventForm.css";
import { useState, FC, useEffect } from "react";
import { TextField } from "@material-ui/core";
import DatePicker from "react-date-picker";
import Event from "../../types/Event"

type EventFormProps = {
    selectedEvent?: Event,
    onEventChange: Function
}

const EventForm: FC<EventFormProps> = ({ selectedEvent, onEventChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (selectedEvent) {
            setSelectedDate(new Date(selectedEvent.date));
            setName(selectedEvent.name);
            setDescription(selectedEvent.description);
        }
    }, [selectedEvent]);

    return (
        <div className="container">
            <div className="form">
                <TextField className="form-field" label="Name" size="small" variant="outlined"
                    value={name} InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setName(e.target.value);
                        onEventChange({ ...selectedEvent, name: e.target.value });
                    }} />
                <TextField className="form-field" label="Description" size="small" variant="outlined" multiline rows={3} rowsMax={3}
                    value={description} InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        onEventChange({ ...selectedEvent, description: e.target.value });
                    }} />
                <DatePicker className="form-field" value={selectedDate} clearIcon={null}
                    onChange={(date) => {
                        setSelectedDate(new Date(date.toString()))
                        onEventChange({ ...selectedEvent, date: new Date(date.toString()) });
                    }} />
            </div>
        </div>
    )
}

export default EventForm