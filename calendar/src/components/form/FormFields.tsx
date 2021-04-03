import "../../css/formFields.css";
import { useState, FC, useEffect } from "react";
import { TextField } from "@material-ui/core";
import DatePicker from "react-date-picker";
import Event from "../../types/Event"

type FormFieldsProps = {
    selectedEvent?: Event,
    onEventChange: Function
}

const FormFields: FC<FormFieldsProps> = ({ selectedEvent, onEventChange }) => {
    const [selectedDate, setSelectedDate] = useState<Date | Date[]>();
    const [name, setName] = useState<String>();
    const [description, setDescription] = useState<String>();

    useEffect(() => {
        setSelectedDate(selectedEvent ? new Date(selectedEvent.date) : new Date());
        setName(selectedEvent ? selectedEvent.name : "");
        setDescription(selectedEvent ? selectedEvent.description : "");
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
                <DatePicker className="form-field" value={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date)
                        onEventChange({ ...selectedEvent, date: date });
                    }} />
            </div>
        </div>
    )
}

export default FormFields