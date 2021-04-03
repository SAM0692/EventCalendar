import "../css/eventPages.css";
import { FC } from "react";
import Event from "../types/Event";
import FormFields from "../components/form/FormFields";
import FormButtons from "../components/buttons/FormButtons";

type EventFormProps = {
    selectedEvent: Event,
    canSave: boolean,
    canCancel: boolean,
    isCreating: boolean,
    handleEventChange: Function,
    handleSaveClick: Function,
    handleCancelClick: Function,
    clearEvent: Function
}

const EventForm: FC<EventFormProps> = ({
    selectedEvent,
    canSave,
    canCancel,
    isCreating,
    handleEventChange,
    handleSaveClick,
    handleCancelClick,
    clearEvent

}) => {

    return (
        <div>
            <FormFields selectedEvent={selectedEvent} onEventChange={handleEventChange} />
            <FormButtons isCreating={isCreating} canSave={canSave} canCancel={canCancel} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} onClearClick={clearEvent} />
        </div>
    )
}

export default EventForm;